# NPM Scripts

These are the npm scripts you will use often:

- `dev`: Start the development server.
- `build`: Build the application for production.
- `start`: Start the production server.
- `lint`: Run the linter.
- `prepare`: Run the pre-commit hook. This will be run when we create a new commit.
- `postinstall`: Run the post-install script. This will be run by Vercel when deploying the application.
- `lingui:extract`: Extract the i18n strings from source code into messages file (.po).
- `lingui:compile`: Compile the i18n messages (.po) to typescript file, so it can be used by the application.
- `dev:db-show`: Open the database viewer (Prisma Studio) in the browser.
- `dev:db-migrate`: Apply the migrations to the local sqlite database.
- `dev:db-reset`: Reset the local sqlite database.
- `production:db-shell`: Connect to your database on Turso.
