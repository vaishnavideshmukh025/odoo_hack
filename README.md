# odoo_hack
A full-stack system built with Flask for the backend and React/Vite/Tailwind for the frontend.

## Project structure

- `backend/` - Flask API server, database models, routes, and middleware
- `frontend/` - React client application built with Vite and Tailwind CSS

## Requirements

- Python 3.11+ recommended
- Node.js 18+ recommended

## Backend setup

1. Open a terminal in `backend/`
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create environment variables if needed using a `.env` file
4. Run the backend server:
   ```bash
   python app.py
   ```
5. The API runs by default on `http://0.0.0.0:5000/`

## Frontend setup

1. Open a terminal in `frontend/`
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The frontend will be available at the address shown in the terminal, typically `http://localhost:5173/`

## Notes

- Backend routes are registered under `/api/`
- CORS is enabled for `/api/*`
- The project uses Flask-Migrate for database migrations and SQLAlchemy for ORM

## Useful commands

- Backend: `python app.py`
- Frontend: `npm run dev`
- Build frontend for production: `npm run build`

## License

This repository does not include a license file. Add one if you want to share or distribute the project.
