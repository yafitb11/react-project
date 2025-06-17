# 🌐 Final Project – REACT-VITE-TYPESCRIPT - Business Web Application with RESTful API

This is a web application developed as part of a final project in a Full-Stack Web Development course. It simulates a real-world business platform using a RESTful API provided via Postman and implements features for users and admin roles, authentication, appointment management, and more.

## 📁 Project Structure

The application includes the following main pages and features:

- **Homepage** – Showing Bussiness Cards of all users.
- **Register / Login** – User registration and authentication with validation and JWT token
- **User Profile** – View and update personal information (Bonus)
- **Create/Edit Business Cards** – Users can manage their own cards (CRUD)
- **View Card Details** – See details about any card, including Google Maps integration
- **Mark Favorites** – Users can mark and save favorite cards, and view them on Favorites Page
- **Admin Dashboard (CRM)** – Admin-only page to view, update, and delete users (Bonus)
- **Dark/Light Mode Toggle** – Theme switcher across all pages
- **Search and pagination** – for a friendly use. *Please note that 'myCards' page doesen't have them, as it isn't likely for a bussiness to have more than 12 bussiness cards.

## 🧰 Technologies

- **React** (Vite)
- **React Router DOM** – routing
- **Axios** – HTTP requests
- **Tailwind CSS** – styling and responsiveness
- **React Icons** – icon library
- **Redux Toolkit** – global state management
- **React Redux** – Redux integration with React
- **different React Hooks** – for different uses
- **Custom React Hooks** – reusable logic for cleaner code
- **JWT (JSON Web Token)** – authentication (stored in `localStorage`)
- **Regex Validation** – for form input

## 🔐 Authentication

- Secure user authentication using JWT tokens.
- Tokens are stored securely in `localStorage`.
- Logged-in state is globally managed via Redux.

## ⚙️ Features

- **Global State**: Implemented using Redux for auth and search filters.
- **Hooks and Custom Hooks**: For form logic, token checks, and more.
- **Responsive Design**: Built desktop-first and mobile responsive using Tailwind's utility classes.
- **Dark/Light Mode**: Toggle theme with state-based rendering.
- **Pagination**: Implemented manually using global search and page state.

## 📦 Installation

```
git clone https://github.com/yafitb11/react-project.git
cd react-project
npm install
npm run dev
```

## 📄 License

This project is for educational purposes only.
