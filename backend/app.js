import fs from "node:fs/promises";
import mysql from 'mysql2/promise';
import bodyParser from "body-parser";
import express from "express";

const pool = mysql.createPool({
  host: '172.20.10.4',
  port: 3306,
  user: 'places_user',
  password: 'StrongPassword123!',
  database: 'places_project',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const app = express();

app.use(express.static("images"));
app.use(bodyParser.json());

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database!');
    connection.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);
  });

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/places", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  
  try {
    const [rows] = await pool.query(`
      SELECT p.id, p.title, p.lat, p.lon, i.src, i.alt
      FROM places p
      LEFT JOIN images i ON p.id = i.place_id
    `);

    const placesData = rows.map(row => ({
      id: row.id,
      title: row.title,
      lat: row.lat,
      lon: row.lon,
      image: {
        src: row.src,
        alt: row.alt
      }
    }));

    res.status(200).json({ places: placesData });
  } catch (error) {
    res.status(500).json({ message: "Error fetching places" });
  }
});

app.get("/user-places", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.id, p.title, p.lat, p.lon, i.src, i.alt
      FROM user_places up
      JOIN places p ON up.place_id = p.id
      LEFT JOIN images i ON p.id = i.place_id
      WHERE up.user_id = 'u1'
    `);

    const places = rows.map(row => ({
      id: row.id,
      title: row.title,
      lat: row.lat,
      lon: row.lon,
      image: {
        src: row.src,
        alt: row.alt
      }
    }));

    res.status(200).json({ places });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user places" });
  }
});

app.put("/user-places", async (req, res) => {
  const placeId = req.body.placeId;

  try {
    // Insert the user-place relationship (ignore if already exists)
    await pool.query(`
      INSERT IGNORE INTO user_places (user_id, place_id)
      VALUES ('u1', ?)
    `, [placeId]);

    // Get all user places to return in response
    const [rows] = await pool.query(`
      SELECT p.id, p.title, p.lat, p.lon, i.src, i.alt
      FROM user_places up
      JOIN places p ON up.place_id = p.id
      LEFT JOIN images i ON p.id = i.place_id
      WHERE up.user_id = 'u1'
    `);

    const updatedUserPlaces = rows.map(row => ({
      id: row.id,
      title: row.title,
      lat: row.lat,
      lon: row.lon,
      image: {
        src: row.src,
        alt: row.alt
      }
    }));

    res.status(200).json({ userPlaces: updatedUserPlaces });
  } catch (error) {
    res.status(500).json({ message: "Error adding user place" });
  }
});

app.delete("/user-places/:id", async (req, res) => {
  const placeId = req.params.id;

  try {
    // Delete the user-place relationship
    await pool.query(`
      DELETE FROM user_places 
      WHERE user_id = 'u1' AND place_id = ?
    `, [placeId]);

    // Get remaining user places to return in response
    const [rows] = await pool.query(`
      SELECT p.id, p.title, p.lat, p.lon, i.src, i.alt
      FROM user_places up
      JOIN places p ON up.place_id = p.id
      LEFT JOIN images i ON p.id = i.place_id
      WHERE up.user_id = 'u1'
    `);

    const updatedUserPlaces = rows.map(row => ({
      id: row.id,
      title: row.title,
      lat: row.lat,
      lon: row.lon,
      image: {
        src: row.src,
        alt: row.alt
      }
    }));

    res.status(200).json({ userPlaces: updatedUserPlaces });
  } catch (error) {
    res.status(500).json({ message: "Error removing user place" });
  }
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

// app.listen(3000);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
 