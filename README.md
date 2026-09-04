<img width="1435" height="826" alt="Screenshot 2026-09-04 at 16 41 12" src="https://github.com/user-attachments/assets/a3342af4-c37b-4776-894b-f6b9e8065165" /># 🛒 My Shop Aisle
A clean and simple shopping list web application that lets you register, log in securely, and create, manage, search, sort, and filter your own personal shopping lists; complete with images picked straight from a live photo search.

🚀 **Live Link:** [Click here to open my live app!](https://my-shopping-aisle.vercel.app/)

---

## 📖 About The App
> My Shop Aisle is a shopping list manager application built for users to add and manage their shopping lists. Users can register and log in with encrypted credentials, then create shopping list items with a name, quantity, category, optional notes, and an image — searched live from Pixabay right inside the form. Items can be searched by name, sorted by name, category or date added, and filtered by name, with all of it reflected in the URL. Users can also manage their profile, pick from a set of illustrated avatars, and update their password, all from one page.

---

## 📸 App Screenshots

<img width="1435" height="826" alt="Screenshot 2026-09-04 at 16 41 12" src="https://github.com/user-attachments/assets/8f175382-f0e5-4b98-867c-0fd948a4827e" />
<img width="1465" height="833" alt="Screenshot 2026-09-04 at 16 41 56" src="https://github.com/user-attachments/assets/db2523eb-5e66-4712-a50a-d0fcde72d3a6" />
<img width="1458" height="831" alt="Screenshot 2026-09-04 at 16 42 10" src="https://github.com/user-attachments/assets/10afb614-e419-4419-bd8e-555abdfd7bb6" />
<img width="1463" height="829" alt="Screenshot 2026-09-04 at 16 42 26" src="https://github.com/user-attachments/assets/3b37a125-67f6-4f5d-8627-a5be8466302f" />


---

## ✨ Cool Features I Built
*   **Live Image Search:** As soon as you start typing an item's name, matching images pull in automatically from Pixabay.
*   **URL-Aware Search, Sort & Filter:** Searching, sorting, and filtering items all update the URL, so a specific view can be shared or bookmarked and reloaded exactly as it was.
*   **Persistent Sessions:** Refreshing the page never logs you out — your session is automatically restored from the server.
*   **Protected Routing:** Logged-in users can't land back on the Login/Register pages, and logged-out users can't reach Home or Profile directly through the URL.
*   **Avatar Picker:** New users get a default avatar automatically, and can swap it for any of the illustrated options on their profile at any time.
*   **One-Click Profile Save:** Name, surname, cell number, and password all update through a single "Save Changes" action, and the password fields are optional and only apply if filled in.

---

## 🛠️ Tools Used to Build It
*   **React & TypeScript:** The code structure used to build the interface and components safely.
*   **Redux Toolkit:** Manages authentication, profile, and shopping list state across the entire app.
*   **React Router:** Handles page navigation and protects routes based on login status.
*   **json-server:** A lightweight backend that stores users, profiles, and shopping list items as JSON data.
*   **bcryptjs:** Hashes user passwords before they're ever stored, so raw passwords are never saved anywhere.
*   **Pixabay API:** Powers the live image search used to pick a picture for each shopping list item.
*   **Vite:** The modern development tool that makes coding and running the app locally super fast.
*   **Custom CSS:** Built from scratch, component by component, to handle layout, color, and responsive design down to 320px screens.
*   **Vercel:** Hosts the live frontend so anyone can use it from their phone or computer.
*   **Render:** Hosts the live json-server backend that the deployed frontend talks to.

---

## ⚙️ How to Run It on Your Computer
This project has two parts: the React frontend, and the json-server backend. Both need to be running for the app to work locally.

### 1. Run the backend (json-server)
```bash
git clone https://github.com/mapk6-apl/shop-list-server
cd shop-list-server
npm install
npm start
```
This starts the server, by default at `http://localhost:3001`.

### 2. Run the frontend
```bash
git clone https://github.com/mapk6-apl/my-shop-aisle
cd my-shop-aisle
npm install
```
Before starting, open `src/api/config.ts` and make sure `API_BASE_URL` points to `http://localhost:3001` (or wherever your local json-server is running).

You'll also need a `.env` file in the project root with your own Pixabay API key:
```
VITE_PIXABAY_API_KEY=your_key_here
```

Then start the app:
```bash
npm run dev
```

---

## 🔐 A Note on Password Security
User passwords are hashed with `bcrypt` before they ever leave the browser — they are never stored or transmitted in plain text. This is a one-way process by design: it's not possible to "decrypt" a hashed password back to its original form, even by the app itself. Logging in works by hashing the entered password and comparing it to the stored hash, which is the industry-standard, secure way to handle credentials.

---

## 📝 Credits
Copyright © 2026 My Shop Aisle. All rights reserved.
No one may distribute or modify this code.
