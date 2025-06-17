require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiryTime: process.env.JWT_EXPIRY_TIME || '7d',
  
  // Cookie settings
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    domain: process.env.COOKIE_DOMAIN || 'localhost',
    path: '/',
    maxAge: parseInt(process.env.COOKIE_MAX_AGE) || 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
  },

  // CORS settings
  cors: {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000'],
    credentials: true,
    methods: process.env.ALLOWED_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200
  },

  // API settings
  api: {
    prefix: process.env.API_PREFIX || '/api'
  },

  // Client URL
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000'
};

module.exports = config; 