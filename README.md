# Expo LMS Platform

Expo LMS is a full-featured Learning Management System (LMS) platform that allows users to register, browse courses, purchase them, and access course content. It also features an admin dashboard for managing courses, users, and analytics.

## Technologies Used

- **Frontend**: Next.js, Redux
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens) for authentication and authorization
- **File Upload**: Cloudinary for image and video uploads
- **Payments**: Stripe for course purchases
- **State Management**: Redux for handling global state

## Features

### User Features:

- **Account Registration**: Users can register an account and will receive a verification code via email to complete the sign-up process.
- **Course Browsing**: Users can view available courses on the courses page, and see detailed information about each course on the course details page.
- **Course Purchase**: Users can purchase a course using Stripe for secure payments.
- **User Dashboard**:
  - **Profile**: Users can view and edit their profile information.
  - **Order History**: Users can view their order history.
  - **Password Change**: Users can update their password in the Change Password page.
- **Course Access**: Users can see all the courses they have purchased and continue learning from where they left off by accessing course content.

### Admin Features:

- **Admin Dashboard**:
  - **Platform Statistics**: Admins can see key statistics about the platform, including user and course data.
  - **Course Management**:
    - Create a course and upload modules.
    - Edit course details and add new modules.
    - View a list of all courses and manage them.
  - **Invoices**: View a list of all transactions and monitor platform earnings.
  - **User Management**: View all users and promote them to admin.
  - **Analytics**:
    - **Course Analytics**: See insights into course performance.
    - **User Analytics**: Get detailed information on user activity.
    - **Order Analytics**: View order data in detailed charts.

## Installation

To set up and run the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/saiyedimtiaj/LMS-Platfrom.git
   cd LMS-Platfrom
   ```

2. **Install the dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following variables:

   ```bash
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLIC_KEY=your_stripe_public_key
   GOOGLE_SECRET_ID=your google secret id
   ```

4. **Run the application**:

   - For development:

     ```bash
     npm run dev
     ```

   - For production:
     ```bash
     npm run build
     npm start
     ```

## Backend Repository

https://github.com/saiyedimtiaj/LMS-SERVER

## Admin Access

To log in as an admin, use the following credentials:

- **Admin Email**: `admin@example.com`
- **Admin Password**: `admin123`

## Test Environment

To run tests for the project:

1. **Set up the test environment**:
   Ensure that your `.env` file is configured with the correct test database and variables.
2. **Run tests**:
   ```bash
   npm run dev
   ```
