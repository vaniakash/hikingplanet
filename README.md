# BoundlessPath - Premium Trekking Platform

A modern, high-performance trekking management and booking platform built with Next.js 14, MongoDB, and Tailwind CSS.

## 🚀 Features

### User Features
- **Immersive Home Page**: Hero section with fade-in animations and featured treks.
- **Trek Listings**: Browse all available expeditions with filterable grid view.
- **Trek Details**: Rich detail pages with itinerary, inclusions, exclusions, and upcoming dates.
- **Booking System**: Select dates, enter guest details, and secure your spot.
- **Real Payments**: Integrated Razorpay payment gateway for instant confirmations.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.

### Admin Features
- **Secure Dashboard**: JWT-based authentication for admin access.
- **Trek Management**: Create, Edit, Delete treks with rich text and image support.
- **Trip Management**: Schedule specific batches (dates) and manage capacity.
- **Booking Management**: View all bookings, confirm payments, and manage cancellations.
- **Image Uploads**: Integrated Cloudinary support for trek images.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes (Serverless)
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Payments**: Razorpay
- **Image Storage**: Cloudinary

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/boundlesspath.git
   cd boundlesspath
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/boundlesspath

   # Auth Secret
   JWT_SECRET=your_super_secret_jwt_key

   # Cloudinary (Images)
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret

   # Razorpay (Payments)
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```

4. **Seed Database**
   Populate the database with an initial Admin user and sample treks:
   ```bash
   node scripts/seed-data.js
   ```
   > Default Admin: `admin` / `admin123`

5. **Run Locally**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`

## 🚀 Deployment

This project is optimized for **Vercel**.

1. Push your code to GitHub.
2. Import project in Vercel.
3. Add the Environment Variables from Step 3.
4. Deploy!

## 📂 Project Structure

```
├── src/
│   ├── app/              # Next.js App Router Pages & API
│   │   ├── admin/        # Admin Dashboard Pages
│   │   ├── api/          # Backend API Routes
│   │   ├── book/         # Booking Flow
│   │   ├── treks/        # Public Trek Pages
│   │   └── ...
│   ├── components/       # Reusable UI Components
│   ├── lib/              # Utilities (DB, Auth)
│   └── models/           # Mongoose Database Models
├── public/               # Static Assets
└── scripts/              # Helper scripts (Seeding)
```

## 📄 License
Private - BoundlessPath.
