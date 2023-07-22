const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = 3000;

require('dotenv').config();
const mongoUri = process.env.MONGO;

// Connect to MongoDB with Prisma
prisma.$connect()
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    // Start the Express server after the database connection is established
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });

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
