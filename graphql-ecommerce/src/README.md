# GraphQL E-commerce API

## Setup
1. Copy `.env.example` -> `.env` and update if needed.
2. Install dependencies:
   npm install
3. (Optional) Start MongoDB with Docker Compose:
   docker-compose up -d
4. Seed the DB:
   npm run seed
5. Start server:
   npm start
6. Open GraphQL Playground:
   http://localhost:4000/graphql

## Admin & User
- Admin: admin@example.com / adminpass
- User: user@example.com / customer

## Example Queries

### Login
mutation {
  login(email:"admin@example.com", password:"adminpass")
}

Use the token returned as:
Authorization: Bearer <token>

### Fetch products (offset pagination + text search)
query {
  products(first: 5, offset: 0, filter: { search: "Apple" }, sort: { field: "price", direction: "DESC" }) {
    totalCount
    edges {
      node {
        id
        name
        price
        category { id name }
      }
      cursor
    }
    pageInfo { hasNextPage endCursor }
  }
}

### Add to cart (auth required)
mutation {
  addToCart(input: { productId: "<PRODUCT_ID>", quantity: 2 }) {
    product { id name price }
    quantity
  }
}

### Place order (auth required)
mutation {
  placeOrder {
    id
    total
    status
    items { product { id name } quantity price }
  }
}
