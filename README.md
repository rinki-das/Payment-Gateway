# Payment Gateway UI

A simulated payment gateway application built with Next.js App Router and TypeScript. The project demonstrates a complete frontend payment lifecycle including processing, success, failure, timeout handling, retry logic, transaction history persistence, and mock gateway integration.

## Live Demo

https://payment-gateway-self-three.vercel.app/

---

# Tech Stack

- Next.js App Router
- Next.js v16.2.4
- TypeScript
- Redux Toolkit
- React Hook Form
- Zod
- Tailwind CSS

---

# Features

- Real-time payment form validation
- Card number auto-formatting
- Card type detection
- Live card preview
- Payment lifecycle handling
  - Idle
  - Processing
  - Success
  - Failed
  - Timeout
- Retry payment flow with max retry limit
- Mock payment gateway API
- Transaction history persistence using localStorage
- Reusable transaction ID for retries
- Responsive UI for mobile and desktop

---

# Local Setup

## Clone the repository

```bash
git clone <repository-url>
```

## Install dependencies

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Application runs at:

```bash
http://localhost:3000
```

---

# Assumptions Made

- Payment gateway behavior is simulated using a mock API route
- Transaction history persistence is handled using localStorage
- Retry attempts are limited to 3 per transaction
- Timeout handling is managed on the frontend using AbortController

---

# Notes

- No third-party payment SDKs were used
- All payment responses are simulated server-side
- Built using modular component architecture and separated business logic
