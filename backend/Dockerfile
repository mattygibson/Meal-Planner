# ---------------------------------------------------------
# Meal Planner API — Production Dockerfile
# Built for GreenCloud PaaS (targets linux/amd64 and linux/arm64)
# Uses uv for fast, reproducible dependency installation.
# ---------------------------------------------------------

# Stage 1: Install dependencies with uv
FROM python:3.12-slim AS builder

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

WORKDIR /build

# Copy dependency files first (maximises layer caching)
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev --no-install-project

# Stage 2: Runtime
FROM python:3.12-slim AS runtime

WORKDIR /app

# Create non-root user
RUN addgroup --system appuser && adduser --system --ingroup appuser appuser

# Copy the virtual environment from builder
COPY --from=builder /build/.venv /app/.venv

# Add venv to PATH so uvicorn and packages are available
ENV PATH="/app/.venv/bin:$PATH"

# Copy application source code
COPY main.py .
COPY meals.json .
COPY API/ ./API/
COPY services/ ./services/
COPY schema/ ./schema/

# Ensure data file is writable by appuser
RUN chown appuser:appuser /app/meals.json

USER appuser

EXPOSE 8000

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')" || exit 1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
