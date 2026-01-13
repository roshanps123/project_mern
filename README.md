## CI/CD Simulation 

### 1) CI/CD Steps (5 stages)

1. **Trigger + Checkout**
   - Trigger the workflow on every `push` to the `main` branch.
   - Checkout the repository at the pushed commit.

2. **Install + Quality Checks**
   - Install dependencies for backend and frontend (e.g., `npm ci`).
   - Run basic checks such as linting and/or unit tests (if available).
   - Fail fast if any checks fail.

3. **Build Application Artifacts**
   - Build the frontend (e.g., `npm run build`) to ensure React/Vite compiles successfully.
   - (Optional) Run a backend smoke test (start the server and hit `/health`).
   - Ensure the application builds cleanly before containerization.

4. **Build Docker Image(s)**
   - Build the backend Docker image (and frontend image if containerized).
   - Tag images with `latest` and a unique version tag (e.g., Git commit SHA).

5. **Push Image(s) to a Registry**
   - Authenticate to a container registry (Docker Hub / GitHub Container Registry).
   - Push the tagged image(s) so the deployment server can pull them.

### 2) Deployment Command (single command on server)

From the directory containing `docker-compose.yml`, run:

docker compose up -d --pull always

## How to Run the Application

### Prerequisites
- Docker and Docker Compose installed
- Node.js + npm installed (only needed if running without Docker)

---

## Option A: Run using Docker Compose (recommended)

1) Go to the project root (where `docker-compose.yml` is located):


cd ~/project_mern
Start all services in the background:


docker compose up -d --build
Check status:


docker compose ps
Test backend health (assuming backend is mapped to host port 8080):

```bash
curl http://localhost:8080/health

Stop everything:

docker compose down
Option B: Run locally (MongoDB in Docker, backend + frontend with npm)
1) Start MongoDB locally (Docker)


docker rm -f localmongo 2>/dev/null || true
docker run -d --name localmongo \
  -p 27017:27017 \
  -v /opt/project_mern/data:/data/db \
  mongo:7
Confirm it is running:

docker ps
2) Start Backend (Node/Express)
Create backend/.env:


PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_crud

Run:

cd backend
npm install
npm run dev
Test:


curl http://localhost:5000/health
curl http://localhost:5000/api/todos
3) Start Frontend (React/Vite)
Create frontend/.env:


VITE_API_BASE=http://localhost:5000

Run:

cd ../frontend
npm install
npm run dev
Open in browser:

http://localhost:5173

API Endpoints (Backend)

GET /health -> health check

POST /api/todos -> create todo ({ "title": "..." })

GET /api/todos -> list todos

PATCH /api/todos/:id -> update todo ({ "title": "...", "done": true/false })

DELETE /api/todos/:id -> delete todo
  




 
