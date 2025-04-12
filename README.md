# Fullstack CRUD App with Docker

[![Docker](https://img.shields.io/badge/Docker-Enabled-blue.svg)](https://www.docker.com)
[![Node.js](https://img.shields.io/badge/Node.js-18-green.svg)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A complete CRUD application with Express.js, React, MongoDB, and JWT authentication, containerized with Docker.

## Features
-  JWT Authentication
-  Dockerized Services
-  MongoDB Persistence
-  CRUD Operations
-  Nginx Reverse Proxy

## Tech Stack
- **Backend**: Express.js, Mongoose, JWT
- **Frontend**: React, Bootstrap
- **Database**: MongoDB
- **Infra**: Docker, Nginx

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 18+
- MongoDB (for local dev)

### Quick Start (Docker)
```bash
git clone https://github.com/mohamedja22/crud-fullstack-docker.git
cd crud-fullstack-docker

# Copy environment templates
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Build and start
docker-compose up --build

# Access at http://localhost:5173