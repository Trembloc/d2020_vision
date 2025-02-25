const client = require('./client.js');


const createClass = async (className) => {
  console.log('CREATING CLASS');
  try {
    const { rows } = await client.query(`
    INSERT INTO classes (name)
    VALUES ('${className}')
    RETURNING *;
    `);

    const gameclass = rows[0];
    console.log('CLASS CREATED');
  //  console.log(gameclass);
    return gameclass;

  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  createClass
}