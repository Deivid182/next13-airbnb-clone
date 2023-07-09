# Fullstack application using Next.js 13 (app router), tailwindcss Prisma Mongodb and NextAuth

For the frontend I used react and tailwindcss and for the backend NextAuth, Prisma ORM and MongoDB

This project was an opportunity to implement the next features: 
- Tailwind desing, effects, animations and responsiveness
- Authentication with NextAuth (google, github and credentials)
- Image upload using cloudinary
- Client form validation and handling using react-hook-form
- Server error handling using react-toast
- Calendars with react-date-range
- Page loading state
- Page empty state
- Booking / Reservation system
- Guest reservation cancellation
- Owner reservation cancellation
- Creation and deletion of properties
- Pricing calculation
- Advanced search algorithm by category, date range, map location, number of guests, rooms and bathrooms
- How to make POST and DELETE routes in newest Next api folder
- How to fetch data in react server components using actions

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/AntonioErdeljac/next13-airbnb-clone.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXTAUTH_SECRET=
```

In this case you must have a db hosted on Mongodb Atlad. So far I haven't found a way to connect our prisma file with a local database

### Setup Prisma

```shell
npx prisma db push

```

### Start the app

```shell
npm run dev
```
