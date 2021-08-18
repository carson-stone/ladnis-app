This is a Landis application project by Carson Stone.
This project is deployed at [Vercel](https://landis-app.vercel.app/). The backend is on [Heroku](https://carson-landis.herokuapp.com/).

The code can be ran locally by doing the following:
- First, setup the database. You will need to create a .env file at the root of `/backend` with a variable like `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/landis?schema=public"`.
- `npx prisma migrate:dev`
- `npx prisma db seed --preview-feature` to add users to the Users table. The seed function is in `/backend/prisma/seed.ts`
- `concurrently "cd backend && yarn start:dev" "cd frontend && yarn next dev"`
