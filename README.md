# 📈 Algorithmic Paper Trader

A full-stack, containerized web application that allows users to paper-trade stocks using real-time market data. Built with a microservices architecture and deployed via CI/CD pipelines.

## 🚀 Live Demo
* **Frontend:** https://paper-trader-app.vercel.app/
* **Backend API:** https://paper-trader-rvk1.onrender.com

## 🛠️ Tech Stack
* **Frontend:** React (TypeScript), Vite, Tailwind CSS, Recharts (for data visualization)
* **Backend:** Node.js, Express.js, TypeScript
* **Database:** PostgreSQL (Supabase)
* **Infrastructure & Deployment:** Docker, Vercel (Frontend edge network), Render (Containerized backend API)

## ✨ Current Features
* **Real-Time Market Data:** Integrates with third-party financial APIs (Alpha Vantage/Finnhub) to fetch current stock prices and historical data.
* **Interactive Charting:** Visualizes 30-day moving stock trends using Recharts.
* **Trade Execution:** REST API endpoints to execute buy orders.
* **Database Management:** Relational database schema managing users, portfolios (cash balances), and transactional history.

## 🏗️ Architecture
The application separates the client and server to mimic enterprise environments:
1. `client/`: A Vite React SPA hosted on Vercel. Communicates with the API via Axios.
2. `server/`: An Express.js REST API. Containerized via Docker and deployed on Render. Handles business logic and database interactions.
3. `Database`: A managed PostgreSQL instance hosted on Supabase, utilizing connection pooling (IPv4) for serverless compatibility.

## 💻 Local Setup
To run this project locally:

**1. Clone the repository**
```bash
git clone https://github.com/m-zack-k/paper-trader.git
```

**2. Setup Backend
```bash
cd server
npm install
# Create a .env file with your DATABASE_URL and PORT=3001
npm run build
npm start
```

**3. Setup Frontend
```bash
cd ../client
npm install
# Create a .env file with VITE_API_URL=http://localhost:3001
npm run dev
```

## What's next
Implement Sell functionality with database constraints
