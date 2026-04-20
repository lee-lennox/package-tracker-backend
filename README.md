# Package Tracker

A full-stack application for tracking and managing package shipments with real-time updates and secure authentication.

## 🎯 Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Package Management**: Create, read, and manage packages
- **Package Tracking**: Track real-time package status and locations
- **Tracking Events**: Record and view package tracking events
- **Role-Based Access**: Different user roles with appropriate permissions
- **Dashboard**: Interactive dashboard to view all packages and their status
- **CORS Support**: Cross-origin requests configured for secure frontend communication

## 🏗️ Project Structure

```
PackageTracker/
├── backend/                 # Spring Boot REST API
│   ├── src/main/java/      # Java source code
│   │   └── com/packagetracker/
│   │       ├── config/     # CORS, Security, Data initialization configs
│   │       ├── controller/ # REST endpoints
│   │       ├── dto/        # Data Transfer Objects
│   │       ├── model/      # JPA entities
│   │       ├── repository/ # Data access layer
│   │       ├── security/   # JWT utilities and filters
│   │       └── service/    # Business logic
│   ├── src/main/resources/ # Configuration files
│   └── pom.xml            # Maven configuration
│
└── frontend/                # React web application
    ├── public/             # Static files
    ├── src/
    │   ├── components/     # Reusable React components
    │   ├── services/       # API communication
    │   └── App.js         # Main application component
    └── package.json       # Node.js dependencies
```

## 🛠️ Tech Stack

### Backend
- **Java 11**
- **Spring Boot 2.7.18**
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database operations
- **H2 Database** - In-memory relational database
- **JWT (JSON Web Tokens)** - Secure token-based authentication
- **Maven** - Build and dependency management

### Frontend
- **React 19.2.0** - UI library
- **Axios 1.12.2** - HTTP client for API requests
- **React Scripts 5.0.1** - Create React App build tools

## 📋 Prerequisites

- **Java 11** or higher
- **Maven 3.6+**
- **Node.js 16+** and **npm 7+**
- **Git**

## 🚀 Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies and build:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

   The backend API will start on `http://localhost:8080`

4. Access H2 Console (for debugging):
   ```
   http://localhost:8080/h2-console
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The frontend will open at `http://localhost:3001`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Users
- `GET /api/users/{id}` - Get user profile
- `PUT /api/users/{id}` - Update user profile

### Packages
- `GET /api/packages` - List all packages
- `POST /api/packages` - Create a new package
- `GET /api/packages/{id}` - Get package details
- `PUT /api/packages/{id}` - Update package
- `DELETE /api/packages/{id}` - Delete package

### Tracking Events
- `GET /api/tracking-events` - List all tracking events
- `POST /api/tracking-events` - Create a new tracking event
- `GET /api/tracking-events/package/{packageId}` - Get events for a package

## 🔐 Security

- JWT-based authentication with configurable token expiration (24 hours)
- CORS configured for frontend communication
- Spring Security integration for authorization
- Secure password encoding

## 🗄️ Database

The application uses **H2 Database** (in-memory) for development and testing.

**Configuration** (in `application.properties`):
- URL: `jdbc:h2:mem:packagetracker`
- Auto schema generation: Enabled
- H2 Console: Available at `/h2-console`

## 📝 Default Users

The application auto-initializes with sample data including:
- Sample users with different roles
- Sample packages
- Sample tracking events

## 🧪 Running Tests

### Backend
```bash
cd backend
mvn test
```

### Frontend
```bash
cd frontend
npm test
```

## 📦 Building for Production

### Backend
```bash
cd backend
mvn clean package
```

The JAR file will be generated at `target/package-tracker-backend-1.0.0.jar`

### Frontend
```bash
cd frontend
npm run build
```

The optimized build will be in the `build/` directory

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For questions or issues, please open an issue in the GitHub repository.
