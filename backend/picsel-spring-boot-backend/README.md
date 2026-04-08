# PICSEL Backend - Spring Boot

## Prerequisites
- Java 17+
- MySQL 8+
- Maven 3.8+
- Cloudinary account (for image uploads)

## Setup

1. Create MySQL database:
```sql
CREATE DATABASE picsel_db;
```

2. Copy `.env.example` to `.env` and fill in your values.

3. Run the application:
```bash
./mvnw spring-boot:run
```

Or with environment variables:
```bash
DB_URL=jdbc:mysql://localhost:3306/picsel_db \
DB_USERNAME=root \
DB_PASSWORD=yourpass \
CLOUDINARY_CLOUD_NAME=xxx \
CLOUDINARY_API_KEY=xxx \
CLOUDINARY_API_SECRET=xxx \
mvn spring-boot:run
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/login | Admin login |
| GET | /api/events | Get all events |
| GET | /api/events/nearest | Get upcoming events |
| POST | /api/events | Create event (multipart) |
| PUT | /api/events/{id} | Update event |
| PUT | /api/events/images/{id} | Update event images |
| DELETE | /api/events/{id} | Delete event |
| GET | /api/team | Get all team members |
| POST | /api/team | Create team member (multipart) |
| PUT | /api/team/{id} | Update team member |
| PUT | /api/team/images/{id} | Update team member image |
| DELETE | /api/team/{id} | Delete team member |
| GET | /api/faculty | Get all faculty |
| POST | /api/faculty | Create faculty (multipart) |
| PUT | /api/faculty/{id} | Update faculty |
| PUT | /api/faculty/images/{id} | Update faculty image |
| DELETE | /api/faculty/{id} | Delete faculty |
| GET | /api/registrations | Get all registrations |
| GET | /api/registrations/event/{eventId} | Get registrations by event |
| POST | /api/registrations | Register for event |
| DELETE | /api/registrations/{id} | Delete registration |
| GET | /api/contacts | Get all contacts |
| POST | /api/contacts | Submit contact form |
| DELETE | /api/contacts/{id} | Delete contact |
| GET | /api/sponsors | Get all sponsors |
| POST | /api/sponsors | Create sponsor (multipart) |
| PUT | /api/sponsors/{id} | Update sponsor |
| DELETE | /api/sponsors/{id} | Delete sponsor |

## Frontend Connection

Set `VITE_API_BASE_URL` in your frontend `.env`:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

The backend runs on port 8080 by default. CORS is configured to allow requests from `http://localhost:5173`.
