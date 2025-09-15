# PlacePicker

A full-stack web application for exploring and collecting amazing travel destinations worldwide.

## Project Overview

PlacePicker is a modern web application that allows users to discover incredible places around the world and create their personal collection of favorite destinations. Whether you're planning your next adventure or simply dreaming about future travels, PlacePicker helps you organize and visualize your travel aspirations.

## Features

- **Explore Places**: Browse through a curated collection of breathtaking destinations from around the world
- **Personal Favorites**: Save places you'd love to visit to your personal collection
- **Smart Search**: Real-time search functionality to find places by name
- **Region Filters**: Filter destinations by geographic regions (Europe, Asia, Americas, Africa)
- **Responsive Design**: Optimized for all devices - desktop, tablet, and mobile
- **Modern UI**: Beautiful, intuitive interface with smooth animations
- **Toast Notifications**: User-friendly feedback for all actions

## Technology Stack

### Frontend
- **Angular 18** - Modern TypeScript-based web framework
- **TypeScript** - Type-safe JavaScript for better development experience
- **CSS3** - Modern styling with animations and responsive design
- **HTML5** - Semantic markup for accessibility

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimalist web framework
- **JavaScript** - Server-side programming language

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
1. Create MySQL database named `places_project`
2. Create tables using the provided schema
3. Update database credentials in `backend/app.js`

## Development Team

This project was developed as part of our studies at **Tel Hai College** by:
- **Lior Yanoka**
- **Neta Ronen**




