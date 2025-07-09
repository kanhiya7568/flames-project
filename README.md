# AyurVeda AI - Full Stack MERN Application

A comprehensive Ayurvedic health consultation platform powered by AI technology, built with the MERN stack.

## Features

- **AI-Powered Consultation**: Real-time chat with Gemini AI for personalized Ayurvedic advice
- **Dosha Assessment**: Interactive quiz to determine your Ayurvedic constitution
- **User Authentication**: Secure JWT-based authentication system
- **Responsive Design**: Mobile-first design with glass morphism effects
- **Review System**: User reviews and ratings for the platform
- **Modern UI/UX**: Smooth animations and intuitive interface

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Google Generative AI** - AI consultation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling with custom properties and animations
- **JavaScript (ES6+)** - Client-side logic
- **Font Awesome** - Icons

## Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd ayurveda-ai
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   \`\`\`env
   MONGODB_URI=mongodb://localhost:27017/ayurveda-ai
   JWT_SECRET=your-super-secret-jwt-key
   GEMINI_API_KEY=your-gemini-api-key
   PORT=5000
   NODE_ENV=development
   \`\`\`

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**
   \`\`\`bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   \`\`\`

6. **Access the application**
   Open your browser and navigate to `http://localhost:5000`

## Project Structure

\`\`\`
ayurveda-ai/
├── public/                 # Static files
│   ├── css/               # Stylesheets
│   ├── js/                # Client-side JavaScript
│   ├── index.html         # Homepage
│   ├── login.html         # Login page
│   ├── signup.html        # Registration page
│   └── consultation.html  # AI consultation page
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
└── README.md             # Project documentation
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/profile` - Get user profile

### Consultation
- `POST /api/consultation` - Send message to AI consultant

### Dosha Assessment
- `POST /api/dosha/submit` - Submit dosha quiz answers

### Reviews
- `GET /api/reviews` - Get reviews
- `POST /api/reviews` - Submit a review

### Contact
- `POST /api/contact` - Submit contact form

## Features in Detail

### AI Consultation
- Real-time chat interface with typing indicators
- Fallback responses when AI service is unavailable
- Session management for conversation history
- Quick question buttons for common queries

### Authentication System
- Secure JWT-based authentication
- Password hashing with bcryptjs
- Protected routes and middleware
- User session management

### Dosha Assessment
- Interactive quiz to determine Ayurvedic constitution
- Score calculation for Vata, Pitta, and Kapha
- Personalized recommendations based on results

### Responsive Design
- Mobile-first approach
- Glass morphism effects
- Smooth animations and transitions
- Accessible design patterns

## Security Features

- Helmet.js for security headers
- Rate limiting for API endpoints
- Input validation and sanitization
- CORS configuration
- JWT token expiration
- Password hashing

## Development

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (placeholder)

### Environment Variables
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `GEMINI_API_KEY` - Google Gemini AI API key
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

## Deployment

1. **Set up production environment variables**
2. **Configure MongoDB Atlas or production database**
3. **Deploy to your preferred platform** (Heroku, Vercel, etc.)
4. **Update CORS settings** for production domain

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.

## Acknowledgments

- Ancient Ayurvedic wisdom and practitioners
- Google Gemini AI for consultation capabilities
- Open source community for tools and libraries
- Created with ❤️ by Kanhiya Singh
\`\`\`
