# Explore Bangla
It's your trusted tourism management system plateform.

## Purpose
Explore Bangla is a web-based tourism management system designed to simplify travel planning in Bangladesh. It connects tourists with curated tour packages, trusted guides, and secure online bookings. The platform enhances user experience by offering personalized profiles and seamless management for tourists, guides, and admins.

**Admin Credentails For Login Admin Panel:** <br /> 
Email: jakariag84@gmail.com <br />
Password: Gj#12345 

## Preview
![Project Image](public/explore-bangla.png)

## Live URL
[Visit Explore Bangla Website](https://explore-bangla-9f392.web.app/)

## Key Features

### **🌍 Roles-Based System**
- **Tourist:**  
  - Browse and view all available packages.  
  - View package details and book packages.  
  - Manage their profile and update personal details.  
  - Make secure payments via Stripe Payment Gateway.  
  - View tour guide profiles and their details.  
  - Add and manage personal travel stories.  
  - Apply to join as a tour guide.  

- **Tour Guide:**  
  - Manage tourist bookings assigned to them.  
  - Update and manage their profile.  
  - Add travel stories to the platform.  
  - Manage their own stories, including editing and deleting.  

- **Admin:**  
  - Manage their profile and update administrative details.  
  - Add new tour packages to the system.  
  - Review and manage applications for users applying as tour guides.  
  - View and manage all users, including tourists and tour guides.  


## Technologies Used
This project was built using the following technologies:
- **Frontend:** React, HTML, CSS
- **Styling:** Tailwind CSS, DaisyUI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Firebase:** Firebase is used for authentication.
- **Hosting:** Firebase for client-side, imgbb for image and Vercel for server-side
- **JWT:** JSON Web Token for authentication
- **Payment Gateway:** Stripe payment gateway

## **NPM Packages**
The following npm packages were used in the project:

- [`firebase`](https://www.npmjs.com/package/firebase): JavaScript library for Firebase services, including authentication and database.
- [`tailwindcss`](https://www.npmjs.com/package/tailwindcss): A utility-first CSS framework for creating custom designs.
- [`daisyui`](https://www.npmjs.com/package/daisyui): Component library for Tailwind CSS with a variety of pre-styled components.
- [`react-router-dom`](https://www.npmjs.com/package/react-router-dom): Declarative routing for React applications.
- [`react`](https://www.npmjs.com/package/react): A JavaScript library for building user interfaces.
- [`react-icons`](https://www.npmjs.com/package/react-icons): Popular icons as React components.
- [`sweetalert`](https://www.npmjs.com/package/sweetalert): Alert notifications for React.
- [`react-awesome-reveal`](https://www.npmjs.com/package/react-awesome-reveal): A React component library for adding reveal animations to elements.
- [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken): Library to create and verify JSON Web Tokens (JWT) for authentication.
- [`react-helmet`](https://www.npmjs.com/package/react-helmet): A library to manage changes to the document head.
- [`react-toastify`](https://www.npmjs.com/package/react-toastify): Toast notifications for React applications.
- [`stripe`](https://www.npmjs.com/package/stripe): Node.js library for integrating and managing Stripe Payment Gateway for secure and seamless transactions.  
- [`@tanstack/react-query`](https://www.npmjs.com/package/@tanstack/react-query): Powerful data fetching and caching library for React applications.  
- [`react-confetti`](https://www.npmjs.com/package/react-confetti): A simple library for adding fun confetti animations to React applications.  

## Getting Started
Follow these steps to set up and run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Jakaria030.git
   ```
2. Navigate to the project directory:
   ```bash
   cd b10a12-client-side-Jakaria030
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. You have to setup some other things like firebase as per your need. Also you have to setup backend server. <br>
   Follow my server sidde Github reposity docs.
[Visit](https://github.com/Programming-Hero-Web-Course4/b10a12-server-side-Jakaria030)