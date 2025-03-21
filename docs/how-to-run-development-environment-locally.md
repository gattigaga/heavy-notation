# How to Run Development Environment Locally

This is a guide for running this project development environment locally on your machine.

## Prerequisites

- NodeJS v20.15.0
- pnpm v9.15.0

## Steps

Follow these steps to run this project on your local machine.

1. Navigate to the project directory.

2. Create a new file called `.env.development` and add the following content to it:

```
BASE_URL=http://localhost:3000

TURSO_DATABASE_URL=file:./prisma/dev.db
TURSO_AUTH_TOKEN=

AUTH_SECRET=run_command_to_get_it
AUTH_GOOGLE_ID=get_it_by_yourself
AUTH_GOOGLE_SECRET=get_it_by_yourself

SENTRY_AUTH_TOKEN=
SENTRY_ORG=
SENTRY_DSN=

CLOUDINARY_CLOUD_NAME=get_it_by_yourself
CLOUDINARY_API_KEY=get_it_by_yourself
CLOUDINARY_API_SECRET=get_it_by_yourself

DATABASE_URL=file:./dev.db
```

Descriptions:
- BASE_URL: The base URL of the application. It possibly be `localhost:3000` if you are running it locally.
- TURSO_DATABASE_URL: The URL of the Turso online database. Here we will use the local sqlite database instead of the Turso online database.
- TURSO_AUTH_TOKEN: The authentication token for the Turso online database. Make it empty because we are using local sqlite database for development.
- AUTH_SECRET: The random token used to encrypt cookies and tokens by AuthJS. Please run `npx auth secret --raw` to get it and paste it in `.env.development` file.
- AUTH_GOOGLE_ID: The ID of the Google OAuth client.
- AUTH_GOOGLE_SECRET: The secret key of the Google OAuth client.
- SENTRY_AUTH_TOKEN: The authentication token for Sentry. You got it when you set up the project on Sentry. Make it empty because we don't need it for local development.
- SENTRY_ORG: The organization you created on Sentry. You got it when you set up the project on Sentry. Make it empty because we don't need it for local development.
- SENTRY_DSN: The DSN (Data Source Name) of Sentry and it tells the SDK where to send events. You got it when you set up the project on Sentry. Make it empty because we don't need it for local development.
- CLOUDINARY_CLOUD_NAME: Unique identifier of your Cloudinary account. You got it when you set up the project on Cloudinary.
- CLOUDINARY_API_KEY: The API key of the Cloudinary. You got it when you set up the project on Cloudinary.
- CLOUDINARY_API_SECRET: The API secret of the Cloudinary. You got it when you set up the project on Cloudinary.
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
