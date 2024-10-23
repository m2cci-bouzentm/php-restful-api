# PHP RESTful API with React Frontend

This project is a PHP (vanilla) RESTful API for managing albums, bands, and songs, with a React frontend.

## Table of Contents

- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [License](#license)

## Project Structure

```
backend/
    .env
    composer.json
    config/
        dbconfig.php
    controllers/
        album/
        band/
        index.php
        song/
    core/
    db/
    includes/
    index.php
    Model/
    routes/
frontend/
    .env
    index.html
    package.json
    postcss.config.js
    public/
    README.md
    src/
    tailwind.config.js
    tsconfig.app.json
    tsconfig.json
    tsconfig.node.json
    vite.config.ts
README.md
```

## Backend Setup

1. **Install Dependencies**: Navigate to the `backend` directory and run:
    ```sh
    composer install
    ```

2. **Environment Configuration**: Copy the `.env.example` to `.env` and configure your database settings.

3. **Database Setup**: Ensure your database is set up and configured correctly in `config/dbconfig.php`.

4. **Run the Server**: Start your PHP server. If you are using XAMPP, place the `backend` directory in the `htdocs` folder and start Apache.

## Frontend Setup

1. **Install Dependencies**: Navigate to the `frontend` directory and run:
    ```sh
    npm install
    ```

2. **Environment Configuration**: Copy the `.env.example` to `.env` and configure the `VITE_API_URL` to point to your backend API.

3. **Run the Development Server**: Start the Vite development server:
    ```sh
    npm run dev
    ```

## Usage

Once both the backend and frontend servers are running, you can access the application in your browser. The frontend will interact with the backend API to manage albums, bands, and songs.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.