import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar DateTime
  scalar Decimal

  # ================== TYPES ==================
  type Category {
    _id: ID!
    name: String!
    description: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Product {
    _id: ID!
    name: String!
    description: String
    price: Decimal!
    inStock: Boolean!
    category: Category
    createdAt: DateTime
    updatedAt: DateTime
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    role: String!
    createdAt: DateTime
  }

  type Order {
    _id: ID!
    products: [Product!]!
    total: Decimal!
    user: User!
    status: String!
    createdAt: DateTime
    updatedAt: DateTime
  }

  # ================== INPUTS ==================
  input ProductFilterInput {
    categoryIds: [ID!]
    priceMin: Decimal
    priceMax: Decimal
    inStock: Boolean
    search: String
  }

  input ProductSortInput {
    field: String! # "price", "createdAt", "popularity"
    order: Int!    # 1 = ASC, -1 = DESC
  }

  input AddProductInput {
    name: String!
    description: String
    price: Decimal!
    inStock: Boolean!
    categoryId: ID!
  }

  input UpdateProductInput {
    name: String
    description: String
    price: Decimal
    inStock: Boolean
    categoryId: ID
  }

  input AddCategoryInput {
    name: String!
    description: String
  }

  input UpdateCategoryInput {
    name: String
    description: String
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input PlaceOrderInput {
    productIds: [ID!]!
  }

  # ================== PAGINATION ==================
  type ProductConnection {
    edges: [Product!]!
    totalCount: Int!
  }

  type CategoryConnection {
    edges: [Category!]!
    totalCount: Int!
  }

  # ================== QUERIES ==================
  type Query {
    products(filter: ProductFilterInput, sort: ProductSortInput, limit: Int, offset: Int): ProductConnection!
    product(id: ID!): Product
    categories(limit: Int, offset: Int): CategoryConnection!
    category(id: ID!): Category
    orders: [Order!]!
    order(id: ID!): Order
    me: User
  }

  # ================== MUTATIONS ==================
  type Mutation {
    addCategory(input: AddCategoryInput!): Category!
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category!
    deleteCategory(id: ID!): Boolean!

    addProduct(input: AddProductInput!): Product!
    updateProduct(id: ID!, input: UpdateProductInput!): Product!
    deleteProduct(id: ID!): Boolean!

    registerUser(input: CreateUserInput!): User!
    login(email: String!, password: String!): String! # returns JWT token

    placeOrder(input: PlaceOrderInput!): Order!
    updateOrderStatus(id: ID!, status: String!): Order!
  }
`;

export default typeDefs;
