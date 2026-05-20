FROM python:3.11-slim

WORKDIR /app

# Install dependencies
# Note: build context is repo root (../..)
COPY ./clients/dandelion/backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy shared packages
COPY ./packages/backend /packages/backend

# Copy client app
COPY ./clients/dandelion/backend /app

# Set PYTHONPATH to include the shared packages
ENV PYTHONPATH="/app:/packages/backend"
ENV PORT=8000

CMD ["python", "main.py"]
