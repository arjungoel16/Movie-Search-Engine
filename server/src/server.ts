import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';

import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';

import { fileURLToPath } from 'url';  
import { dirname } from 'path'; 
const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);

import cors from 'cors';

// import routes from './routes/index.js';
import { authenticateToken } from './services/auth.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  await db();   // ?? why is this here? I thought we were using mongoose.connect() in connection.js

  const PORT = process.env.PORT || 3001;
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server as any,
    {
      context: authenticateToken as any
    }
  ));
  
  app.use(cors());  // enable CORS for all requests, connect port 3000 to 3001

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }
  
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
