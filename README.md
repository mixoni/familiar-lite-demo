# Familiar Lite – Full-Stack Demo  
### Next.js App Router • Storybook • NestJS • PostgreSQL • Prisma • CI/CD

A modern full-stack reference application demonstrating:

- **Next.js App Router** (SSR + Client Components)
- **Feature-based architecture**
- **Storybook 8** with full Next.js integration  
- **TailwindCSS**
- **Jest + React Testing Library**
- **NestJS backend**, modular architecture
- **Prisma ORM + PostgreSQL**
- **Docker Compose** infrastructure
- **GitHub Actions CI**

The project simulates a **Hotel CRM mini-platform** featuring hotels, guests, LTV metrics, segments, profile cards, and dashboards.

---

# 🚀 Project Overview

## **Frontend (Next.js)**  
- App Router  
- Feature directories (`features/hotels`, `features/guests`)  
- Server Components + Client Components  
- Fully typed HTTP layer  
- Tailwind design  
- Storybook with Next-decorators  
- Jest UI tests  

## **Backend (NestJS)**  
- Modular architecture  
- Prisma ORM  
- Auto DB migrations  
- Seeder  
- DTO validation  
- REST endpoints for hotels & guests  

## **Database**  
- PostgreSQL via Docker  
- Prisma schema  
- Auto-seeding of demo data  

## **CI/CD – GitHub Actions**  
Runs automatically on push:

1. Install pnpm  
2. Install dependencies  
3. Run Jest tests  
4. Build Next.js  
5. Build Storybook  
6. Build Nest API  

---

# 🛠 Local Setup Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/<your>/familiar-lite-demo.git
cd familiar-lite-demo
```

---

# 2️⃣ Install Dependencies

```bash
pnpm install
```

Backend:

```bash
cd api
pnpm install
cd ..
```

---

# 3️⃣ Start PostgreSQL Using Docker

```bash
docker compose up -d
```

- DB: `localhost:5532`  
- Adminer UI: `http://localhost:8080`  

---

# 4️⃣ Configure API Environment Variables

Create **api/.env**:

```env
DATABASE_URL="postgresql://familiar:familiar@localhost:5532/familiar_db?schema=public"
```

---

# 5️⃣ Run Prisma Migrations + Seed

```bash
cd api
pnpm prisma migrate dev --name init
pnpm prisma db seed
cd ..
```

---

# 6️⃣ Start Backend API

```bash
cd api
pnpm start:dev
```

➡ Runs at: **http://localhost:3001**

---

# 7️⃣ Start Frontend (Next.js)

In project root:

```bash
pnpm dev
```

➡ Runs at: **http://localhost:3000**

---

# 8️⃣ Start Storybook

```bash
pnpm storybook
```

➡ Runs at: **http://localhost:6006**

---

# 🧪 Running Tests

Run Jest tests:

```bash
pnpm test
```

---

# 📁 Project Structure

```
familiar-lite-demo/
 ├── app/                  # Next.js app router
 ├── features/             # Feature-based UI modules
 ├── storybook/            # Storybook config
 ├── api/                  # NestJS backend
 │   ├── prisma/           # Prisma schema + migrations
 │   ├── src/              # Modules, services, controllers
 ├── docker-compose.yml    # PostgreSQL infra
 ├── .github/workflows/    # CI pipelines
```

---

# 🌟 What This Demo Demonstrates

✔ Modern **Next.js + Storybook** component workflows  
✔ Type-safe FE/BE integration  
✔ Clean NestJS modular backend  
✔ CI pipeline ready for production  
✔ Expandable SaaS-friendly architecture  
✔ Realistic CRM-like domain logic  

---

# 📄 License

MIT  
