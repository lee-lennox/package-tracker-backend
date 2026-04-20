# Package Tracker Backend

This is the backend API for the Package Tracker System, built with Java Spring Boot.

## Technologies Used

- Java 11
- Spring Boot 2.7.18
- Spring Data JPA
- Spring Security
- JWT Authentication
- H2 Database (in-memory)
- Maven

## Prerequisites

- Java 11 or higher
- Maven 3.6 or higher

## How to Run

1. Navigate to the project directory:
   ```bash
   cd package-tracker-backend
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The server will start on `http://localhost:8080`.

## Default Users

The application comes with three pre-configured users:

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | ADMIN |
| agent | agent123 | AGENT |
| customer | customer123 | CUSTOMER |

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login with username and password
- `POST /api/auth/register` - Register a new user

### Packages

- `GET /api/packages` - Get all packages (filtered by role)
- `GET /api/packages/{id}` - Get package by ID
- `POST /api/packages` - Create a new package (ADMIN/AGENT only)
- `PUT /api/packages/{id}` - Update a package (ADMIN/AGENT only)
- `DELETE /api/packages/{id}` - Delete a package (ADMIN only)

### Tracking Events

- `GET /api/packages/{packageId}/events` - Get all tracking events for a package
- `POST /api/packages/{packageId}/events` - Create a new tracking event (ADMIN/AGENT only)

### Users

- `GET /api/users` - Get all users (ADMIN only)
- `GET /api/users/{id}` - Get user by ID (ADMIN only)
- `PUT /api/users/{id}/role` - Update user role (ADMIN only)

## H2 Console

The H2 database console is available at `http://localhost:8080/h2-console`.

- JDBC URL: `jdbc:h2:mem:packagetracker`
- Username: `sa`
- Password: (leave blank)

## CORS Configuration

The backend is configured to accept requests from `http://localhost:3000` by default.

