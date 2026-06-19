# 🛒 Ecommerce Node.js API

A complete E-Commerce RESTful API built with **Node.js**, **Express.js**, and **MongoDB** following scalable backend architecture and clean code practices.

## 🚀 Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Role-Based Authorization
* Protected Routes

### Categories

* Create Category
* Get Categories
* Update Category
* Delete Category
* Upload Category Image

### SubCategories

* Create SubCategory
* Get SubCategories
* Update SubCategory
* Delete SubCategory
* Nested Routing Support

### Brands

* Create Brand
* Get Brands
* Update Brand
* Delete Brand
* Upload Brand Image

### Products

* Create Product
* Get Products
* Update Product
* Delete Product
* Upload Cover Image
* Upload Multiple Product Images
* Product Filtering
* Product Sorting
* Product Pagination
* Product Search

### Reviews

* Create Review
* Update Review
* Delete Review
* Get Product Reviews
* One Review Per User Per Product
* Automatic Product Rating Updates

### Favorites (Wishlist)

* Add Product To Favorites
* Remove Product From Favorites
* Get User Favorites

### Cart

* Add Product To Cart
* Update Product Quantity
* Remove Product From Cart
* Clear Cart
* Get User Cart

### Coupons

* Create Coupon
* Update Coupon
* Delete Coupon
* Apply Coupon To Cart

### Orders

* Create Cash Order
* Create Online Order
* Get User Orders
* Get All Orders (Admin)
* Automatic Product Quantity Update
* Automatic Sold Count Update

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Bcrypt
* Multer
* Cloudinary


---

## 📂 Project Structure

```bash
src/
│
├── modules/
│   ├── auth/
│   ├── user/
│   ├── category/
│   ├── subCategory/
│   ├── brand/
│   ├── product/
│   ├── review/
│   ├── favourite/
│   ├── cart/
│   ├── coupon/
│   └── order/
│
├── middlewares/
├── utils/
├── database/
└── app.js
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/AshrafGad1001/Ecommerce-node-js.git
cd Ecommerce-node-js
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000

DB_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_key
```

### Run Development Server

```bash
npm run dev
```

### Run Production

```bash
npm start
```

---

## 📌 Implemented Modules

| Module      | Status |
| ----------- | ------ |
| Auth        | ✅      |
| Category    | ✅      |
| SubCategory | ✅      |
| Brand       | ✅      |
| Product     | ✅      |
| Review      | ✅      |
| Favourite   | ✅      |
| Cart        | ✅      |
| Coupon      | ✅      |
| Order       | ✅      |

---

## ✨ Highlights

* Clean Architecture
* Reusable Middleware
* Error Handling Middleware
* JWT Authentication
* Cloudinary Image Uploads
* Product Rating Aggregation
* Cart & Coupon System
* Order Management
* Automatic Inventory Updates
* Scalable Folder Structure

---


## 👨‍💻 Author

**Ashraf Gad**

GitHub:
https://github.com/AshrafGad1001

LinkedIn:
[https://www.linkedin.com/in/ashraf-gad-228935234/](https://www.linkedin.com/in/ashraf-alaa-gad)

---

⭐ If you like this project, don't forget to star the repository.
