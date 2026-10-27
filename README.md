# AuthPortal — User Registration and Login Form (ReactJS)

> **Web Technology Laboratory (2304362L) — Assignment 3**  
> **Institute:** MIT Academy of Engineering, Pune  
> **Department:** Computer Engineering  
> **Academic Year:** 2025–26  
> **Student Name:** Tejas Mali | **PRN:** 202401040083  

---

## 1. Project Overview & Objective

The objective of this assignment is to design and develop a complete, responsive, and secure **User Registration and Login Form** front-end web application using **ReactJS** and **Vite**.

The application showcases fundamental and advanced React concepts mandated by the curriculum:
- **Functional Components** with clear separation of concerns.
- **Props** for passing handlers, labels, configuration, and validation states.
- **Controlled Inputs** where form elements derive their value and changes directly through React state.
- **React Hooks** (`useState` for dynamic state and `useEffect` for local storage synchronization).
- **Real-Time Client-Side Validation** with custom regular expressions and live visual feedback.
- **Strict Submit Button Safeguards** preventing premature or invalid form dispatch.
- **Password Strength Evaluation** analyzing length, uppercase, lowercase, numbers, and special symbols.

---

## 2. Technology Stack

- **Front-End Framework:** React 18 (`react`, `react-dom`)
- **Build Tool & Dev Server:** Vite 5
- **Languages:** JavaScript (ES6+), HTML5, CSS3
- **Styling Architecture:** Pure CSS3 Variables with Navy-Blue (`#0f172a`), White (`#ffffff`), and Subtle Violet (`#6366f1` / `#4f46e5`) palette
- **Typography:** Google Fonts (*Plus Jakarta Sans* & *Inter*)
- **Icons:** Inline SVG Icons (Zero heavy external dependencies)

---

## 3. Project Structure

```text
registration-login-react/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AuthLayout.jsx         # App shell, academic ribbon, sidebar & tab switcher
│   │   ├── FormInput.jsx          # Reusable controlled text, email & phone input
│   │   ├── PasswordInput.jsx      # Password input with show/hide and strength meter
│   │   ├── ErrorMessage.jsx       # Accessible error alert component
│   │   ├── RegisterForm.jsx       # 6-field registration form with live validation
│   │   ├── LoginForm.jsx          # Login form with validation & remember-me
│   │   ├── SuccessMessage.jsx     # Post-registration confirmation card
│   │   └── UserDashboard.jsx      # Post-login demonstration user workspace
│   ├── utils/
│   │   └── validation.js          # Pure validation functions & regex patterns
│   ├── App.jsx                    # Root state coordinator & view switcher
│   ├── main.jsx                   # React root mounting entry point
│   └── index.css                  # Modern responsive design & theme tokens
├── index.html                     # HTML5 entry with metadata
├── package.json                   # Project dependencies and build scripts
├── vite.config.js                 # Vite development & build configuration
├── test-validation.js             # Automated 33-case validation test runner
├── .gitignore                     # Git exclusion rules
└── README.md                      # Comprehensive laboratory documentation
```

---

## 4. Key Validation Rules

| Field | Validation Criteria | Regex / Rule | Error Message |
|---|---|---|---|
| **Full Name** | Required, 3–50 chars, alphabets, spaces, and hyphens | `/^[a-zA-Z\s'.]{3,50}$/` | *"Full name must be at least 3 characters long."* |
| **Email Address** | Required, RFC-5322 compliant email format | `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/` | *"Please enter a valid email address (e.g., student@mitaoe.ac.in)."* |
| **Mobile Number** | Exactly 10 numeric digits, starting with 6, 7, 8, or 9 | `/^[6-9]\d{9}$/` | *"Mobile number must contain exactly 10 digits."* |
| **Password** | Min 8 chars, 1 uppercase (A-Z), 1 lowercase (a-z), 1 digit (0-9), 1 special char | Length >= 8 && `/[A-Z]/` && `/[a-z]/` && `/[0-9]/` && `/[!@#$%^&*...]/'` | *"Password must be at least 8 characters long with Aa, 1, @"* |
| **Confirm Password** | Must match the entered Password exactly | `confirmPassword === password` | *"Passwords do not match."* |
| **Terms & Conditions** | Checkbox must be explicitly checked | `Boolean(terms) === true` | *"You must accept the Terms and Conditions to register."* |
| **Register Button** | Disabled until all above criteria pass | `isRegistrationFormValid(...)` | Button is styled as disabled with reduced opacity |
| **Login Email/Password** | Required non-empty valid email & password | `isLoginFormValid(...)` | Login button disabled until valid |

