# React Exam Project

This project is built with **Next.js App Router** and covers authentication, cart functionality, and product management using **Redux Toolkit**.

---

## Tech Stack

- Next.js (App Router)
- React
- Redux Toolkit
- React Hook Form
- Yup
- FakeStore API
- CSS Modules

---

## Authentication

- Login implemented using FakeStore API  
  Endpoint: https://fakestoreapi.com/auth/login
- Validation handled with **react-hook-form** and **yup**
- "Remember me" functionality:
  - If checked, user token is saved in `localStorage`
  - User is automatically authenticated on page refresh
- Redirect to products page after successful login

Example credentials:

```json
{
  "username": "johnd",
  "password": "m38rmF$"
}
```
