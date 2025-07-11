const initDB = require('../utils/db'); 

const createUser = async (username, email, passwordHash, role, address) => {
  const db = await initDB();
  const sql = `INSERT INTO users (username, email, password, role, address) VALUES (?, ?, ?, ?, ?)`;
  await db.execute(sql, [username, email, passwordHash, role, address]);
  return { username, email, role, address };
};

const findUserByUsername = async (username) => {
  const db = await initDB();
  const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

const insertStore = async (name, address, owner_id) => {
  console.log('Inserting store:', { name, address, owner_id });
  const db = await initDB();
  const [res] = await db.execute(`
    INSERT INTO stores (name, address, owner_id)
    VALUES (?, ?, ?)
  `, [name, address, owner_id]);
  return { id: res.insertId, name, address, owner_id };
};

const countAll = async () => {
  const db = await initDB();
  const [[users]] = await db.execute(`SELECT COUNT(*) as total_users FROM users`);
  const [[stores]] = await db.execute(`SELECT COUNT(*) as total_stores FROM stores`);
  const [[ratings]] = await db.execute(`SELECT COUNT(*) as total_ratings FROM ratings`);
  return { ...users, ...stores, ...ratings };
};

const getUsersByRole = async (role) => {
 const db = await initDB();
  const [rows] = await db.execute(`
    SELECT id, username, email, address FROM users WHERE role = ?
  `, [role]);
  return rows;
};

const getStores = async () => {
 const db = await initDB();
  const [rows] = await db.execute(`
    SELECT s.id, s.name, s.address, u.username AS owner_name
    FROM stores s
    LEFT JOIN users u ON s.owner_id = u.id
  `);
  return rows;
};

const getUserWithRatings = async (id) => {
  const db = await initDB();
  const [[user]] = await db.execute(`
    SELECT id, username, email, role FROM users WHERE id = ?
  `, [id]);
  if (!user) return null;

  if (user.role === 'store_owner') {
    const db = await initDB();
    const [ratings] = await db.execute(`
      SELECT r.id, r.rating, r.comment, r.created_at, s.name AS store
      FROM ratings r
      JOIN stores s ON r.store_id = s.id
      WHERE r.user_id = ?
    `, [id]);
    return { ...user, ratings };
  }

  return user;
};

module.exports = { insertStore, countAll,
  getUsersByRole, getStores, getUserWithRatings,createUser, findUserByUsername 
};




