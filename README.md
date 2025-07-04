# Minimal Library Management System


a minimal library management system made with React, Redux Toolki Query, Shadcn Ui, TailwindCSS and TypeScript on the front-end, and a NodeJS, ExpressJS, MongoDB with Mongoose backend. This application allows for seamless management of books, including all CRUD operations, borrowing, and viewing borrow summary.

##

### 1. Git Repo

Front-End: https://github.com/codewithsaidul/ph-redux-assignment-four
Back-End: https://github.com/codewithsaidul/ph-mongooshe-assignment-three

##

### 2. Live URL
Live Demo Front-End: https://libralite.vercel.app
Live Link Back-End: https://library-management-api-beta.vercel.app


##

## 3. Features

### 3.1 Book Management

- ```List All Books:``` View all books in a clean, responsive table with columns for Title, Author, Genre, ISBN, Copies, and Availability.
- ```Add a New Book:``` A dedicated form to add a new book to the library. The UI updates instantly upon successful creation.
- ```Edit Book Details:``` Update a book's information (Title, Author, etc.) through a pre-filled form. Changes are reflected immediately.
- ```Delete a Book:``` Remove a book from the system after a confirmation modal.
- ```Business Logic:``` If a book's copy count is set to 0, its status automatically updates to ```"Unavailable"```.

##

### 3.2 Borrowing System
- ```Borrow a Book:``` A simple form to borrow a book, specifying the quantity and due date.
- ```Validation:``` The system prevents borrowing more copies than are currently available.
- ```Availability Update:``` When the last available copy of a book is borrowed, it is marked as ```"Unavailable"```.
- ```Success Feedback:``` Users receive a toast notification upon successfully borrowing a book and are redirected to the summary page.

##

### 3.3 Borrow Summary
- ```Aggregated View:``` A dedicated page displaying a list of all borrowed books.
- ```Data Displayed:``` The summary table shows the Book `Title`, `ISBN`, and the `total quantity` borrowed for each book, fetched from a backend aggregation pipeline.

##

## 4. Bonus Features Implemented
```✔️  Optimistic UI Updates:``` The UI updates instantly after mutations (add, edit, delete) for a smooth user experience, while re-fetching in the background to ensure data consistency.
```✔️  Toast Notifications:``` Provides clear, non-intrusive feedback for actions like successfully adding a book or confirming a borrow.
```✔️ Fully Responsive Layout:``` The entire application is designed to work seamlessly on mobile, tablet, and desktop devices.
```✔️ Type-Safe Forms:``` Utilizes TypeScript to ensure all form handling is fully type-safe, reducing runtime errors.

## 

## 5. Technology Stack

```
Layer                                        Technology

Frontend                                     React, TypeScript

State Management                             Redux Toolkit, RTK Query

Styling                                      Tailwind CSS, ShadCN UI


Backend                                      Node.js, Express.js


Database                                     MongoDB, Mongoose

Deployment                                   Vercel (Frontend), Vercel (Backend)


```


##


## 6. Getting Started

### 6. Prerequisites

- Node.js (v18 or later)

- npm or yarn

- Git

- MongoDB instance (local or cloud-based like MongoDB Atlas)

##

### 6.2 Installation & Setup

#### 6.2.1 Clone the repository:

```
git clone https://github.com/codewithsaidul/ph-mongooshe-assignment-three
cd ph-mongooshe-assignment-three

# Install dependencies
npm install

# .env
MONGODB_URI = mongodb+srv://<username>:<password>@cluster.mongodb.net/library

# Run the backend server
npm run dev
```

The server will be running on http://localhost:3000.

##

### 6.2.3 Frontend Setup:

```
git clone https://github.com/codewithsaidul/ph-redux-assignment-four
cd ph-redux-assignment-four


# .env
VITE_API_URL=https://localhost:5173


# Install dependencies
npm install

# Run the Front-End
npm run dev
```
The frontend will be accessible at http://localhost:5173


##



## 7. API Endpoints
All endpoints are prefixed with `/api.`



````

Method                              Endpoint                            Description

POST                                /books                              Add a new book.

GET                                 /books                              Get a list of all books (supports pagination).

GET                                 /books/:id                          Get details of a single book by its ID.

PATCH                               /books/:id                          Update an existing book's details.

DELETE                              /books/:id                          Delete a book from the system.




POST                                /borrow                             Borrow a book. Requires `book`, `quantity`, `dueDate`.

GET                                 /borrow-summary                     Get an aggregated summary of all borrowed books.

````