---

## 5. React Hooks & Component Architecture

1. **`useState`**:
   - `formData` / `credentials`: Controlled values for each input field.
   - `errors`: Maps each field name to its active error string (clears automatically when resolved).
   - `touched`: Tracks user focus/blur interaction so error messages do not appear before the user interacts with a field.
   - `showPassword`: Boolean state toggling `<input type="password">` and `<input type="text">`.
   - `currentView`: Controls view transition (`'register'`, `'login'`, `'success'`, `'dashboard'`).

2. **`useEffect`**:
   - Synchronizes demo user accounts with `localStorage` on initial mount.
   - Restores persisted demo sessions if "Remember Me" was checked.

3. **Controlled Inputs**:
   - Every input has its `value={state}` and `onChange={handleChange}` wired directly, ensuring React is the single source of truth for the entire form state.

---

## 6. Local Setup & Execution Instructions (VS Code on Windows)

### Prerequisites
- Node.js (v18 or higher recommended; verified with v24.12.0)
- Visual Studio Code

### Step-by-Step Commands:
1. Open Windows PowerShell or Command Prompt.
2. Navigate to the project directory:
   ```powershell
   cd "C:\Users\tvmal\.gemini\antigravity\scratch\registration-login-react"
   ```
3. Install dependencies:
   ```powershell
   npm install
   ```
4. Run the local development server:
   ```powershell
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000` (or the port displayed in your terminal).
6. Run the automated validation unit tests:
   ```powershell
   node test-validation.js
   ```
7. Build for production:
   ```powershell
   npm run build
   ```

---

## 7. Deployment Instructions (Vercel & Netlify)

### Option A: Deploying via Vercel (Recommended)
1. Initialize Git in the project root:
   ```powershell
   git init
   git add .
   git commit -m "feat: complete registration and login form assignment 3"
   ```
2. Create a new public repository on [GitHub](https://github.com) named `mitaoe-react-auth-assignment`.
3. Push your repository:
   ```powershell
   git branch -M main
   git remote add origin https://github.com/<your-username>/mitaoe-react-auth-assignment.git
   git push -u origin main
   ```
4. Sign in to [Vercel](https://vercel.com) using your GitHub account.
5. Click **"Add New Project"** &rarr; Select your `mitaoe-react-auth-assignment` repository.
6. Build Settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. Click **"Deploy"**. Your live public URL will be generated within 60 seconds (e.g. `https://mitaoe-react-auth.vercel.app`).

### Option B: Deploying via Netlify
1. Sign in to [Netlify](https://www.netlify.com).
2. Choose **"Import from Git"** and connect your GitHub repository.
3. Configure build command: `npm run build` and publish directory: `dist`.
4. Alternatively, drag and drop the `dist/` directory directly into the Netlify Drop dashboard for immediate instant hosting.

---

## 8. Known Limitations & Academic Disclaimer

- **Client-Side Simulation:** This project is developed strictly for academic demonstration in Web Technology (2304362L).
- Authentication uses browser `localStorage` and `sessionStorage` to simulate end-to-end registration and sign-in flows. It does not connect to a remote backend database (such as MongoDB or PostgreSQL) and is not intended for production-grade credentials.
- Passwords are not encrypted with bcrypt on the client side since real password hashing is a server-side responsibility.
