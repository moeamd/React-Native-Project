import 'dotenv/config';

export const env = {
  PORT: process.env.PORT || 2000,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  SWAGGER_SERVER_URL:
    process.env.SWAGGER_SERVER_URL || `http://localhost:${process.env.PORT || 2000}/api`,
};

