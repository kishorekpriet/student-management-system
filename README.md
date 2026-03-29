# 🎓 Student Management System (Full-Stack)

A modern, full-stack administrative dashboard designed to manage student records with high efficiency. This project integrates a robust **Spring Boot** backend with a high-performance **React (Vite)** frontend, featuring real-time data synchronization and enterprise-grade reporting.

## 🚀 Tech Stack

### **Backend**
* **Language:** Java 17
* **Framework:** Spring Boot 3.x
* **Database:** MySQL 8.0
* **ORM:** Spring Data JPA
* **Library:** Apache POI (for Excel generation)

### **Frontend**
* **Library:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Icons:** Lucide-React
* **API Client:** Axios
* **Feedback:** React-Hot-Toast

---

## ✨ Key Features

* **Full CRUD Operations:** Seamlessly Create, Read, Update, and Delete student records.
* **Enterprise Excel Export:** Generate and download live `.xlsx` reports of the student database with a single click.
* **Real-time Analytics:** A dynamic dashboard that calculates total student counts and department-specific (ECE) metrics instantly.
* **Global Live Search:** Instantly filter records by name, email, or department using an optimized client-side search engine.
* **Professional UX:** Integrated Toast notifications for asynchronous feedback and a fully responsive "Admin" layout.

---

## 🛠️ Installation & Setup

### **1. Backend (Spring Boot)**
1. Ensure you have **Java 17** and **Maven** installed.
2. Import the `backend` folder into **Eclipse** or **IntelliJ**.
3. Update `src/main/resources/application.properties` with your MySQL username and password.
4. Run `BackendApplication.java` as a Java Application.
5. The server will start on `http://localhost:8081`.

### **2. Frontend (React)**
1. Navigate to the `frontend` folder: `cd frontend`.
2. Install dependencies: `npm install`.
3. Start the development server: `npm run dev`.
4. Open `http://localhost:5173` in your browser.

---

## 👨‍💻 Author

**Kishore** *Electronics and Communication Engineering (ECE) Graduate, Class of 2026* *Specializing in Embedded Systems, IoT, and Full-Stack Development.*

---

## 🔮 Future Improvements
* [ ] **Authentication:** Implement JWT-based login for secure admin access.
* [ ] **Cloud Storage:** Integrate AWS S3 for student profile picture uploads.
* [ ] **Advanced Analytics:** Add Recharts for visual data representation.
