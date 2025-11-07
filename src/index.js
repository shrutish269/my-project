import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import typeDefs from "./schema.js";
import resolvers from "./resolvers/index.js";
import { PORT, MONGO_URI } from "./config.js";
import authMiddleware from "./middleware/auth.js";
import { categoryLoader, productLoader } from "./dataloaders/loaders.js";

const app = express();

// Observability
app.use((req, res, next) => {
  req.id = Date.now() + Math.random().toString(36).substring(2, 7);
  console.log(`Request ID: ${req.id} - ${req.method} ${req.url}`);
  const start = Date.now();
  res.on("finish", () => {
    console.log(`Request ID: ${req.id} completed in ${Date.now() - start}ms`);
  });
  next();
});

// Connect MongoDB
await mongoose.connect(MONGO_URI);
console.log("✅ MongoDB connected");

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const { user } = await authMiddleware(req);
    return {
      user,
      loaders: {
        category: categoryLoader,
        product: productLoader
      }
    };
  }
});

await server.start();
server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
});
