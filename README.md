# Job Listing Platform - Backend

## Overview
This is the backend service for the Job Listing Platform. It provides APIs for managing job listings, user authentication, and other related functionalities.

## Prerequisites
- Node.js
- npm or yarn

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/job-listing-platform.git
    cd job-listing-platform/backend
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

3. Create a `.env` file in the root directory and add your environment variables:
    ```env
    PORT=3000
    DATABASE_URL=your-database-url
    JWT_SECRET=your-jwt-secret
    ```

4. Run the development server:
    ```sh
    npm run dev
    # or
    yarn dev
    ```

## Scripts

- `dev`: Run the development server
- `build`: Build the project
- `start`: Start the production server

## Folder Structure

- `src/`: Source code
  - `controllers/`: Request handlers
  - `models/`: Database models
  - `routes/`: API routes
  - `middlewares/`: Custom middleware functions
  - `config/`: Configuration files
  - `utils/`: Utility functions
- `dist/`: Compiled code
- `tests/`: Test files

## Routes

- `GET /api/jobs`: Get all job listings
- `POST /api/jobs`: Create a new job listing
- `GET /api/jobs/:id`: Get a job listing by ID
- `PUT /api/jobs/:id`: Update a job listing by ID
- `DELETE /api/jobs/:id`: Delete a job listing by ID
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: User login

## Contributing
Please read the [CONTRIBUTING.md](../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
