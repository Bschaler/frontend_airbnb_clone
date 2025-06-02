Rentrify

Live: https://brian-auth-me.onrender.com/
Git: https://github.com/Bschaler/frontend_airbnb_clone



ABOUT:

Rentrify is a full stack airbnb like clone, that offers the ability to create a profile, list your home, review other rentals, etc.


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

  res.cookie('token', token, {
    maxAge: expiresIn * 1000,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
    path: '/'
  });

  return token;
};


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
        ★
      </span>
    );
  }
  return (
    <div className="stars-container">
      {starsArray}
      <span>
        {stars > 0 ? `${stars} Stars` : "Select star rating"}
      </span>
    </div>
  );
};

# Speaking of stars... 

function CreateReview({spotId}){
   const [review, setReview] = useState("");
   const [stars, setStars] = useState(0);
   const [hover, setHover] = useState(0);
   const [errors, setErrors] = useState({});

   const handleStarClick = (rating) => {
       setStars(rating);
   };

   const starHover = (rating) => {
       setHover(rating);
   };

   const starLeave = () => {
       setHover(0);
   };
}







# Database Design
This is a relational database with proper associations:

Users → Spots (one-to-many) so users can have multiple spots

Spots → Reviews (one-to-many) so users can have multiple reviews

Spots → Images (one-to-many) so users can import more than 1 picture



