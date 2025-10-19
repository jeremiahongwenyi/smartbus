🚌 SmartBus – Online Bus Booking System

SmartBus is a modern web-based bus booking system that allows users to search, select, and book bus seats conveniently online.
It is developed as part of the ALX Frontend Development Capstone Project and demonstrates skills in React, Vite, Tailwind CSS, Zustand, and Firebase integration.

📋 Table of Contents

Project Overview

Features

Tech Stack

System Workflow

Installation & Setup

Project Structure

Screenshots (Coming Soon)

Next Steps

Author

🚀 Project Overview

The SmartBus Online Booking System provides an intuitive and seamless interface for users to:

Search for available routes and buses.

Select seats in real time.

Fill in passenger details.

Make secure payments.

Generate and download dynamic booking receipts.

This project demonstrates frontend best practices including:

API consumption

UI development

State management

Error handling

Integration with a backend (Firebase)

✨ Features
1. Route Selection

Users can select starting and destination points from preconfigured routes (via Firebase).

Option for one-way or round-trip booking.

Ability to swap “From” and “To” routes easily.

Displays a “No Buses Found” page when no results match.

2. Date Selection

Calendar interface for selecting travel dates.

Restricts selection of past dates and dates beyond 1 month.

Displays friendly error messages for invalid date selections.

3. Bus & Seat Selection

Fetches available buses for selected routes.

Displays seats visually (🟩 available, 🟥 booked).

Prevents double-booking through Firebase real-time updates.

4. Passenger Details

Captures full name, age, ID number, and contact info.

If passenger is under 18, requires two emergency contacts before proceeding.

5. Payment & Receipt

Offers multiple payment options (Cash, Card, Mobile Money).

Generates a dynamic receipt upon payment confirmation, containing:

Passenger info

Route, bus name, seat number

Departure time & travel date

Booking reference ID

Total price

Date of booking

Receipt can be:

Printed 🖨️

Downloaded as PDF 📄

Shared via the Web Share API 🔗

🧠 Tech Stack
Category	Technologies
Frontend Framework	React (Vite)
Styling	Tailwind CSS v4
State Management	Zustand
Routing	React Router
Backend / Database	Firebase (Realtime Database)
Version Control	Git & GitHub
🔄 System Workflow

Home Page – User lands on the home page.

Search Route – User selects departure, destination, and travel date.

Bus Availability – Firebase returns matching buses.

Seat Selection – User selects an available seat.

Passenger Details – User fills required info.

Payment – User completes payment process.

Confirmation & Receipt – Booking confirmation and downloadable receipt shown.

⚙️ Installation & Setup

Follow the steps below to run the project locally:

# 1. Clone the repository
git clone https://github.com/jeremiahongwenyi/smartbus.git
cd smartbus

# 2. Install dependencies
npm install

# 3. Install Tailwind CSS (if not yet installed)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 4. Start the development server
npm run dev

🗂️ Project Structure
smartbus/
├── public/
│   └── index.html                # Root HTML file
│
├── src/
│   ├── assets/                   # Static assets (images, icons, etc.)
│   ├── components/               # Reusable React components
│   │   ├── ui/                   # UI-specific components
│   │   │   ├── BusCard.tsx
│   │   │   └── RouteSearch.tsx
│   │
│   ├── lib/                      # Shadcn Utility functions 
│   │   └── firebase.ts
│   │
│   ├── pages/                    # Main application pages
│   │   ├── Home.tsx
│   │   ├── BusesPage.tsx
│   │   ├── SeatSelection.tsx
│   │   ├── CustomerPage.tsx
│   │   ├── PaymentPage.tsx
│   │   └── Confirmation.tsx
│   │
│   ├── store/                    # Zustand global stores
│   │   ├── busStore.ts
│   │   └── customerStore.ts
│   │
│   ├── App.tsx                   # Main React component
│   ├── main.tsx                  # Application entry point
│   ├── App.css
│   └── index.css
│
├── components.json               # shadcn/ui configuration
├── eslint.config.js              # ESLint configuration
├── package.json                  # Project dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite configuration
└── README.md                     # Project documentation
