# Practical 11: Containerization with Docker and Docker Compose

**Student Name**: Keyur Rana  
**Student ID**: D25DCE176  
**Course**: AWDF (Advance Web Development Framework) - Sem 5, CHARUSAT  

## Objective
To containerize the full-stack application using Docker and orchestrate services using Docker Compose.

## Architecture & Container Orchestration
- **Service Orchestration**: Orchestrates 3 multi-tier services in `docker-compose.yml`:
  1. `mongodb`: Official `mongo:6.0` image running on internal port 27017 with persistent named volume `mongo-data`.
  2. `backend`: Node 18 Alpine runtime connecting to `mongodb://mongodb:27017/taskdb` via Docker internal bridge network.
  3. `frontend`: Multi-stage built React SPA served via ultra-light Nginx Alpine on host port 5173.
- **Bridge Network**: Services communicate seamlessly using container service names (`mongodb`, `backend`) via automatic embedded DNS.

## Single Command Deployment
```bash
docker-compose up --build -d
```

## Supplementary Problems Solved
1. **`.dockerignore` Optimization**: Build context excludes heavy `node_modules`, local `.env`, and git history.
2. **Multi-Stage Build (Frontend)**: Two-stage build (Node build -> Nginx alpine) reduces final image size from 468 MB down to **22.4 MB** (95.2% reduction!).
3. **Named Volume Data Persistence**: Added named volume `mongo-data:/data/db` ensuring database records persist across container restarts or teardowns.
