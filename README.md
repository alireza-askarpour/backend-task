
### Project Setup Instructions

Follow the steps below to set up and run the project:

---

#### 1. **Create a Database in PostgreSQL**

1. Open your PostgreSQL client (e.g., `psql` command-line tool, pgAdmin, or any database management tool you prefer).
2. Create a new database named `chat_app`:
   ```sql
   CREATE DATABASE chat_app;
   ```
3. Note down the database credentials (e.g., username, password, host, port) as you will need them in the next step.

---

#### 2. **Configure Environment Variables**

1. Locate the `.env` file in the root directory of the project. If it doesn't exist, create a new file named `.env`.
2. Add the following database configuration to the `.env` file, replacing the placeholders with your actual PostgreSQL credentials:
   ```env
   # Database config
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASS=postgres
    DB_TYPE=postgres
    DB_NAME_TEST=test_database_name
    DB_NAME_DEVELOPMENT=chat_app
    DB_NAME_PRODUCTION=production_database_name

   ```
   Adjust other environment variables as needed for your local setup.
    ```env
    # APP
    APP_ID=c3784ad8-dbbe-47cc-8647-b91fca0ad2bb
    APP_PORT=3000
    NODE_ENV=development
    APP_DOMAIN=localhost:3000
    DOC_PATH=/api/docs
    APP_URL=http://localhost:3000
    
    # JWT config
    JWT_ACCESS_TIME=2592000
    JWT_CONFIRMATION_SECRET='random_string'
    JWT_CONFIRMATION_TIME=120000
    JWT_RESET_PASSWORD_SECRET='random_string'
    JWT_RESET_PASSWORD_TIME=120000
    JWT_REFRESH_SECRET='random_string'
    JWT_REFRESH_TIME=2592000

    ```
---

#### 3. **Start the Server**

Start the development server:
```bash
npm run start:dev
```



The server should now be running on [http://localhost:3000/api/docs](http://localhost:3000/api/docs).


#### Preview
![Swagger REST APIs](https://i.ibb.co/c1C31B1/screencapture-localhost-3000-api-docs-2024-12-08-15-39-16.png)


---

Let me know if you encounter any issues during setup!
