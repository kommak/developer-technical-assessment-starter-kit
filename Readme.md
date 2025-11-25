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
Press n or j to go to the next uncovered block, b, p or k for the previous block.

Filter:  
File		Statements		Branches		Functions		Lines	
backend	
0%	0/2	100%	0/0	100%	0/0	0%	0/2
backend/src	
97.72%	43/44	66.66%	4/6	100%	5/5	97.36%	37/38
backend/src/agent-contacts	
100%	44/44	77.27%	17/22	100%	5/5	100%	36/36
backend/src/agent-contacts/dto	
100%	4/4	100%	0/0	100%	0/0	100%	4/4
backend/src/auth	
93.24%	69/74	71.05%	27/38	100%	10/10	92.18%	59/64
backend/src/auth/dto	
100%	7/7	100%	0/0	100%	0/0	100%	7/7
backend/src/database	
46.8%	22/47	100%	0/0	87.5%	7/8	48.83%	21/43
backend/src/lands	
100%	50/50	72.41%	21/29	100%	10/10	100%	42/42
backend/src/listings	
100%	28/28	75%	12/16	100%	6/6	100%	22/22
backend/src/projects	
100%	50/50	68.96%	20/29	100%	10/10	100%	42/42
backend/src/properties	
100%	52/52	68.96%	20/29	100%	10/10	100%	44/44
backend/src/users	
100%	42/42	71.42%	20/28	100%	8/8	100%	34/34


AI Tools Used
- ChatGPT (GPT-5 Mini) – help in generating unit and test files,
help in prepare seeding data, and documentation support.
- Gemeni  – help in generate UI and design the front-end

Notes
Seed data for projects, properties, and lands can be generated using src/database/seed.ts.
The API uses TypeORM with PostgreSQL and JWT authentication.
Serve static images from /images path.