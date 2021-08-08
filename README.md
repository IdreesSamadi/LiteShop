# LiteShop

An Ecommerce MERN stack and Typescript website built from scratch

![alt text](./frontend-web/public/images/liteshop.png 'website screen shot')

## Tech Stack

- Typescript
- React
- React Redux
- React Router
- MongoDB
- Express
- Bootstrap
- Multer
- Bcrypt
- Mongoose
- Axios
- React Helmet

---

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment and ~~Klarna~~ method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

---

### Env Variables

Create a .env file in the backend folder and add the followings  
To check and/or change the default values visit [config.ts]("./backend/src/config/config.ts") file

| Name             |    Default    |
| ---------------- | :-----------: |
| NODE_ENV         | `development` |
| SERVER_PORT      |    `1337 `    |
| SERVER_HOSTNAME  |  `localhost`  |
| MONGO_URI        |               |
| PAYPAL_CLIENT_ID |               |
| JWT_SECRET       | `secretCode`  |

---

## Getting Started

```bash
# Clone repository
git clone git@github.com:IdreesSamadi/LiteShop.git

# Change into the directory
cd liteShop

# Setup backend
cd backend && npm install
npm run dev

# Setup frontend
cd frontend-web && npm install
npm start
```

---

## Sample User Logins

```
Email: admin@test.com (Admin)
Password: password


tom@test.com (Customer)
Password: password

jerry@test.com (Customer)
Password: password
```
