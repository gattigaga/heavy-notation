# How to Run Locally

This is a guide for running this project locally on your machine.

## Prerequisites

- NodeJS v20.15.0
- pnpm v9.15.0

## Steps

Follow these steps to run this project on your local machine.

1. Navigate to the project directory.

2. Create a new file called `.env.development` and add the following content to it:

```
TURSO_DATABASE_URL=file:./prisma/dev.db
TURSO_AUTH_TOKEN=

AUTH_SECRET=run_command_to_get_it
AUTH_GOOGLE_ID=get_it_by_yourself
AUTH_GOOGLE_SECRET=get_it_by_yourself

DATABASE_URL=file:./dev.db
```

Descriptions:

- TURSO_DATABASE_URL: The URL of the Turso online database. Here we will use the local sqlite database instead of the online database.
- TURSO_AUTH_TOKEN: The authentication token for the Turso online database. Make it empty because we are using local sqlite database for development.
- AUTH_SECRET: The random token used to encrypt cookies and tokens by AuthJS. Please run `npx auth secret --raw` to get it and paste it in `.env.development` file.
- AUTH_GOOGLE_ID: The ID of the Google OAuth client.
- AUTH_GOOGLE_SECRET: The secret key of the Google OAuth client.
- DATABASE_URL: The URL of the local sqlite database and it will be used by Prisma to apply migrations.

3. Run this command in the terminal to install the node_modules.

```bash
pnpm install
```

4. Run this command in the terminal to create a new sqlite database file called `dev.db` inside /prisma directory and apply the migrations for it.

```bash
pnpm dev:db-migrate
```

5. Run this command in the terminal to start the development server.

```bash
pnpm dev
```

6. Open http://localhost:3000/ in your browser.
