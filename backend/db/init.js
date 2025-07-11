const initDB = require('../utils/db');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    const connection = await initDB(); 
    await connection.query(schema);
    console.log('MySQL DB initialized');
  } catch (err) {
    console.error('Init error:', err.message);
  }
})();



