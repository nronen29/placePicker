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
  
  const fileContent = await fs.readFile("./data/places.json");

  const placesData = JSON.parse(fileContent);

  res.status(200).json({ places: placesData });
});

app.get("/user-places", async (req, res) => {
  const fileContent = await fs.readFile("./data/user-places.json");

  const places = JSON.parse(fileContent);

  res.status(200).json({ places });
});

app.put("/user-places", async (req, res) => {

  const placeId = req.body.placeId;
  //return res.status(500).json();


  const fileContent = await fs.readFile("./data/places.json");
  const placesData = JSON.parse(fileContent);

  const place = placesData.find((place) => place.id === placeId);

  const userPlacesFileContent = await fs.readFile("./data/user-places.json");
  const userPlacesData = JSON.parse(userPlacesFileContent);

  let updatedUserPlaces = userPlacesData;

  if (!userPlacesData.some((p) => p.id === place.id)) {
    updatedUserPlaces = [...userPlacesData, place];
  }

  await fs.writeFile(
    "./data/user-places.json",
    JSON.stringify(updatedUserPlaces)
  );

  res.status(200).json({ userPlaces: updatedUserPlaces });
});

app.delete("/user-places/:id", async (req, res) => {
  const placeId = req.params.id;


  const userPlacesFileContent = await fs.readFile("./data/user-places.json");
  const userPlacesData = JSON.parse(userPlacesFileContent);

  const placeIndex = userPlacesData.findIndex((place) => place.id === placeId);

  let updatedUserPlaces = userPlacesData;

  if (placeIndex >= 0) {
    updatedUserPlaces.splice(placeIndex, 1);
  }

  await fs.writeFile(
    "./data/user-places.json",
    JSON.stringify(updatedUserPlaces)
  );

  res.status(200).json({ userPlaces: updatedUserPlaces });
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
 