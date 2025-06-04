# 📝 Task Management System

A full-stack Task Management application built using **Spring Boot Microservices** for the backend and **React** for the frontend. This project allows users to create, assign, update, and track tasks with a focus on scalability, modularity, and user experience.



## 🌟 Features

### Authentication & Authorization
- ✅ User registration and authentication (JWT)
- ✅ Role-based access control
- ✅ Secure password storage

### Task Management
- ✅ Create, update, delete tasks
- ✅ Assign tasks to users
- ✅ Track task status and history
- ✅ Filter and search tasks

### System Architecture
- ✅ API Gateway routing
- ✅ Centralized security
- ✅ Service Discovery using Eureka
- ✅ Microservices communication

## 🛠️ Technologies Used

### Backend (Microservices)
| Service          | Technologies                          |
|------------------|---------------------------------------|
| API Gateway      | Spring Cloud Gateway                 |
| Discovery Server | Spring Eureka                        |
| Task Service     | Spring Boot, Spring Data JPA         |
| User Service     | Spring Boot, Spring Security        |
| Submission Service| Spring Boot, Spring Data JPA        |
| Database         | PostgreSQL                           |
| Utilities        | Lombok                               |

### Frontend
- React.js with Hooks
- Axios for HTTP requests
- React Router for navigation
- Tailwind CSS for styling
- JWT Token Handling
- Responsive Design

## 🏗️ Project Structure

task-management-system/
├── backend/
│ ├── api-gateway/ # Spring Cloud Gateway
│ ├── discovery-server/ # Eureka Server
│ ├── task-service/ # Task management logic
│ ├── user-service/ # User management
│ └── Submission-service/ # Task submission
├── frontend/
│ └── task-manager-client/ # React application
├── README.md
└── LICENSE


## 🚀 Getting Started

### Prerequisites
- Java 17+
- PostgreSQL
- Maven

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/task-management-system.git
   cd task-management-system

2.Database Setup

Create a PostgreSQL database
Update connection details in each service's application.yml

# 1. Discovery Server
cd backend/discovery-server && mvn spring-boot:run

# 2. API Gateway (in new terminal)
cd ../api-gateway && mvn spring-boot:run

# 3. Other services (in new terminals)
cd ../user-service && mvn spring-boot:run
cd ../task-service && mvn spring-boot:run
cd ../auth-service && mvn spring-boot:run

cd frontend/task-manager-client
npm install
npm run dev

🔒 Security
JWT-based stateless authentication

Spring Security for endpoint protection

Password encryption
