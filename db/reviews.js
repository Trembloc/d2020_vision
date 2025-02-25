const client = require('./client.js');

const createReview = async (body, class_id, user_id) => {
  console.log('CREATING REVIEW');
  try {
    const { rows } = await client.query(`
      INSERT INTO reviews (body, class_id, user_id)
      VALUES('${body}', ${class_id}, ${user_id})
      RETURNING *;
      `);
    const createdReview = rows[0];
    console.log('REVIEWS CREATED')
    return createdReview;
    
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  createReview
};