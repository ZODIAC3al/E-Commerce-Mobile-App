#  E-Commerce Mobile App

A **React Native** e-commerce mobile application built with **NativeBase** for UI and **Supabase** for authentication and data storage. The app provides a seamless shopping experience with features like product listings, deals, authentication, and light & dark mode support.

##  Features

- 🔹 **User Authentication** (Sign up, Login, Logout) using Supabase
- 🔹 **Product Listings** with detailed view
- 🔹 **Deals & Discounts** dynamically applied to products
- 🔹 **Dark & Light Mode** with persistent theme settings
- 🔹 **Cart & Checkout** (Planned)
- 🔹 **Wishlist** (Planned)

##  Tech Stack

- **Frontend**: React Native, NativeBase, Expo Router
- **Backend**: Supabase (Authentication, Database, Storage)
- **State Management**: React Context API / React Query

## 📂 Folder Structure

```
/root
 ├── app
 │   ├── _layout.js  # Main layout
 │   ├── index.jsx    # Home Screen
 │   ├── (auth)/      # Authentication Screens
 │   │   ├── _layout.js
 │   │   ├── login.jsx
 │   │   ├── signup.jsx
 │   ├── (tabs)/      # Bottom Tab Screens
 │   │   ├── _layout.js
 │   │   ├── profile.jsx
 │   ├── products/    # Product Details
 │   │   ├── [id].jsx
 ├── components/      # Reusable UI Components
 ├── hooks/           # Custom Hooks
 ├── utils/           # Utility Functions
 ├── services/        # API Calls
 ├── styles/          # Global Styles
 ├── App.js           # Entry Point
```

## ⚡ Installation & Setup

1. **Clone the Repository**

   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install Dependencies**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add your Supabase credentials:

   ```sh
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the App**

   ```sh
   npx expo start
   ```

##  Future Improvements

-  **Cart & Checkout** integration
-  **Payment Gateway** support
-  **Order History & Tracking**
-  **Push Notifications**

##  Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

##  License

This project is licensed under the **MIT License**.

---

 **Made with ❤️ by Ali Maher**

