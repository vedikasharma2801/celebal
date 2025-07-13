// backend/config/config.js
import dotenv from 'dotenv';
import path from 'path';

// This line loads the .env file from the root of the 'backend' folder
dotenv.config({ path: path.resolve(process.cwd(), '.env') });