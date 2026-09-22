# Production Dockerfile for FastAPI Backend
FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY backend /app/backend
COPY data /app/data
COPY models /app/models
COPY scripts /app/scripts
COPY docs /app/docs
COPY ecommerce.db /app/ecommerce.db

EXPOSE 8000

ENV PORT=8000
ENV HOST=0.0.0.0

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
