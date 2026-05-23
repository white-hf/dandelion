#!/usr/bin/env python3
"""Small-scope compliant prospect discovery using Google Places API.

This script uses the official Places API (New) Text Search endpoint. It does
not scrape Google Maps pages and does not fetch/copy review text or photos.
"""

from __future__ import annotations

import argparse
import csv
import json
import os
import sys
import time
import uuid
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


ROOT_DIR = Path(__file__).resolve().parent.parent
DEFAULT_OUTPUT_DIR = ROOT_DIR / "data" / "prospects"
PLACES_TEXT_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText"

DEFAULT_QUERIES = [
    "cleaning services Halifax NS",
    "duct cleaning Halifax NS",
    "landscaping services Halifax NS",
    "mobile car detailing Halifax NS",
    "pet grooming Halifax NS",
]

SOCIAL_DOMAINS = {
    "facebook.com",
    "instagram.com",
    "linktr.ee",
    "linkedin.com",
    "twitter.com",
    "x.com",
}

DIRECTORY_DOMAINS = {
    "yelp.",
    "yellowpages.",
    "bbb.org",
    "homestars.",
    "mapquest.",
    "canada247.",
    "nicelocal.",
    "cybo.",
}


@dataclass
class Prospect:
    id: str
    business_name: str
    category: str
    city: str
    region: str
    source: str
    source_url: str
    place_id: str
    website_url: str
    website_status: str
    rating: float | None
    review_count: int | None
    phone: str
    status: str
    compliance_status: str
    score: int
    score_reasons: str
    discovered_query: str
    discovered_at: str


def load_env_file(path: Path) -> None:
    if not path.exists():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key, value.strip().strip('"').strip("'"))


def domain_contains(url: str, needles: set[str]) -> bool:
    lowered = url.lower()
    return any(needle in lowered for needle in needles)


def classify_website_status(website_url: str) -> str:
    if not website_url:
        return "none"
    if domain_contains(website_url, SOCIAL_DOMAINS):
        return "social_only"
    if domain_contains(website_url, DIRECTORY_DOMAINS):
        return "directory_only"
    return "has_website_unreviewed"


def score_prospect(website_status: str, rating: float | None, review_count: int | None, phone: str) -> tuple[int, list[str]]:
    score = 0
    reasons: list[str] = []

    if website_status == "none":
        score += 25
        reasons.append("no website")
    elif website_status in {"social_only", "directory_only"}:
        score += 20
        reasons.append(website_status)
    elif website_status == "has_website_unreviewed":
        score -= 20
        reasons.append("has website, needs manual review")

    if rating is not None and rating >= 4.6:
        score += 15
        reasons.append("rating >= 4.6")
    if review_count is not None and review_count >= 100:
        score += 25
        reasons.append("reviews >= 100")
    elif review_count is not None and review_count >= 30:
        score += 15
        reasons.append("reviews >= 30")
    if phone:
        score += 5
        reasons.append("phone available")

    return score, reasons


def places_text_search(api_key: str, query: str, max_results: int) -> list[dict[str, Any]]:
    body = {
        "textQuery": query,
        "pageSize": max_results,
        "locationBias": {
            "circle": {
                "center": {"latitude": 44.6488, "longitude": -63.5752},
                "radius": 25000.0,
            }
        },
    }
    # Keep the field mask deliberately narrow. Do not request reviews or photos.
    field_mask = ",".join(
        [
            "places.id",
            "places.displayName",
            "places.formattedAddress",
            "places.googleMapsUri",
            "places.primaryTypeDisplayName",
            "places.types",
            "places.nationalPhoneNumber",
            "places.rating",
            "places.userRatingCount",
            "places.websiteUri",
            "places.businessStatus",
        ]
    )
    request = Request(
        PLACES_TEXT_SEARCH_URL,
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "X-Goog-Api-Key": api_key,
            "X-Goog-FieldMask": field_mask,
        },
        method="POST",
    )
    with urlopen(request, timeout=20) as response:
        payload = json.loads(response.read().decode("utf-8"))
    return payload.get("places", [])


