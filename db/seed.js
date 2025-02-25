const client = require('./client.js');
const { createClass } = require('./classes.js');
const { createUser } = require('./users.js');
const { createReview } = require('./reviews.js');

dropTables = async () => {
  console.log('DROPPING TABLES');
  try {
    await client.query(`
      DROP TABLE IF EXISTS reviews;   
      DROP TABLE IF EXISTS users;         
      DROP TABLE IF EXISTS classes;
      `);
  } catch (err) {
    console.log(err)
  }
}

const createTables = async () => {
  console.log('CREATING TABLES');

  try {
    await client.query(`
    CREATE TABLE classes (
      id SERIAL PRIMARY KEY,
      name VARCHAR(30) NOT NULL UNIQUE
    );

    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(30) NOT NULL UNIQUE,
      password VARCHAR(30) NOT NULL,
      name VARCHAR(30) NOT NULL
    );


    CREATE TABLE reviews (
      id SERIAL PRIMARY KEY,
      body TEXT NOT NULL,
      class_id INTEGER REFERENCES classes(id) NOT NULL,
      user_id INTEGER REFERENCES users (id) NOT NULL 
    );
    `);

    console.log('TABLES CREATED');

  } catch (err) {
    console.log(err)
  }

}

const syncAndSeed = async () => {
  await client.connect();
  console.log('CONNECTED TO DB');

  await dropTables();
  console.log('TABLES DROPPED')

  await createTables();
  
  const knight = await createClass('Knight');
  const wizard = await createClass('Wizard');
  const bandit = await createClass('Bandit');
  const ranger = await createClass('Ranger');
  const cleric = await createClass('Cleric');


  const tom = await createUser('Tombo', 'TOM123', 'Tom');
  const jane = await createUser('Janeius', 'JANE123', 'Jane');
  const blake = await createUser('Blaketake', 'Blake123', 'Blake');
  const bill = await createUser('xx_xboxliveuser_xx', 'password', 'Bill')
  const emily = await createUser('swatfly', 'd&h2N', 'Emily');
  const tav = await createUser('Larion', 'DoS2', 'Tav');

  await createReview('This class could use a lot more HP', wizard.id, bill.id);
  await createReview('This class has insanely high damage! Really cool.', bandit.id, jane.id);
  await createReview('My knight is always kitted with the best weapons and armor! I never play anything else!', knight.id, tom.id);
  await createReview('The "trickster" subclass is way too powerful!', cleric.id, tav.id);
  await createReview('I like making my knight quick and stealthy. I know its a bit different, but I really like that the game allows you to do it ^-^', knight.id, emily.id);
  await createReview('They should make this class way more powerful...', bandit.id, tav.id);
  await createReview('its alright i guess... 2/5', wizard.id, blake.id);


  await client.end();
  console.log('DISCONNECTED FROM THE DATABASE');

}


syncAndSeed();