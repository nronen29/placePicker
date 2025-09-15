import mysql from 'mysql2/promise';
import fs from 'node:fs/promises';

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'places_user',
  password: 'StrongPassword123!',
  database: 'places_project',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function setupDatabase() {
  try {
    console.log('🔄 Setting up database...');

    // Create tables
    console.log('📋 Creating tables...');
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS places (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        lat DECIMAL(9,6),
        lon DECIMAL(9,6)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        place_id VARCHAR(50) NOT NULL UNIQUE,
        src VARCHAR(255) NOT NULL,
        alt TEXT,
        FOREIGN KEY (place_id) REFERENCES places(id)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_places (
        user_id VARCHAR(50) NOT NULL,
        place_id VARCHAR(50) NOT NULL,
        PRIMARY KEY (user_id, place_id),
        FOREIGN KEY (place_id) REFERENCES places(id)
      )
    `);

    console.log('✅ Tables created successfully!');

    // Read and insert places data
    console.log('📊 Loading places data...');
    const placesContent = await fs.readFile('./data/places.json');
    const placesData = JSON.parse(placesContent);

    console.log(`📝 Inserting ${placesData.length} places...`);

    for (const place of placesData) {
      // Insert place
      await pool.query(`
        INSERT IGNORE INTO places (id, title, lat, lon)
        VALUES (?, ?, ?, ?)
      `, [place.id, place.title, place.lat, place.lon]);

      // Insert image
      await pool.query(`
        INSERT IGNORE INTO images (place_id, src, alt)
        VALUES (?, ?, ?)
      `, [place.id, place.image.src, place.image.alt]);
    }

    // Read and insert user places data
    console.log('👤 Loading user places data...');
    const userPlacesContent = await fs.readFile('./data/user-places.json');
    const userPlacesData = JSON.parse(userPlacesContent);

    console.log(`📝 Inserting ${userPlacesData.length} user places...`);

    for (const place of userPlacesData) {
      await pool.query(`
        INSERT IGNORE INTO user_places (user_id, place_id)
        VALUES ('u1', ?)
      `, [place.id]);
    }

    console.log('🎉 Database setup complete!');
    
    // Test the data
    const [placeCount] = await pool.query('SELECT COUNT(*) as count FROM places');
    const [imageCount] = await pool.query('SELECT COUNT(*) as count FROM images');
    const [userPlaceCount] = await pool.query('SELECT COUNT(*) as count FROM user_places');
    
    console.log(`📊 Summary:`);
    console.log(`   Places: ${placeCount[0].count}`);
    console.log(`   Images: ${imageCount[0].count}`);
    console.log(`   User Places: ${userPlaceCount[0].count}`);

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
  } finally {
    await pool.end();
  }
}

setupDatabase();
