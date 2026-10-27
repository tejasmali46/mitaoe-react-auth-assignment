# Web Technology (2304362L) — Assignment 3 Viva Preparation Guide

**Practical Topic:** Front-End JavaScript Frameworks — ReactJS (User Registration and Login Form)  
**Student Name:** Tejas Mali | **PRN:** 202401040083 | **Institute:** MITAOE Pune  

---

## 1. Core ReactJS Concepts Asked in Viva

### Q1: What are Functional Components in React, and why are they preferred over Class Components?
**Answer:**  
Functional components are JavaScript functions that accept `props` as an argument and return JSX describing what should appear on the screen.  
They are preferred because:
1. Simpler, concise syntax without `this` binding issues.
2. Direct access to React state and lifecycle behaviors via **React Hooks** (`useState`, `useEffect`).
3. Better optimization, tree-shaking, and easier testability.

### Q2: What are Controlled Components (Controlled Inputs)?
**Answer:**  
In HTML, form elements like `<input>` typically maintain their own state in the DOM. In React, a **Controlled Component** has its value driven by React state (via the `value` prop) and any change updates that state through an event handler (via `onChange`).
- **Why it matters:** React becomes the single source of truth. We can inspect, validate, reformat, or reject user input synchronously on every single keystroke before updating state.

### Q3: Explain the role of `useState` in this project.
**Answer:**  
`useState` is a React Hook that declares a state variable and an updater function.
- In `RegisterForm`: We use `useState` for `formData` (storing values for fullName, email, mobile, password, confirmPassword, terms), `errors` (storing field-specific error messages), `touched` (tracking which inputs the user has visited), and `isSubmitting`.
- In `PasswordInput`: We use `useState` for `showPassword` (toggling password visibility between `'text'` and `'password'`).
- In `App`: We use `useState` for `currentView` (switching between `'register'`, `'login'`, `'success'`, `'dashboard'`).

### Q4: When is `useEffect` used in this application?
**Answer:**  
`useEffect` lets us perform side effects in functional components.
- In `App.jsx`, `useEffect` is invoked with an empty dependency array `[]` on component mounting. Its role is to synchronize with the browser's `localStorage` and `sessionStorage`:
  1. Reading existing registered demo accounts so that newly registered users persist across page reloads.
  2. Restoring an active session if the user previously selected "Remember Me".

### Q5: How is Real-Time Validation implemented?
**Answer:**  
Rather than waiting for the user to submit an invalid form, we implement a two-tier validation approach:
1. **On Change (`onChange`):** If the field has already been marked as `touched`, typing triggers validation immediately, clearing or updating error messages in real-time.
2. **On Blur (`onBlur`):** When the user leaves an input field, it is marked as `touched = true`, and validation runs instantly. This prevents annoying the user with error messages before they even begin typing.
3. **Pure Utility Functions:** All validation rules reside in `src/utils/validation.js` using regular expressions (Regex) for reusability and testability.

### Q6: How is the Register / Login button disabled state enforced?
**Answer:**  
The `<button>` element has the HTML attribute `disabled={!formIsValid}`.
- For Registration: `isRegistrationFormValid(formData, errors)` checks three conditions:
  1. All 6 mandatory fields have non-empty values.
  2. No error strings exist in the `errors` state object.
  3. All fields pass their pure validator functions (Name >= 3 chars, valid email format, 10-digit mobile, strong password, matching passwords, terms checked).
- Visual feedback: In `index.css`, `.btn-disabled` applies `opacity: 0.55`, `cursor: not-allowed`, and turns off hover effects so the user immediately knows the button is locked.

### Q7: How does the Password Strength Meter calculate complexity?
**Answer:**  
The helper function `evaluatePasswordStrength(password)` evaluates 5 independent security criteria:
1. Length $\ge 8$ characters
2. Contains at least one uppercase letter (`/[A-Z]/`)
3. Contains at least one lowercase letter (`/[a-z]/`)
4. Contains at least one numeric digit (`/[0-9]/`)
5. Contains at least one special symbol (`/[!@#$%^&*...]`)

It scores the password from 0 to 5, updating the progress bar width (20% to 100%) and changing color dynamically:
- Score 1–2: Weak (Red / Orange)
- Score 3: Fair (Amber)
- Score 4: Good (Blue)
- Score 5: Strong (Green)

### Q8: What is the difference between client-side validation and backend validation?
**Answer:**  
- **Client-Side Validation (React):** Runs directly in the user's browser. It provides immediate UX feedback, reduces unnecessary server requests, and guides the user. However, it can be bypassed (e.g. by disabling JavaScript or using curl/Postman).
- **Server-Side Validation:** Runs on the backend server. It is the ultimate security boundary, protecting the database from malicious injections, unauthorized data, or tampered payloads.

### Q9: How was the project built and deployed?
**Answer:**  
- **Development Tool:** Vite was chosen because it uses native ES modules (ESM) during development for sub-second startup and fast Hot Module Replacement (HMR).
- **Production Build:** Running `npm run build` uses Rollup under the hood to bundle and minify JavaScript and CSS into optimized static assets in the `dist/` directory.
- **Deployment:** The application is deployed on cloud platforms like **Vercel** or **Netlify** connected to GitHub, featuring automated Continuous Deployment (CD).
