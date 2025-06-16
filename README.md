Rentrify

Live: https://brian-auth-me.onrender.com/
Git: https://github.com/Bschaler/frontend_airbnb_clone



ABOUT:

Rentrify is a full stack airbnb like clone, that offers the ability to create a profile, list your home, review other rentals, etc. Bookings will come later. As well as updates to reviews


### Key Functionality
- Browse Properties: Users have the ability to view rental listings with images, ratings, and pricing
- User Authentication: User signup/login is secured with JWT tokens
- Property Management: Users have the ability to create, edit, and delete rental listings, as well as leave reviews on spots not of their own(and delete as well)
- Responsive Design: Designs are built for desktops and should move responsively with the screen


# Authentication
- Users sign up and log in
- Passwords are hashed with bcrypt for security
- JWT are used for authentication


# Components
- Landing page will all spots
- Clicking on the spot will bring you to the details page
- By clicking Create a New Spot, users can fill out a form for their rental listing
- Users can upload 5 images for their spot
- Users can manage their properties on a seperate page where all of their listings appear.
- They can choose to edit, or delete the spot
- Reviews can be seen on details page if there are reviews available
- There is a 5 star system, that will be used for the average rating for the spot
- Reviewers can delete their reviews

# Design
- The design is built to be responsive for desktops
- There are various modal forms for the sign up and log in
- Users will see error messages if the input is not validated with expected responses

# Backend tech used
- Node.js - Runtime environment
- Express.js - Web application framework
- Sequelize - ORM for database operations
- PostgreSQL - Production database
- SQLite - Development database
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- express-validator - Input validation
- helmet - Security middleware
- CORS - Cross-origin resource sharing

# Frontend tech used

- React 18 - Component-based UI framework
- Redux - State management
- React Router - Client-side routing
- Vite - Build tool and development server
- FontAwesome & React Icons - Icon libraries

### Development Tools
-ESLint - Code linting
- Nodemon - Development auto-restart
- dotenv - Environment variable management


# Installation

Node.js (v18+)
npm
PostgreSQL (for production)

# Backend Setup
cd backend
npm install

# Set up environment variables
cp .env.example .env

# Database setup
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

npm start

# Frontend Setup
cd frontend
npm install
npm run dev

# ENV Variables
NODE_ENV=development
DB_FILE=db/dev.db
JWT_SECRET= you-secret-key-here
JWT_EXPIRES_IN=604800

# Deployment
This website is deployed using:

Frontend & Backend: Render
Database: PostgreSQL on Render

## API Docs
# Authentication Routes

POST /api/users - User registration
POST /api/session - User login
DELETE /api/session - User logout
GET /api/session - Gets current user

# Spots Routes

GET /api/spots - Gets all spots
GET /api/spots/:id - Gets spot by ID
POST /api/spots - Creates new spot (auth required)
PUT /api/spots/:id - Updates spot (auth required)
DELETE /api/spots/:id - Deletes spot (auth required)
GET /api/spots/current - Gets the current user's spots (auth is required)

# Reviews Routes

GET /api/spots/:spotId/reviews - Gets the reviews for a spot
POST /api/spots/:spotId/reviews - Creates the review (auth is required)
GET /api/reviews/current - Gets the current user's reviews (auth is required)
PUT /api/reviews/:reviewId - Updates the review (auth is required)
DELETE /api/reviews/:reviewId - Deletes the review (auth is required)



## IMPLEMENTATIONS IN THE FULL STACK

# Authentication 
JWT Authentication Implementation
javascriptconst setTokenCookie = (res, user) => {
  const setTokenCookie = (res, user) => {
  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName
  };
  
  const token = jwt.sign(
    { data: safeUser },
    secret,
    { expiresIn: parseInt(expiresIn) }
  );

  const isProduction = process.env.NODE_ENV === "production";

  const cookieOptions = {
    maxAge: expiresIn * 1000,                     
    httpOnly: true,                               
    secure: isProduction,                         
    path: '/'         
  };

  if (isProduction) {
    cookieOptions.sameSite = 'none';  
  } else {
    cookieOptions.sameSite = 'lax';   
  }

  res.cookie('token', token, cookieOptions);

  return token;
};

 What this does:
  Will grab the user from database, creates token for the user, inserts the token into a delicious cookie, and the user is now logged in if all authentication requiremnts match the database

