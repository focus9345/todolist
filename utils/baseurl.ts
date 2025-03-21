// Base URL
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE_URL) {
  throw new Error('Please define the NEXT_PUBLIC_BASE_URL environment variable');
} 
export default BASE_URL;