# 🌸 Petal & Knot — Full Stack E-Commerce Website

Boho handmade e-commerce platform built with **React + Node.js + MongoDB**.

---

## 🗂 Project Structure

```
petal-and-knot/
├── backend/                  # Node.js + Express API
│   ├── models/
│   │   ├── User.js           # User schema (admin / customer)
│   │   ├── Product.js        # Product schema
│   │   └── Order.js          # Enquiry/order schema
│   ├── routes/
│   │   ├── auth.js           # Register, login, /me
│   │   ├── products.js       # CRUD for products
│   │   └── orders.js         # Submit & manage enquiries
│   ├── middleware/
│   │   ├── auth.js           # JWT protect + adminOnly
│   │   └── seedAdmin.js      # Auto-creates first admin user
│   ├── server.js             # Express app entry point
│   ├── .env.example          # Environment variable template
│   └── package.json
│
├── frontend/                 # React app
│   ├── public/index.html
│   ├── src/
│   │   ├── api.js            # Axios instance with JWT interceptors
│   │   ├── App.js            # Routes
│   │   ├── index.js          # Entry point
│   │   ├── index.css         # Global design system
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── components/
│   │   │   ├── Navbar.js / .css
│   │   │   ├── Footer.js / .css
│   │   │   └── ProductCard.js / .css
│   │   └── pages/
│   │       ├── Home.js / .css
│   │       ├── Shop.js / .css
│   │       ├── About.js / .css
│   │       ├── Contact.js / .css
│   │       ├── Login.js
│   │       ├── Register.js
│   │       ├── Auth.css
│   │       ├── Admin.js / .css
│   └── package.json
│
├── package.json              # Root: run both with one command
└── README.md
```

---

## ⚙️ Local Setup (Step by Step)

### Step 1 — Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org) v18 or higher
- [Git](https://git-scm.com)
- A free [MongoDB Atlas](https://cloud.mongodb.com) account

---

### Step 2 — Get a MongoDB Atlas Connection String

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) → Create free account
2. Create a **free M0 cluster**
3. Under **Database Access** → Add a user (e.g. `petaluser` / `yourpassword`)
4. Under **Network Access** → Add IP `0.0.0.0/0` (allow all — fine for development)
5. Click **Connect → Drivers** → Copy the connection string, looks like:
   ```
   mongodb+srv://petaluser:yourpassword@cluster0.abcde.mongodb.net/petal-and-knot
   ```

---

### Step 3 — Configure Environment Variables

In the `backend/` folder, create a `.env` file:

```bash
cd backend
cp .env.example .env
```

Then open `.env` and fill in your values:

```env
PORT=5000
MONGODB_URI=mongodb+srv://petaluser:yourpassword@cluster0.abcde.mongodb.net/petal-and-knot
JWT_SECRET=make_this_a_long_random_string_at_least_32_chars
ADMIN_EMAIL=admin@petalandknot.com
ADMIN_PASSWORD=Admin@123
NODE_ENV=development
```

In the `frontend/` folder, create a `.env` file:

```bash
cd frontend
cp .env.example .env
```

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

### Step 4 — Install Dependencies

From the **root** folder:

```bash
npm install
npm run install:all
```

This installs dependencies for both backend and frontend.

---

### Step 5 — Run the App

From the **root** folder, run both servers with one command:

```bash
npm run dev
```

This starts:
- **Backend** at `http://localhost:5000`
- **Frontend** at `http://localhost:3000`

Or run them separately:
```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm start
```

---

### Step 6 — First Login as Admin

When the backend starts for the first time, it auto-creates an admin user using the credentials in your `.env`:

- **URL:** `http://localhost:3000/login`
- **Email:** `admin@petalandknot.com` (or whatever you set)
- **Password:** `Admin@123` (or whatever you set)

After login you'll be redirected to the **Admin Dashboard** at `/admin`.

---

### Step 7 — Seed Your Products

In the Admin Dashboard:
1. Go to **Products** tab
2. Click **+ Add Product**
3. Fill in name, price, category, emoji, badge
4. Save — it appears on the Shop page immediately

---

## 🚀 Deployment (Free Hosting)

### Backend → Railway

1. Go to [railway.app](https://railway.app) → Sign up with GitHub
2. Click **New Project → Deploy from GitHub repo**
3. Select your repo, set the **Root Directory** to `backend`
4. Under **Variables**, add all your `.env` values:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `NODE_ENV=production`
5. Railway auto-detects Node.js and deploys
6. Copy your Railway backend URL — e.g. `https://petal-backend.up.railway.app`

---

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **New Project → Import** your GitHub repo
3. Set **Root Directory** to `frontend`
4. Under **Environment Variables**, add:
   ```
   REACT_APP_API_URL = https://petal-backend.up.railway.app/api
   ```
5. Click **Deploy**
6. Your site goes live at `https://petal-and-knot.vercel.app`

---

### Update CORS for Production

In `backend/server.js`, update the CORS origin to your Vercel URL:

```js
origin: process.env.NODE_ENV === 'production'
  ? ['https://petal-and-knot.vercel.app']  // ← your Vercel URL
  : ['http://localhost:3000'],
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| GET | `/api/auth/me` | Protected | Get current user |

### Products
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/products` | Public | Get all products |
| GET | `/api/products?category=macrame` | Public | Filter by category |
| GET | `/api/products/:id` | Public | Get single product |
| POST | `/api/products` | Admin | Add product |
| PUT | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Delete product |

### Orders / Enquiries
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/orders` | Public | Submit enquiry |
| GET | `/api/orders` | Admin | Get all enquiries |
| PUT | `/api/orders/:id` | Admin | Update status |
| DELETE | `/api/orders/:id` | Admin | Delete enquiry |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6 |
| Styling | Plain CSS with CSS Variables |
| HTTP Client | Axios (with JWT interceptor) |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Frontend Hosting | Vercel (free) |
| Backend Hosting | Railway (free tier) |

---

## 🎨 Brand Colors (CSS Variables)

| Variable | Value | Use |
|----------|-------|-----|
| `--dark-brown` | `#4A3728` | Primary buttons, headers |
| `--brown` | `#8B6F52` | Accents, hover states |
| `--cream` | `#F5F0E8` | Card backgrounds |
| `--beige` | `#E8DFD0` | Borders, section backgrounds |
| `--sage` | `#7A8C72` | Admin nav accent |
| `--accent` | `#C49A6C` | Gold highlights |
| `--warm-white` | `#FAF7F2` | Page background |

---

## 📝 Notes

- The admin user is **auto-created on first server start** using your `.env` credentials
- All product data is stored in MongoDB — nothing is hardcoded
- The Contact form saves enquiries to MongoDB and shows them in the Admin dashboard
- JWT tokens expire after **7 days**
- Run `npm run dev` from the root to start both servers simultaneously
