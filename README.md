# PlacePicker

A web application for exploring and collecting travel destinations around the world.

## Project Overview

PlacePicker lets users browse through different places and save their favorites. Built with Angular frontend and Node.js backend. 

## Features

- Browse different travel destinations
- Save places to your favorites
- Search for places by name
- Filter by geographic regions
- Responsive design for desktop
- Toast notifications for user feedback

## Technology Stack

### Frontend
- Angular 18 with TypeScript
- Custom CSS (no Bootstrap)
- HTML5

### Backend
- Node.js with Express.js
- JavaScript

### Database
- **MySQL** - Relational database management system
- **mysql2** - MySQL client for Node.js with Promise support

## Project Structure

```
PlacePicker/
├── backend/                 # Backend Express.js application
│   ├── app.js              # Main server file
│   ├── data/               # JSON data files (legacy)
│   └── images/             # Static image assets
├── src/                    # Angular frontend application
│   ├── app/
│   │   ├── home/           # Home page component
│   │   ├── places/         # Places-related components
│   │   └── shared/         # Shared components and services
│   └── styles.css          # Global styles
└── README.md               # Project documentation
```

## Database Schema

### Tables

**places**
- `id` (VARCHAR) - Primary key
- `title` (VARCHAR) - Place name
- `lat` (DECIMAL) - Latitude coordinate
- `lon` (DECIMAL) - Longitude coordinate

**images**
- `id` (INT) - Auto-increment primary key
- `place_id` (VARCHAR) - Foreign key to places table
- `src` (VARCHAR) - Image filename
- `alt` (TEXT) - Image description

**user_places**
- `user_id` (VARCHAR) - User identifier
- `place_id` (VARCHAR) - Foreign key to places table
- Primary key: (user_id, place_id)

## API Endpoints

- `GET /places` - Retrieve all available places
- `GET /user-places` - Get user's favorite places
- `PUT /user-places` - Add a place to user's favorites
- `DELETE /user-places/:id` - Remove a place from user's favorites

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MySQL Server
- Angular CLI

### Backend Setup
```bash
cd backend
npm install
node app.js
```

### Frontend Setup
```bash
npm install -g @angular/cli
ng serve
```

### Database Setup

#### Option 1: Using the SQL File (Recommended)
1. Make sure your MySQL server is running
2. Import the database using the `places_project.sql` file:
   ```bash
   # Command line
   mysql -u root -p < places_project.sql
   
   # Or in MySQL Workbench:
   # File -> Run SQL Script -> Select places_project.sql
   ```
3. This will create the database, tables, and insert all the sample data

#### Option 2: Manual Setup
1. Create a MySQL database called `places_project`
2. Create the tables manually using the schema above
3. Add your own data

#### Database Configuration
The backend connects to MySQL using these settings in `backend/app.js`:
```javascript
const pool = mysql.createPool({
  host: '172.20.10.4',
  port: 3306,
  user: 'places_user',
  password: 'StrongPassword123!',
  database: 'places_project'
});
```
Update these to match your MySQL configuration.

#### What's Included
The SQL file contains:
- 18 travel destinations with descriptions and coordinates
- Image data for each place (images are in `backend/images/`)
- Sample user favorites to test the functionality

## Design Approach

### Custom CSS (No Bootstrap)

## Development Team
This project was developed as part of our studies at **Tel Hai College** by:
- **Lior Yanuka**
- **Neta Ronen**




