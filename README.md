# EduCoder

EduCoder is an innovative online learning platform that connects students and instructors, providing tools for effective course management and an engaging learning experience. Built using modern web technologies, EduCoder streamlines the process of course creation, enrollment, and management.

## Credentials

- **Student Login**

  - Email: `student@gmail.com`
  - Password: `1234abcd`

- **Instructor Login**

  - Email: `instructor@gmail.com`
  - Password: `1234abcd`

- **Admin Login**
  - Email: `admin@gmail.com`
  - Password: `1234abcd`

## Description

EduCoder offers a comprehensive suite of features for users, allowing instructors to create and manage courses while enabling students to enroll and learn seamlessly. The platform emphasizes user experience and security, employing modern technologies to deliver a robust online education solution.

## Features

- **User Roles**: Distinct roles for Students, Instructors, and Admins, each with tailored functionalities.
- **Course Management**: Instructors can create, edit, and delete courses, complete with multimedia support for videos and thumbnails.
- **Profile Management**: Users can manage and update their profiles, including uploading images to Cloudinary for storage.
- **Analytics Dashboard**:
  - **Instructor Dashboard**: View graphical analytics of student enrollments per course and income generated.
  - **Student Dashboard**: Access enrolled courses and manage cart items.
  - **Admin Dashboard**: Overview of all registered instructors and students.
- **Nodemailer Integration**: Sends automated email notifications during user registration and for course-related updates.
- **NextAuth Authentication**: Secure user login and registration process.
- **Cloudinary Integration**: Used for storing course thumbnails and lecture videos.
- **Responsive Design**: Built with Tailwind CSS for a modern and mobile-friendly user interface.

## Environment Variables Setup

To run the project, set up your environment variables in a `.env` file with the following format:

```plaintext
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.5pw9z.mongodb.net/educoder
CLOUD_NAME=<your_cloud_name>
API_KEY=<your_api_key>
API_SECRET=<your_api_secret>
MAIL_HOST=<your_mail_host>
MAIL_PORT=<your_mail_port>
MAIL_SECURE=<true_or_false>
MAIL_PASS=<your_mail_password>
MAIL_USER=<your_mail_user>
JWT_SECRET=<your_jwt_secret>
NODE_ENV=<development_or_production>
NEXTAUTH_SECRET=<your_nextauth_secret>
NEXTAUTH_URL=<your_nextauth_url>
```

## Installation and Running the Project

To install dependencies, run:

```bash
npm install
```

To start the development server, use:

```bash
bun run dev
```

## Dashboard Overview

### Student Dashboard

- **Cart Page**: Displays all products added to the cart, allowing students to review and manage their selections before enrollment.
- **Enrolled Courses**: Students can view their enrolled courses, access course materials, and continue their learning journey at any time. This section provides a seamless experience for accessing lectures, assignments, and quizzes.

### Instructor Dashboard

- **Add Course**: Instructors can create new courses with options for uploading thumbnails and lecture videos using Cloudinary. This feature simplifies the course creation process while allowing for rich multimedia content.
- **My Profile**: Instructors can view and edit their profile details, including uploading their profile image to Cloudinary for better visibility. This section includes personal data and allows instructors to keep their information current.
- **My Courses**: A dedicated page where instructors can view all the courses they have created, along with options to edit or delete them. Instructors can easily manage their content, ensuring their courses are up-to-date and relevant.
- **Analytics Chart**: Visual representation of the number of students enrolled in each course, along with income generated. This feature helps instructors track their performance and adjust their offerings accordingly.

### Admin Dashboard

- **User Management**: Admins have a comprehensive view of all instructors and students registered on the platform. This section allows for monitoring user activities and ensuring the smooth operation of the platform.

## Additional Features

- **Email Verification**: Users receive verification codes during registration to confirm their accounts.
- **Course Purchase Tracking**: The platform logs the purchase times for courses, providing useful data for both users and administrators.

## Tech Stack

- **Next.js**: React framework for server-side rendering and building scalable web applications.
- **TypeScript**: Superset of JavaScript providing static typing for better code quality.
- **Redux**: State management library for managing application state across components.
- **Mongoose**: ODM for MongoDB, used for defining schemas and interacting with the database.
- **MongoDB**: NoSQL database for storing application data.
- **Swiper Slider**: For creating responsive slides showcasing courses.
- **NextAuth**: Authentication library for Next.js applications, facilitating secure user authentication.
- **React Hook Form**: Simplifies form handling and validation in React applications.
- **Tailwind CSS**: Utility-first CSS framework for styling, enabling rapid UI development.

## Folder Structure

```
src/
  └── app/
      ├── api/         # API routes for server-side functionalities
      └── (app router)  # App Router for organizing page routes
```

## Live Project Links

- [Live Project](https://edu-coder.vercel.app/)
- [GitHub Repository](https://github.com/mdimamhosen/EduCoder)

## Author

- **Md Imam Hosen**
  - Email: [mdimam.cse9.bu@gmail.com](mailto:mdimam.cse9.bu@gmail.com)
  - [LinkedIn](https://www.linkedin.com/in/mdimam02/)

---

Feel free to contribute to this project or report any issues. Happy coding!

```

### Important Notes:
- Make sure to replace placeholder texts (like `<username>`, `<password>`, etc.) with the appropriate values before sharing.
- This `README.md` file provides a thorough overview of your project, highlighting its features and functionality while ensuring clarity for users and contributors.
```
