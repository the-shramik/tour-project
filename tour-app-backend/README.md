
   
   <a href="https://docs.google.com/document/d/144co9yDRkcmQIlzcOYuUG-_2vi0Y3yRyDH8-a75mLT0/edit?tab=t.0">View Documentation</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)




# Tours & Travels Management System

A platform to streamline tour management for administrators and provide customers with an intuitive interface to explore and book travel plans. The system ensures secure and efficient data handling for destinations, lodging, transport, and bookings.  




## Table of Contents
- [Project UI](#project-ui)
- [Features](#features)
  - [User Module](#user-modules)
  - [Functional Features](#functional-features)
- [Technologies Used](#technologies-used)
- [Dependencies Used](#dependencies-used)
- [Installation](#installation)
  - [Backend Installation with IntelliJ IDEA](#backend-installation-with-intellij-idea)
  - [Frontend Installation With VS Code](#frontend-installation-with-vs-code)
- [Swagger Documentation](#swagger-documentation)
- [Postman APIs](#postman-apis)




## Project UI
![1](https://github.com/user-attachments/assets/37c260bb-4212-415d-b2a0-0c4b0dc123d0)

![2](https://github.com/user-attachments/assets/fa257e38-6d46-454e-82c7-2765ea3c3ed4)

![3](https://github.com/user-attachments/assets/fa6830ed-7fc1-479d-8fe1-d14ceaf65987)


  

## Features  

### User Modules  
#### **1. Administrator Module**  
- **Location Management**: Add, update, and delete travel destinations.  
- **Lodging Management**: Manage lodging details, including name, type, address, and rating.  
- **Transport Management**: Define transport options associated with tours.  
- **Tour Management**: Consolidate locations, lodging, and transport into cohesive tour plans.  
- **Booking Overview**: Monitor bookings, ticket sales, and customer details.  

#### **2. Customer Module**  
- **Registration/Login**: Register or log in to access personalized features.  
- **Tour Exploration**: Browse tours with filters (e.g., location, price, lodging, transport).  
- **Tour Booking**: Check availability, confirm bookings, and process payments.  


### Functional Features
#### **1. Security and Authentication**  
- Role-based access with Spring Security and OAuth2.  
- Encrypted passwords and restricted data access based on user roles.
- JWT (JSON Web Token) is generated upon successful authentication:
  - The token is sent to the client in the response.
  - The client includes the JWT in the `Authorization` header (e.g., `Bearer <token>`) for subsequent requests.
  - The server validates the JWT to authorize access to protected resources based on roles.  
#### **2. User Experience**  
- Responsive design with dynamic page titles and clean URLs.  
- Search and filter options for location, lodging, transport, and price.  
- Intuitive navigation with active, clickable links.  
#### **3. Data Management**  
- Robust validations and automated image deletion.  
- Clear relationships between tours, bookings, and associated entities (locations, lodging, transport).  
#### **4. Admin Capabilities**  
- Real-time dashboard for monitoring sales, bookings, and tour availability.  
#### **5. Payment and Transactions**  
- Secure payment handling with Stripe.  
#### **6. API and Logging**  
- Swagger for interactive API documentation.  
- Structured logging with SLF4J and Logback for monitoring and debugging.  
#### **7. Image Management**  
- Cloudinary integration for efficient image upload and storage.  
#### **8. Development Enhancements**  
- **Lombok Integration**: Simplifies code by reducing boilerplate for getters, setters, and constructors.  
- **Custom Exceptions**: Ensures precise error handling and user-friendly feedback across all modules.
#### **9. WhatsApp Integration**
- Integration with the WhatsApp API for seamless communication.
- Allows users to send messages directly from the application.




## Technologies Used

#### Backend Frameworks
* [![Spring Boot][SpringBoot.io]][SpringBoot-url]
* [![Spring][Spring.io]][Spring-url]
* [![OAuth2][OAuth2.io]][OAuth2-url] + [![JWT][JWT.io]][JWT-url]  
* [![Swagger][Swagger.io]][Swagger-url]

#### Programming Languages
* [![Java][Java.io]][Java-url]
* [![JavaScript][JavaScript.io]][JavaScript-url]

#### Frontend
* [![React][React.js]][React-url]
* [![Redux][Redux.js]][Redux-url]
* [![Tailwind CSS][TailwindCSS.io]][TailwindCSS-url]

#### Database
* [![PostgreSQL][PostgreSQL.io]][PostgreSQL-url]

#### Cloud Services
* [![Cloudinary][Cloudinary.io]][Cloudinary-url]

#### Payment Gateway
* [![Stripe][Stripe.dev]][Stripe-url]

#### Version Control System
* [![Git][Git.io]][Git-url]
* [![GitHub][GitHub.com]][GitHub-url]

#### API Testing Tools
* [![Postman][Postman.io]][Postman-url]

[SpringBoot.io]: https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white
[SpringBoot-url]: https://spring.io/projects/spring-boot

[Spring.io]: https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white
[Spring-url]: https://spring.io/projects/spring-framework

[OAuth2.io]: https://img.shields.io/badge/OAuth2-3b5998?style=for-the-badge&logo=oauth&logoColor=white
[OAuth2-url]: https://oauth.net/2/

[JWT.io]: https://img.shields.io/badge/JWT-JSON%20Web%20Token-blue?style=for-the-badge&logo=json-web-tokens&logoColor=white
[JWT-url]: https://jwt.io/

[Swagger.io]: https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black
[Swagger-url]: https://swagger.io/

[Java.io]: https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white
[Java-url]: https://www.java.com/

[JavaScript.io]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Redux.js]: https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/

[TailwindCSS.io]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/

[PostgreSQL.io]: https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/

[Cloudinary.io]: https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white
[Cloudinary-url]: https://cloudinary.com/

[Stripe.dev]: https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white
[Stripe-url]: https://stripe.com/

[Git.io]: https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white
[Git-url]: https://git-scm.com/

[GitHub.com]: https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white
[GitHub-url]: https://github.com/

[Postman.io]: https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white
[Postman-url]: https://www.postman.com/




## Dependencies Used

| **Dependency**                        | **Dependency**                          |
|-----------------------------          |----------------------------------       |
| - spring-boot-starter-web             | - spring-boot-starter-security          |
| - spring-boot-starter-data-jpa        | - jjwt-api                              |
| - postgresql                          | - jjwt-impl                             |
| - hibernate-validator                 | - jjwt-jackson                          |
| - lombok                              | - spring-boot-starter-oauth2-client     |
| - spring-boot-starter-logging         | - cloudinary-http5                      |
| - springdoc-openapi-starter-webmvc-ui | - stripe-java                           |
| - spring-boot-devtools                | - spring-boot-starter-test              |




## Installation
### **Clone the Repository**
   ```bash
   git clone https://github.com/navinreddy20/tours_telusko.git
   cd tours-and-travels-backend
  ```
  
### **Backend Installation with IntelliJ IDEA**

### 1. Open the Project in IntelliJ
- Launch IntelliJ IDEA.
- Click **File** > **Open** and select the `tours_telusko` folder.
- Import the Maven dependencies.
- Used Versions:
    **JDK Version** : 21
    **Springboot** : 3
    **Spring** : 6
### 2. Configure the Application
- Navigate to `src/main/resources/application.properties`.
- Update the database, cloudinary, stripe, outh2 configuration.

  #### PostgreSQL Configuration
  ```
  spring.datasource.url= jdbc:postgresql://localhost:5432/TeluskoTours
  spring.datasource.username= your_username
  spring.datasource.password= your_password
  spring.datasource.driver-class-name= org.postgresql.Driver
  spring.jpa.properties.hibernate.dialect= org.hibernate.dialect.PostgreSQLDialect
  ```

  #### OAuth2 Configuration
  Steps to Generate Keys and Credentials:
  1. **Google Cloud Console**:  
  Visit [Google Cloud Console](https://console.cloud.google.com/) and log in.
  2. **Create Project**:  
  Click New Project, name it, and create.
  3. **Enable APIs**:  
  Go to **APIs & Services > Library**, enable the following:  
   - Google+ API  
   - Google Identity API
  4. **Create Credentials**:  
  Navigate to **APIs & Services > Credentials**, select **OAuth 2.0 Client ID**, configure the consent screen, and set the redirect URI:  
   ```bash
   http://localhost:8080/login/oauth2/code/google
   ```
   
   ```
  spring.security.oauth2.client.registration.google.client-name= google
  spring.security.oauth2.client.registration.google.client-id= your_client-id
  spring.security.oauth2.client.registration.google.client-secret= your_client-secret
  spring.security.oauth2.client.registration.google.scope= openid, email, profile
  spring.security.oauth2.client.registration.google.redirect-uri= http://localhost:8080/login/oauth2/code/google
  ```

  #### Cloudinary Configuration
  Steps to Generate Keys and Credentials:
  1. **Create Account**:  
  Sign up or log in at Cloudinary.
  2. **Retrieve Credentials**:  
  From the dashboard, copy Cloud Name, API Key, and API Secret.
  
  ```
  cloudinary.cloud-name= your_cloud-name
  cloudinary.api-key= your_api-key
  cloudinary.api-secret= your_api-secret
  ```

  #### Stripe Configuration
  Steps to Generate Keys and Credentials:
  1. **Create Account**:  
  Sign up or log in at Stripe.
  2. **Retrieve Credentials**:  
  Go to Developers > API Keys and copy the following:
    - Secret Key (server-side)
    - Publishable Key (client-side)
      
  ```
  stripe.secret.key= your_secret-key
  stripe.publishable.key= your_publishable-key
  ```

### 3. Run the Application
   - In IntelliJ, navigate to the ToursAndTravelsApplication class.
   - Right-click the class and select Run.
   - Backend application will run at the URL : http://localhost:8080.
     

### **Frontend Installation with VS Code**

1. **Open Frontend Folder**:  
   To open the frontend folder, navigate to `src/main/Frontend`.

2. **File Initialization**:  
   Create a file named `.env` inside the root directory of the frontend folder.  
   Write the following inside your `.env` file:  
   `VITE_BASE_URL = YOUR BACKEND URL`

3. **Module Initialization**:  
   Inside the frontend folder, run `npm install` at the root path to install the node modules.

4. **Start Project**:  
   Inside the frontend folder, run `npm run dev` at the root path to start your React-Vite application.  
   Most likely, your Vite project will run on port `5173`. Click on the `https://localhost:5173` URL to open your project in the browser.



      
## Swagger Documentation
Open Swagger UI to explore API documentation. <br>
http://localhost:8080/swagger-ui/index.html#/




## Postman APIs
Open Postman and test the APIs. <br>
https://teluskotoursproject.postman.co/workspace/27b211b1-7de4-4207-ab26-f61659e3da96/documentation/33063124-66e92c37-6eb2-4bdd-80cd-927289b0d746


  
  









