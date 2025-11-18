const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime
  scalar JSON

  enum Role { ADMIN CUSTOMER }

  type User {
    id: ID!
    email: String!
    name: String!
    role: Role!
    cart: [CartItem!]!
    createdAt: DateTime
  }

  type Category {
    id: ID!
    name: String!
    slug: String!
    createdAt: DateTime
  }

  type Product {
    id: ID!
    name: String!
    slug: String!
    description: String
    price: Float!
    currency: String!
    inStock: Boolean!
    quantity: Int!
    attributes: JSON
    popularity: Int
    category: Category
    createdAt: DateTime
  }

  type CartItem {
    product: Product!
    quantity: Int!
  }

  type OrderItem {
    product: Product!
    quantity: Int!
    price: Float!
  }

  type Order {
    id: ID!
    items: [OrderItem!]!
    total: Float!
    user: User!
    createdAt: DateTime
    status: String!
  }

  type ProductEdge {
    node: Product!
    cursor: String!
  }

  type ProductConnection {
    edges: [ProductEdge!]!
    totalCount: Int!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String
  }

  input AddToCartInput {
    productId: ID!
    quantity: Int!
  }

  input UpdateCartItemInput {
    productId: ID!
    quantity: Int!
  }

  input ProductFilter {
    search: String
    categoryIds: [ID!]
    minPrice: Float
    maxPrice: Float
    inStock: Boolean
    attributes: JSON
    orFilters: [ProductFilter!]
    andFilters: [ProductFilter!]
  }

  input SortInput {
    field: String!
    direction: String!
  }

  type Query {
    me: User
    categories: [Category!]!
    category(id: ID!): Category
    products(first: Int, offset: Int, filter: ProductFilter, sort: SortInput): ProductConnection!
    product(id: ID!): Product
    order(id: ID!): Order
    myOrders: [Order!]!
    meCart: [CartItem!]!
  }

  type Mutation {
    login(email: String!, password: String!): String!

    addToCart(input: AddToCartInput!): CartItem!
    updateCartItem(input: UpdateCartItemInput!): CartItem
    removeFromCart(productId: ID!): Boolean!

    createProduct(input: ProductCreateInput!): Product!
    updateProduct(id: ID!, input: ProductCreateInput!): Product!
    deleteProduct(id: ID!): Boolean!

    createCategory(name: String!, slug: String!): Category!
    updateCategory(id: ID!, name: String!, slug: String!): Category!
    deleteCategory(id: ID!): Boolean!

    placeOrder: Order!
    updateOrderStatus(id: ID!, status: String!): Order!
  }

  input ProductCreateInput {
    name: String!
    slug: String!
    description: String
    price: Float!
    currency: String!
    quantity: Int!
    categoryId: ID
    attributes: JSON
    popularity: Int
  }
`;
