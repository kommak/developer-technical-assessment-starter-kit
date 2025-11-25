# Real Estate Platform – Technical Assessment

This repository contains my solution for the **Oman Housing Bank – Developer Technical Assessment**.  
The project is a full-stack Real Estate landing page and property details view built with:

- **Frontend:** React + TypeScript  
- **Backend:** NestJS + TypeScript  
- **Database:** PostgreSQL  
- **Containerization / Dev Env:** VS Code Dev Container + Docker

---

## 1. Repository Structure

```text
.
├── .devcontainer/
│   ├── devcontainer.json        # VS Code Dev Container configuration
│   ├── docker-compose.yml       # Postgres service and dev container config
│   └── Dockerfile               # Image used by the Dev Container
├── .vscode/
│   └── settings.json
├── Projects/
│   ├── backend/                 # NestJS backend API project
│   ├── frontend/                # React frontend project
│   └── database/
│       └── script.sql           # DB schema, indexes, seed data
├── sample data/
│   └── images/
│       ├── lands/
│       │   ├── land1.jpg
│       │   └── land2.jpg
│       ├── projects/
│       │   ├── project1.jpg
│       │   └── project2.jpg
│       └── properties/
│           ├── property1.jpg
│           └── property2.jpg
└── README.md
```

**Put each component in these folders:**
- Backend project → `Projects/backend`
- Frontend project → `Projects/frontend`
- Database scripts → `Projects/database/script.sql`
- Sample images → `sample data/images/...`

---

## 2. Prerequisites

### Recommended (Dev Container)
- Docker Desktop  
- Visual Studio Code  
- Dev Containers extension  

### If not using containers
- Node.js (LTS)
- npm or yarn
- PostgreSQL installed manually

---

## 3. Environment Setup (Using VS Code Dev Container)

1. **Clone your fork** of the repository:

   ```bash
   git clone https://github.com/Oman-Housing-Bank-SAOC/developer-technical-assessment-starter-kit.git

   cd developer-technical-assessment-starter-kit
   ```


2. Open the folder in Visual Studio Code.
3. Press Ctrl+Shift+P → select:
```
Dev Containers: Reopen in Container
```
Database connection inside the Dev Container

Use the following credentials:

| Key      | Value    |
|----------|----------|
| Host     | db       |
| Port     | 5432     |
| User     | postgres |
| Password | postgres |
| Database | postgres |

## 4. Database Setup

All SQL scripts have to be located in:
```
Projects/database/script.sql
```

This file should includes:
1. Table creation
2. Indexes
3. Sample seed data (projects, lands, properties, users, contacts.. etc) 



Komai Makarem work readme starts here : 

A NestJS-based backend API for managing real estate listings including **projects, properties, and lands**. This API supports full CRUD operations, JWT-based authentication, and provides endpoints for popular and featured listings.


---

## Table of Contents

- [Installation](#installation)  
- [Configuration](#configuration)  
- [Running the Application](#running-the-application)  
- [API Endpoints](#api-endpoints)  
- [Testing](#testing)  
- [Test Coverage](#test-coverage)  
- [AI Tools Used](#ai-tools-used)  

---


## Installation

1. Clone the repository:

bash
git clone https://github.com/kommak/developer-technical-assessment-starter-kit
cd projects/backend

2. Install dependencies:
npm install

3. Ensure Docker is running if you are using a PostgreSQL container.

Create a .env file in the root directory with the following variables:
JWT_SECRET=mySuperSecretKey123

DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=postgres


Running the Application
Start the application:
npm run start:dev

The API will run at: http://localhost:3000/api
CORS is enabled for:
http://localhost:3000
http://localhost:3001

API Endpoints

Listings
GET /api/listings/popular – Get top viewed listings
GET /api/listings/featured – Get randomly featured listings

Projects
GET /api/project – Get all projects (JWT protected)
GET /api/project/top-viewed – Get top viewed projects
GET /api/project/:id – Get project by ID
POST /api/project – Create project

Properties
GET /api/property – Get all properties
GET /api/property/top-viewed – Get top viewed properties
GET /api/property/:id – Get property by ID
POST /api/property – Create property

Lands
GET /api/land – Get all lands
GET /api/land/top-viewed – Get top viewed lands
GET /api/land/:id – Get land by ID
POST /api/land – Create land

Users
GET /api/users – Get all users
POST /api/users – Register a user

Agent Contacts
POST /api/agent-contact – Create an agent contact

Auth
POST /api/auth/login – User login
POST /api/auth/register – Register a user

Test Coverage
92.56% Statements 411/444 71.57% Branches 141/197 98.61% Functions 71/72 92.06% Lines 348/378

AI Tools Used
- ChatGPT (GPT-5 Mini) – help in generating unit and test files,
help in prepare seeding data, and documentation support.
- Gemeni  – help in generate UI and design the front-end

Notes
Seed data for projects, properties, and lands can be generated using src/database/seed.ts.
The API uses TypeORM with PostgreSQL and JWT authentication.
Serve static images from /images path.