// src/redis/setup/index.ts
import { Redis } from 'ioredis';
import "dotenv/config";

// Create Redis client with proper error handling
const redis = new Redis({
    host: process.env.NEXT_PUBLIC_REDIS_HOST || 'localhost',
    port: Number(process.env.NEXT_PUBLIC_REDIS_PORT || 6379),
});

// Connection event handlers
redis.on('connect', () => {
    console.log('Redis client connected');
});

redis.on('error', (err) => {
    console.error('Redis client error:', err);
    // Don't crash the process on Redis connection errors
});

// Test the connection
async function testConnection() {
    try {
        await redis.ping();
        console.log('Successfully connected to Redis');
    } catch (error) {
        console.error('Failed to connect to Redis:', error);
    }
}

// Run the test connection
testConnection();

export { redis };