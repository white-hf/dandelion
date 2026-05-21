export const industryPacks = [
  {
    slug: "hvac",
    name: "HVAC Lead Engine",
    audience: "HVAC, roofing, plumbing, electrical, and home-service teams",
    primaryCta: "Request a quote",
    painPoints: [
      "Google leads arrive with no source tracking.",
      "Emergency jobs get buried in voicemail or inboxes.",
      "Owners cannot see which ads produce real quote requests.",
    ],
    workflow: ["Landing page", "Quote request", "Owner notification", "Lead status", "Follow-up reminder"],
    status: "First industry pack",
  },
  {
    slug: "clinic",
    name: "Dental Booking & Review System",
    audience: "Dental, wellness, physio, and private clinic teams",
    primaryCta: "Book an appointment",
    painPoints: [
      "Visitors need trust before booking.",
      "No-show and follow-up processes are inconsistent.",
      "Satisfied patients are not systematically asked for reviews.",
    ],
    workflow: ["Service page", "Appointment CTA", "Reminder plan", "Review request", "Monthly report"],
    status: "V1 demo",
  },
  {
    slug: "immigration",
    name: "Immigration Consultation Intake System",
    audience: "Immigration consultants, lawyers, accountants, and advisory firms",
    primaryCta: "Book a consultation",
    painPoints: [
      "Consultation requests arrive without enough context.",
      "Document needs are unclear before the first call.",
      "Lead quality is hard to judge from generic contact forms.",
    ],
    workflow: ["Consultation page", "Pre-intake", "Booking CTA", "Lead review", "Document checklist"],
    status: "V1 demo",
  },
];

export const serviceModules = [
  {
    name: "Website as Front Door",
    description: "A high-trust marketing site designed around one primary business action.",
  },
  {
    name: "Audit / Quote / Booking Capture",
    description: "Forms that match the real sales conversation and write submissions into a trackable lead record.",
  },
  {
    name: "Lead Inbox Lite",
    description: "A small owner view for new leads, status, notes, source, and the next follow-up action.",
  },
  {
    name: "Conversion Snapshot",
    description: "Source, CTA, form, and booking events summarized without turning the product into heavy analytics software.",
  },
  {
    name: "Notification Workflow",
    description: "Email-first notifications with SMS and calendar integrations reserved for paid workflows.",
  },
  {
    name: "Managed Growth",
    description: "Monthly review of landing pages, CTAs, form drop-off, lead quality, and next module opportunities.",
  },
];

export const pricing = [
  {
    name: "Launch",
    price: "CAD 1,500-2,500 + 99-199/mo",
    fit: "Small local businesses that need a credible website and lead capture loop.",
    includes: ["5-page website", "Audit or contact form", "Basic SEO", "Hosting/maintenance", "Monthly light support"],
  },
  {
    name: "Growth",
    price: "CAD 3,500-7,500 + 249-499/mo",
    fit: "Service businesses that want quote, booking, review, or Lead Inbox workflow support.",
    includes: ["Everything in Launch", "One operating module", "Conversion snapshot", "Review/follow-up workflow", "Monthly optimization"],
  },
  {
    name: "Premium Ops",
    price: "CAD 8,000+ + 750+/mo",
    fit: "Higher-value teams that need multi-page funnels, deeper intake, or managed growth operations.",
    includes: ["Everything in Growth", "Portal/intake flow", "Deeper integrations", "SLA and monitoring", "Monthly operating review"],
  },
];