def place_to_prospect(place: dict[str, Any], query: str, discovered_at: str) -> Prospect:
    display_name = place.get("displayName", {}).get("text", "")
    primary_type = place.get("primaryTypeDisplayName", {}).get("text", "")
    website_url = place.get("websiteUri", "") or ""
    website_status = classify_website_status(website_url)
    rating = place.get("rating")
    review_count = place.get("userRatingCount")
    phone = place.get("nationalPhoneNumber", "") or ""
    score, reasons = score_prospect(website_status, rating, review_count, phone)

    compliance_status = "allowed"
    if website_status == "has_website_unreviewed":
        compliance_status = "review_needed"

    return Prospect(
        id=str(uuid.uuid4()),
        business_name=display_name,
        category=primary_type or ",".join(place.get("types", [])[:3]),
        city="Halifax",
        region="NS",
        source="google_places_api",
        source_url=place.get("googleMapsUri", "") or "",
        place_id=place.get("id", "") or "",
        website_url=website_url,
        website_status=website_status,
        rating=rating,
        review_count=review_count,
        phone=phone,
        status="discovered",
        compliance_status=compliance_status,
        score=score,
        score_reasons="; ".join(reasons),
        discovered_query=query,
        discovered_at=discovered_at,
    )


def write_outputs(prospects: list[Prospect], output_dir: Path, run_id: str) -> tuple[Path, Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    json_path = output_dir / f"halifax_google_places_{run_id}.json"
    csv_path = output_dir / f"halifax_google_places_{run_id}.csv"

    rows = [asdict(prospect) for prospect in prospects]
    json_path.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")

    with csv_path.open("w", encoding="utf-8", newline="") as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=list(rows[0].keys()) if rows else list(Prospect.__dataclass_fields__.keys()))
        writer.writeheader()
        writer.writerows(rows)

    return json_path, csv_path


def main() -> int:
    parser = argparse.ArgumentParser(description="Discover small-scope Halifax prospects through Google Places API.")
    parser.add_argument("--env-file", default=str(ROOT_DIR / "clients" / "dandelion" / "backend" / ".env"))
    parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR))
    parser.add_argument("--max-results-per-query", type=int, default=5)
    parser.add_argument("--min-score", type=int, default=40)
    parser.add_argument("--query", action="append", help="Override default query. Can be passed multiple times.")
    parser.add_argument("--dry-run", action="store_true", help="Print queries and exit without calling Google.")
    args = parser.parse_args()

    load_env_file(Path(args.env_file))

    queries = args.query or DEFAULT_QUERIES
    run_id = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")

    if args.dry_run:
        print("Dry run. Planned Google Places API queries:")
        for query in queries:
            print(f"- {query}")
        print(f"Output directory: {args.output_dir}")
        return 0

    api_key = os.getenv("GOOGLE_PLACES_API_KEY") or os.getenv("GOOGLE_MAPS_API_KEY")
    if not api_key:
        print("Missing GOOGLE_PLACES_API_KEY or GOOGLE_MAPS_API_KEY.")
        print("Set one of these environment variables, then rerun:")
        print("  GOOGLE_PLACES_API_KEY=... scripts/discover_halifax_prospects.py")
        print("No Google Maps page scraping was attempted.")
        return 2

    seen_place_ids: set[str] = set()
    prospects: list[Prospect] = []
    discovered_at = datetime.now(timezone.utc).isoformat()

    for query in queries:
        print(f"Querying: {query}")
        try:
            places = places_text_search(api_key, query, args.max_results_per_query)
        except HTTPError as error:
            print(f"HTTP error for query '{query}': {error.code} {error.read().decode('utf-8', errors='ignore')}", file=sys.stderr)
            return 1
        except URLError as error:
            print(f"Network error for query '{query}': {error}", file=sys.stderr)
            return 1

        for place in places:
            place_id = place.get("id", "")
            if not place_id or place_id in seen_place_ids:
                continue
            seen_place_ids.add(place_id)
            prospect = place_to_prospect(place, query, discovered_at)
            if prospect.score >= args.min_score:
                prospects.append(prospect)
        time.sleep(0.2)

    prospects.sort(key=lambda item: item.score, reverse=True)
    json_path, csv_path = write_outputs(prospects, Path(args.output_dir), run_id)

    print(f"Prospects kept: {len(prospects)}")
    print(f"JSON: {json_path}")
    print(f"CSV:  {csv_path}")
    for prospect in prospects[:10]:
        print(f"- {prospect.score} | {prospect.business_name} | {prospect.website_status} | {prospect.rating} ({prospect.review_count})")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
