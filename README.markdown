# Product Inventory Management System

## Overview
This is a full-stack Product Inventory Management application built with **Node.js (Express)** for the backend, **React.js (Hooks)** for the frontend, and **MySQL** for the database. The application allows users to:
- Add new products with name, price, image, and category.
- View a list of all products in a table.
- Filter products by category using a dropdown.
- Delete products from the inventory.

## Tech Stack
- **Backend**: Node.js, Express
- **Frontend**: React.js (Hooks)
- **Database**: MySQL
- **Styling**: Tailwind CSS (for React frontend)
- **API**: RESTful API with JSON responses

## Features
- **Add Product**: Form to input product details (name, price, image, category).
- **List Products**: Display all products in a tabular format with category information.
- **Filter by Category**: Dropdown to filter products based on selected category.
- **Delete Product**: Delete button on each product row to remove it from the inventory.
- **Responsive UI**: Clean and user-friendly interface with Tailwind CSS.

## API Endpoints
| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| GET    | `/categories`                | Retrieve all categories              |
| GET    | `/products`                  | Retrieve all products                |
| GET    | `/products?category_id=<id>` | Filter products by category ID       |
| POST   | `/products`                  | Add a new product                    |
| DELETE | `/products/:id`              | Delete a product by ID               |

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8 or higher)
- npm or yarn
- Git

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the MySQL database:
   - Create a MySQL database (e.g., `inventory_db`).
   - Update the database configuration in `backend/config/db.js` with your MySQL credentials:
     ```javascript
     const mysql = require('mysql2');
     const connection = mysql.createConnection({
       host: 'localhost',
       user: 'your_username',
       password: 'your_password',
       database: 'inventory_db'
     });
     ```
4. Run database migrations:
   - Create the `categories` and `products` tables using the SQL scripts in `backend/database/schema.sql`:
     ```sql
     CREATE TABLE categories (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL
     );

     CREATE TABLE products (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       price DECIMAL(10, 2) NOT NULL,
       image VARCHAR(255),
       category_id INT,
       FOREIGN KEY (category_id) REFERENCES categories(id)
     );
     ```
5. Start the backend server:
   ```bash
   npm start
   ```
   - The server will run on `http://localhost:5000` by default.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd <repository-folder>/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   - The frontend will run on `http://localhost:3000` by default.

### Database Configuration
- Ensure MySQL is running and the database is set up as described above.
- Seed the `categories` table with sample data if needed:
  ```sql
  INSERT INTO categories (name) VALUES ('Electronics'), ('Clothing'), ('Books');
  ```

## Usage
1. Open the application in your browser at `http://localhost:3000`.
2. Use the form to add a new product by entering its name, price, image URL, and selecting a category.
3. View the product list in the table below the form.
4. Use the category dropdown to filter products by category.
5. Click the "Delete" button on any product row to remove it from the inventory.

## Project Structure
```
project-root/
├── backend/
│   ├── config/
│   │   └── db.js              # MySQL database configuration
│   ├── routes/
│   │   └── api.js             # API routes for products and categories
│   ├── database/
│   │   └── schema.sql         # SQL schema for database setup
│   ├── server.js              # Main Express server file
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductForm.js # Form for adding products
│   │   │   ├── ProductList.js # Table for listing products
│   │   │   └── CategoryFilter.js # Dropdown for filtering by category
│   │   ├── App.js             # Main React component
│   │   └── index.js           # React entry point
│   └── package.json
└── README.md
```

## Notes
- The backend uses Express to handle API requests and MySQL for data storage.
- The frontend uses React Hooks for state management and Tailwind CSS for styling.
- Ensure the backend server is running before starting the frontend to avoid API connection issues.
- The application assumes a stable internet connection for fetching images (if using external URLs).

## Bonus Features
- **UX Polish**: Smooth transitions and responsive design with Tailwind CSS.
- **Clean Code**: Modular React components and well-organized Express routes.
- **Error Handling**: Basic error messages for invalid inputs and API failures.

## Troubleshooting
- **Database Connection Issues**: Verify MySQL credentials in `backend/config/db.js` and ensure the MySQL server is running.
- **CORS Errors**: Ensure the backend allows CORS for `http://localhost:3000` (configured in `backend/server.js`).
- **API Errors**: Check the console logs for both backend and frontend for detailed error messages.

## Future Improvements
- Add product update/edit functionality.
- Implement pagination for large product lists.
- Add authentication for secure access.
- Include image upload functionality instead of using external URLs.

## License
This project is licensed under the MIT License.