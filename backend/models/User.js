const initDB = require('../utils/db'); 

const createStore = async (name, address, owner_id) => {
  const query = `
    INSERT INTO stores (name, address, owner_id)
    VALUES (?, ?, ?)
  `;
  const [result] = await connection.execute(query, [name, address, owner_id]);
  return { id: result.insertId, name, address, owner_id };
};

const fetchStores = async () => {
  const query = `
    SELECT 
      s.id, s.name, s.address, s.owner_id, 
      u.username AS owner_name 
    FROM stores s
    LEFT JOIN users u ON s.owner_id = u.id
    ORDER BY s.id DESC
  `;
  const [rows] = await connection.execute(query);
  return rows;
};

module.exports = { createStore, fetchStores };