# Managed states with middleware and thunks 
export const makeSpot = (data) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const spot = await response.json();
      dispatch(createSpot(spot));
      return spot;
    } else {
      const error = await response.json();
      return Promise.reject(error);
    }
  } catch (error) {
    console.error("Error in makeSpot thunk:", error);
    return Promise.reject(error);
  }
};

What this does:
  The component calls the makeSpot function, which passes in all of the spot data. Makes an HTTP request to the backend, backend processes and validates the user, if authorized, it will create the spot in the database, and returns the spot with an ID. If this all works, then the new date will be extracted, and redux store will be updated


# Star rating system
const makeStars = () => {
  const starsArray = [];
  for (let i = 1; i <= 5; i++) {
    starsArray.push(
      <span 
        key={i}
        className={`star ${i <= (hover || stars) ? 'filled' : 'empty'}`}
        onClick={() => handleStarClick(i)}
        onMouseEnter={() => starHover(i)}
        onMouseLeave={starLeave}
      >
        *
      </span>
    );
  }
  return (
    <div className="stars-container">
      {starsArray}
      <span>
        {stars > 0 ? stars + " Stars" : "Select star rating"}
      </span>
    </div>
  );
};


What it does:
used for interactive star rating system. When the mouse hovers over the stars on the review modal, you will see interactive hover elements, and when clicked, all the stars leading up to the one selected will stay highlighted. When the mouse leaves the star, the hover effect is no more

# Error Handling and Validations

const handleSubmit = async (event) => {
  event.preventDefault();
  
  if (review.length < 10) {
    setErrors({ review: "Tell us how you really feel... in 10 characters or more" });
    return;
  }
  
  if (stars === 0) {
    setErrors({ stars: "Must pick a star rating!" });
    return;
  }
  

  const validateSpot = [
    check('address').notEmpty().withMessage('Street address is required'),
    check('city').notEmpty().withMessage('City is required'),
    check('state').notEmpty().withMessage('State is required'),
    check('country').notEmpty().withMessage('Country is required'),
    check('name').isLength({ max: 50 }).withMessage('Name must be less than 50 characters'),
    check('price').isFloat({ min: 0 }).withMessage('Price per day must be a positive number')
  ];
 
 What this does:
 this provides both the client and server with validations and error messages that ensure the data is correct, and improve the experience for the user with messages directing them what the issue is and what they need to do to resolve it.




# Database Design
This is a relational database with proper associations:

Users → Spots (one-to-many) so users can have multiple spots

Spots → Reviews (one-to-many) so users can have multiple reviews

Spots → Images (one-to-many) so users can import more than 1 picture


User.hasMany(models.Spot, { 
  foreignKey: 'ownerId', 
  onDelete: 'CASCADE' 
});

Spot.belongsTo(models.User, { 
  foreignKey: 'ownerId', 
  as: 'Owner' 
});

Spot.hasMany(models.Review, { 
  foreignKey: 'spotId', 
  onDelete: 'CASCADE' 
});

Spot.hasMany(models.SpotImage, { 
  foreignKey: 'spotId', 
  onDelete: 'CASCADE' 
});

# Future additions

Later on, features for booking will be added, as well as the ability to update reviews. I would like to even integrate Google Maps api as well.

# Demo users log in info
Frodo Baggins
email: demo@user.io
username: Demo-lition
password: password

Jarvis Script
email: user1@user.io
username: FakeUser1
password: password2

Terry Dactyl
email: user2@user.io
username: FakeUser2
password: password3

You are able to log in with either Username or email, or feel free to create your own account!




