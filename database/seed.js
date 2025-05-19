require('dotenv').config();
const { Client } = require('pg');
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

async function seed() {
  try {
    await client.connect();

    // Seed users
    const userIds = [];
    for (let i = 0; i < 20; i++) {
      const id = uuidv4();
      userIds.push(id);
      await client.query(
        'INSERT INTO users (id, username, password) VALUES ($1, $2, $3)',
        [id, faker.internet.userName(), faker.internet.password()]
      );
    }

    // Seed items
    const itemIds = [];
    for (let i = 0; i < 10; i++) {
      const id = uuidv4();
      itemIds.push(id);
      await client.query(
        'INSERT INTO items (id, name, description, image_url) VALUES ($1, $2, $3, $4)',
        [id, faker.commerce.productName(), faker.commerce.productDescription(), faker.image.url()]
      );
    }

    // Seed reviews
    const reviewIds = [];
    for (let i = 0; i < 40; i++) {
      const id = uuidv4();
      reviewIds.push(id);
      const user_id = faker.helpers.arrayElement(userIds);
      const item_id = faker.helpers.arrayElement(itemIds);
      await client.query(
        'INSERT INTO reviews (id, content, rating, user_id, item_id) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING',
        [id, faker.lorem.sentences(), faker.number.int({ min: 1, max: 5 }), user_id, item_id]
      );
    }

    // Seed comments
    for (let i = 0; i < 60; i++) {
      const id = uuidv4();
      const user_id = faker.helpers.arrayElement(userIds);
      const review_id = faker.helpers.arrayElement(reviewIds);
      await client.query(
        'INSERT INTO comments (id, content, user_id, review_id) VALUES ($1, $2, $3, $4)',
        [id, faker.lorem.sentence(), user_id, review_id]
      );
    }

    console.log('Seeding complete!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await client.end();
  }
}

seed();