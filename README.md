# MovieVerse

MovieVerse is a fullstack social movie platform where users can browse movies, create accounts, favorite titles, and interact with movie content through a modern web interface.

## Live Demo

Frontend: https://movieverse-pied.vercel.app/

Backend API: https://movieverse-production-180f.up.railway.app/

---

## Features

- User authentication with JWT and HTTP-only cookies
- Persistent login sessions across page navigation and refreshes
- User registration and login system
- Browse movie catalog
- Favorite movies functionality
- Persistent PostgreSQL database
- RESTful API architecture
- Responsive React frontend
- Full deployment using Vercel and Railway

---

## Tech Stack

JavaScript-based fullstack application.

### Frontend

- JavaScript
- React
- Vite
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcryptjs

### Deployment

- Vercel (Frontend)
- Railway (Backend + PostgreSQL)

---

## API Endpoints

### Movies

```http
GET /api/movies
GET /api/movies/:id
```

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
POST /api/auth/logout
```

---

## Upcoming Features

1. Movie details pages with comments
2. Movie ratings and reviews
3. Personal watchlists
4. Sharing short movie clips
5. User profile pages
6. Search and filtering improvements

---

## Future Goals

- AI-powered movie recommendations
- Real-time interactions
- Social activity feed
- Advanced search system
- Cloud image uploads

---

## Author

Built by Dan Mogaka
