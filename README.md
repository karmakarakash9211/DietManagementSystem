# Diet Management System

A full-stack **Diet Management System** built using **Spring Boot + React** that helps users track daily food intake, monitor weight progress, and manage fitness batches with role-based access.

## Features

### Authentication & Authorization

* JWT-based login system
* Role-based access:

  * **ADMIN**
  * **MOTIVATOR**
  * **CHALLENGER**
* Secure API endpoints

### Challenger Dashboard

* Add daily logs:
  * Breakfast, Lunch, Dinner
  * Workout
  * Weight
* View log history
* Track **weight progress chart**
* Calculate:
  * BMI
  * Goal progress %

### Motivator Dashboard

* View assigned users
* Monitor user progress
* Track performance insights

### Admin Dashboard

* View all users
* Approve / Reject users
* View system statistics:

  * Total users
  * Total logs
  * Average weight
* Weight trend analytics chart

### Batch Management

* Create batches
* Assign users to batches
* View batch-wise leaderboard

### Leaderboard

* Rank users within a batch
* Display latest weight
* Medal-based ranking

## Tech Stack

### Backend

* Java 17
* Spring Boot
* Spring Security (JWT)
* Spring Data JPA
* MySQL

### Frontend

* React.js
* Material UI (MUI)
* Axios
* Chart.js

## Project Structure

diet-management-system/
│
├── backend/
│   ├── controller/
│   ├── entity/
│   ├── repository/
│   ├── service/
│   └── config/
│
├── frontend/
│   ├── pages/
│   ├── services/
│   ├── components/
│   └── App.js
│
└── README.md

2. Configure MySQL in `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/diet_management
spring.datasource.username=root
spring.datasource.password=yourpassword
```

3. Run the application:

```bash
mvn spring-boot:run
```

### Frontend Setup

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start React app:

```bash
npm start
```

## API Endpoints

### Auth

* `POST /auth/register`
* `POST /auth/login`

### Challenger

* `POST /challenger/log`
* `GET /challenger/logs`

### Admin

* `GET /admin/users`
* `POST /admin/approve/{id}`
* `POST /admin/reject/{id}`
* `POST /admin/batch`
* `POST /admin/assign`
* `GET /admin/batches`

### Batch

* `GET /batch/{id}/leaderboard`

## Security Notes

* JWT token required for protected APIs
* Admin cannot be self-registered
* Role-based endpoint protection implemented

## Future Enhancements

* Email verification (OTP)
* Push notifications
* Mobile app version
* Advanced analytics dashboard
* AI-based diet recommendations

## Author

**Akash Kumar Karmakar**
G-Mail: kumarakash.karmakar@gmail.com
LinkedIn: [www.linkedin.com/in/akashkumarkarmakar](http://www.linkedin.com/in/akashkumarkarmakar)

## ⭐ If you like this project

Give it a ⭐ on GitHub and share it!

---
