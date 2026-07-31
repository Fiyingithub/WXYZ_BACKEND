# WXYZ Ecommerce Website 
- WXYZ Ecommerce is an Ecommerce website that is made to help business owners to sell their products online. The website is made to be easy to use and to make the process of selling products online easy.


## Tech Stack
- Node.js
- Express.js
- TypeScript (`strict: true`)
- Jest + Supertest (testing)
- Prisma (ORM)
- PostgreSQL (database)
- Docker

### Overview
- The website has the following features:
    - Authentication
    - Product management
    - Order management
    - Payment management
    - Shipping management
    - Customer management
    - Review management
    - Cart management
    

#### OPERATIONS
- The website has the following operations:
    - API
    - validation
    - pagination
    - Prisma, express, express-validator


    ##### PROJECT Installation

- Clone the repository: 
    `bash`

    `git clone <your-repo-url>`
    `cd <project-folder>`

- Install dependencies: 
    `bash `
    `npm install`



Start the server: ```bash

###### Development

npm run dev

###### Production

npm start ```

###### API Endpoints
POST /api/v1/cards/validate


###### TEST
npm run test





###### SYNC DATABASE
- npx prisma migrate dev --name init


##### GENERATE PRISMA MODEL
- npx prisma generate