const client = require('./client.js');

const createUser = async (username, password, name) => {
  console.log('CREATING USER');
  try {
    const { rows } = await client.query(`
      INSERT INTO users (username, password, name)
      VALUES('${username}', '${password}', '${name}')
      RETURNING *;
      `);
    const createdUser = rows[0];
    console.log('USERS CREATED')
    return createdUser;
    
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  createUser
}