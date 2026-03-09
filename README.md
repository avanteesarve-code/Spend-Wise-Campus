# 💸 Spend Wise Campus

AI-powered expense tracking platform designed for students to **manage money smarter, track spending, and gain financial insights**.

Built with **Next.js, Prisma, Clerk Authentication, and AI-powered receipt scanning**, Spend Wise Campus helps students stay financially aware with a modern fintech-style dashboard.

---

## 🚀 Live Demo

🔗 https://spend-wise-campus-g4gm.vercel.app/

---

## ✨ Features

### 🔐 Secure Authentication

* User authentication powered by **Clerk**
* Secure login and user session management
* Protected routes for dashboard and transactions

### 📊 Smart Expense Dashboard

* Track all expenses and income in one place
* View **recent transactions**
* Interactive **expense charts**

### 💳 Account Management

* Create multiple financial accounts
* Set default account for transactions
* Monitor balances in real time

### 🧾 AI Receipt Scanner

* Upload receipt images
* Extract text using **Tesseract.js OCR**
* Automatically populate transaction details

Supports scanning:

* Physical receipts
* Google Pay screenshots
* PhonePe screenshots
* Paytm screenshots

### 📈 Expense Insights

* Monthly expense breakdown
* Visual charts using **Recharts**

### ⚡ Security & Protection

* Request protection using **Arcjet**
* Rate limiting and bot detection
* Secure server actions

---

## 🛠 Tech Stack

**Frontend**

* Next.js 15
* React 19
* Tailwind CSS
* Shadcn UI
* Recharts

**Backend**

* Next.js Server Actions
* Prisma ORM
* PostgreSQL

**Authentication**

* Clerk

**Security**

* Arcjet

**AI / OCR**

* Tesseract.js

---

## 📂 Project Structure

```
app/
 ├─ dashboard
 ├─ account
 ├─ transaction
 └─ api

actions/
 ├─ accounts.js
 ├─ dashboard.js
 ├─ transaction.js

components/
 ├─ header.jsx
 ├─ receipt-scanner.jsx
 ├─ transaction-form.jsx

lib/
 ├─ prisma.js
 ├─ receipt-parser.js
 ├─ ocr.js
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

ARCJET_KEY=
```

---

## 🧪 Local Development

Clone the repository

```
git clone https://github.com/avanteesarve-code/spend-wise-campus.git
```

Install dependencies

```
npm install
```

Generate Prisma client

```
npx prisma generate
```

Run development server

```
npm run dev
```

App will run on:

```
http://localhost:3000
```

---

## 🚀 Deployment

This project is deployed using **Vercel**.

Steps:

1. Push project to GitHub
2. Import repository in **Vercel**
3. Add environment variables
4. Deploy

---

## 👩‍💻 Author

**Avantee Sarve**
---

## ⭐ Support

If you like this project, please consider giving it a **star ⭐ on GitHub**.
