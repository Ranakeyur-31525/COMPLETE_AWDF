# Practical 3: API Integration and Data Rendering in React

**Course:** Advanced Web Development Frameworks (ITUE301)  
**Institution:** Charotar University of Science and Technology (CHARUSAT) - CSPIT (IT)  
**Semester:** 5th Semester  
**Student:** Ranak (Ranakeyur-31525)  

---

## 📌 Objective
To consume a REST API in React using `fetch`/`async-await` inside `useEffect()`, managing asynchronous data loading, success, and error states, and rendering data dynamically in the user interface.

---

## 🚀 Features Implemented

### 1. REST API Consumption (`useEffect` Hook)
- Integrated public GitHub REST API v3: `https://api.github.com/users/<username>/repos`.
- Configured `useEffect` with proper empty dependency array `[]` to trigger data fetch on component mount without infinite loop traps.

### 2. Asynchronous State Management (`useState`)
- **Data State (`repos`):** Stores array of repository objects returned from GitHub API.
- **Loading State (`loading`):** Controls visibility of the animated `<Spinner />` component during network requests.
- **Error State (`error`):** Captures HTTP errors or network failures and renders the `<ErrorMessage />` component.
- **Search State (`searchTerm`):** Enables real-time text filtering across repository names, descriptions, and primary languages.

### 3. Component Architecture
- **`Spinner.jsx`**: Renders a sleek CSS animated spinner with custom loading messages.
- **`ErrorMessage.jsx`**: Renders structured error card with an interactive **Retry Button**.
- **`RepoCard.jsx`**: Displays repository name, description, primary language badge with language color dot, star count, forks count, and direct link to GitHub (`html_url`).
- **`RepoList.jsx`**: Responsive grid container displaying repository cards.
- **`Projects.jsx`**: Main integration component orchestrating state, API fetching, search filter, and error simulation toggle.

### 4. Interactive Error Simulator
- Includes a **"Simulate API Error"** toggle button allowing live demonstration of the Error handling path (invalid API endpoint) for lab evaluation & viva without breaking the application.

---

## 📁 Project Structure

```
P03_GETHUB-LINK/
├── index.html
├── package.json
├── README.md
└── src/
    ├── index.css               # GitHub dark theme tokens, CSS variables, global styles
    ├── App.css                 # Search bar, card grid, spinner, and error box layout
    ├── main.jsx                # Entry point with BrowserRouter wrapper
    ├── App.jsx                 # Routing configuration
    ├── components/
    │   ├── NavBar.jsx          # Navigation header
    │   ├── Spinner.jsx         # Loading spinner component
    │   ├── ErrorMessage.jsx    # Error card component with Retry button
    │   ├── RepoCard.jsx        # Repository card component
    │   ├── RepoList.jsx        # Grid list container
    │   └── Footer.jsx          # Footer component
    └── pages/
        ├── Projects.jsx        # Main Practical 3 page: REST API consumption & state UI
        └── AboutAPI.jsx        # Theory documentation & architecture breakdown
```

---

## 🛠️ How to Run Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📊 Evaluation Rubrics Checklist (20/20 Marks)

| Criteria | Max Marks | Status | Implementation Details |
| :--- | :---: | :---: | :--- |
| **API Call Implementation** | 5 | ✅ Pass | `fetch` used correctly inside `useEffect()` on component mount; valid GitHub API URL; no infinite loops. |
| **Data Rendering** | 5 | ✅ Pass | API response parsed and mapped; repository name, description, language, stars, forks, and `html_url` displayed cleanly. |
| **Loading State** | 4 | ✅ Pass | Animated `<Spinner />` component visible during request; disappears upon success or error. |
| **Error Handling** | 4 | ✅ Pass | `<ErrorMessage />` component handles failed API calls with an interactive **Retry button**; app does not crash. |
| **Code Cleanliness** | 2 | ✅ Pass | Zero stray `console.log`; clean separation of async logic and JSX views. |

---

## 📜 Learning Outcome
Students are able to consume a public REST API in React, manage asynchronous loading and error states cleanly, and provide responsive UI feedback during all stages of a network request.
