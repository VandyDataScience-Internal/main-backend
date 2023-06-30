const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { MongoClient } = require('mongodb');

const prisma = new PrismaClient();
const app = express();
const port = 3000;
const mongoUri = "mongodb+srv://vanderbiltdatascience:<password>@cluster0.udbnkv3.mongodb.net/your-database-name?retryWrites=true&w=majority";

app.use(express.json());

// Routes
app.get('/opportunities', async (req, res) => {
  const opportunities = await prisma.opportunities.findMany();
  res.json(opportunities);
});

app.post('/opportunities', async (req, res) => {
  const { status, opportunityName, companyName, requirements, additionalDetail, emailLink } = req.body;
  const opportunity = await prisma.opportunities.create({
    data: { status, opportunityName, companyName, requirements, additionalDetail, emailLink },
  });
  res.json(opportunity);
});

// Connect to MongoDB and start the Express server
MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }

  console.log('Connected to MongoDB successfully!');

  const db = client.db('main-backend.opportunities');

  // Pass the MongoDB database instance to the routes
  app.locals.db = db;

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:3000`);
  });
});
