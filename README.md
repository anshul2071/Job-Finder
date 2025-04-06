# Job-Finder

Job-Finder is a full-stack web application designed to help users search for remote job listings, save selected jobs, and manage their saved jobs. The project uses the Remotive API to fetch remote jobs, and a custom Node.js/Express backend with a JSON file (`db.json`) to persist saved jobs. The frontend is built using React (with Vite), Redux Toolkit for state management, and Material-UI (MUI) for an attractive UI. Dark mode support, filtering, and pagination are also implemented.


## Features

- **Remote Job Search:**  
  Search for remote job listings by querying the Remotive API with debounced input to reduce unnecessary requests.

- **Save Jobs:**  
  Save jobs from the search results. The app checks for duplicates and displays a warning if a job is already saved.

- **Manage Saved Jobs:**  
  View all saved jobs on a dedicated page. Delete jobs from both the UI and the backend (`db.json`).

- **Filtering and Pagination:**  
  Filter job listings by category and paginate through search results for improved usability.

- **Dark Mode:**  
  Toggle between light and dark themes for a better user experience in different lighting conditions.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or later)
- [npm](https://www.npmjs.com/)

### Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/anshul2071/Job-Finder.git
cd Job-Finder
```

### Backend Setup

1. **Navigate to the Backend Directory:**

   ```bash
   cd backend
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Create the Mock Database File:**

   In the backend directory, create a file named `db.json` with the following content:

   ```json
   {
     "jobs": []
   }
   ```

5. **Run the Backend Server:**

   Start the server in development mode:

   ```bash
   npm run dev
   ```

   The backend server will run on http://localhost:5000 and exposes the following endpoints:

   - `GET /api/jobs` — Retrieve all saved jobs.
   - `POST /api/jobs` — Save a new job (with duplicate checking).
   - `DELETE /api/jobs/:id` — Delete a job by its ID.

### Frontend Setup

1. **Navigate to the Frontend Directory:**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Frontend Application:**

   Start the development server with Vite:

   ```bash
   npm run dev
   ```

   The frontend should be available at http://localhost:5173.

## Project Structure

```
Job-Finder/
├── backend/
│   ├── package.json          # Backend dependencies and scripts
│   ├── server.js             # Express server with API endpoints
│   └── db.json               # Mock database for saved jobs
└── frontend/
    ├── package.json          # Frontend dependencies and scripts
    ├── vite.config.js        # Vite configuration for React
    ├── index.html            # HTML entry point for the React app
    └── src/
        ├── api/
        │   └── jobApi.js     # API functions for fetching, saving, deleting jobs
        ├── components/
        │   ├── JobCard.jsx   # Component to display a single job with save/delete functionality
        │   └── JobList.jsx   # Component to list multiple jobs
        ├── pages/
        │   ├── Home.jsx      # Home page with job search, filtering, and pagination
        │   └── Saved.jsx     # Saved Jobs page that displays jobs from the local database
        ├── redux/
        │   ├── jobsSlice.js          # Redux slice for fetching jobs from the Remotive API
        │   ├── savedJobsSlice.js     # Redux slice for managing saved jobs (including async thunk for fetching saved jobs)
        │   ├── themeSlice.js         # Redux slice for managing dark/light theme
        │   └── store.js              # Redux store configuration combining all reducers
        ├── App.jsx           # Main App component with routing and theme provider
        └── main.jsx          # React entry point that renders the App component
```

## Technologies Used

### Frontend
- React with Vite for fast development and efficient bundling
- Redux Toolkit for managing application state
- Material-UI (MUI) for a robust and customizable UI
- Axios for making HTTP requests
- Lodash.debounce for implementing debounced search inputs

### Backend
- Node.js with Express to create RESTful API endpoints
- CORS to enable cross-origin resource sharing
- File System (fs) module to read and write data to db.json (serving as a mock database)

## Redux Store Structure

The application uses Redux Toolkit to manage state with the following structure:

### store.js
```javascript
import {configureStore} from '@reduxjs/toolkit';
import jobsReducer from './jobsSlice';
import savedJobReducer from './savedJobsSlice';
import themereducer from './themeSlice';

export const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        savedJobs: savedJobReducer,
        theme: themereducer,
    },
});
```

### themeSlice.js
```javascript
import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { darkMode: false },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
```

## How It Works

### Job Search:
The Home page provides a search field that uses debouncing to query the Remotive API. Results are displayed with options to save individual jobs.

### Saving Jobs:
When a job is saved, a POST request is made to the backend. The backend checks for duplicates and stores the job in db.json. The UI displays a Snackbar notification on success or error.

### Viewing & Deleting Saved Jobs:
The Saved Jobs page fetches jobs from the backend and displays them. Each job card includes a Delete button that sends a DELETE request to the backend to remove the job from db.json and updates the Redux state accordingly.

### Dark Mode:
The Navbar contains a switch to toggle between dark and light themes. The theme state is managed in `themeSlice.js` using Redux, and the `toggleTheme` action is dispatched when the switch is clicked. This change is reflected across the application through the Material-UI theme provider in App.jsx.

## Troubleshooting

### Backend Not Responding:
Ensure that the backend server is running on port 5000. Test the endpoints using Postman or cURL (e.g., `curl -X GET http://localhost:5000/api/jobs`).

### Saved Jobs Not Showing:
Confirm that your db.json file has jobs saved. Use Redux DevTools to inspect the state and ensure the fetchSavedJobs thunk is dispatching properly.

### CORS Issues:
The backend uses the cors middleware. If you encounter CORS errors, check your browser settings and network configurations.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.

## Acknowledgments
- Remotive API for providing remote job data
- Material-UI for the UI components
- Redux Toolkit for making state management easier
- Vite for a fast development experience
