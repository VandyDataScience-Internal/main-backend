const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seed() {
  await prisma.opportunities.createMany({
    data: [
      {
        status: 'Open',
        opportunityName: 'Job Opportunity AL',
        companyName: 'Company AL',
        requirements: 'Some requirements for Job Opportunity AL',
        additionalDetail: 'Additional details for Job Opportunity AL',
        emailLink: 'al@example.com',
      },
      {
        status: 'Closed',
        opportunityName: 'Job Opportunity Adaline',
        companyName: 'Company Adaline',
        requirements: 'Some requirements for Job Opportunity Adaline',
        additionalDetail: 'Additional details for Job Opportunity Adaline',
        emailLink: 'adaline@example.com',
      },
    ],
  });

  console.log('Database seeded successfully.');
}

seed()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
