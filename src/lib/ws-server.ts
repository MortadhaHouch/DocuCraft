import { Server } from '@hocuspocus/server';
import { SQLite } from '@hocuspocus/extension-sqlite';
import { Logger } from '@hocuspocus/extension-logger';
import "dotenv/config"
// Configure the server
const server = new Server({
  port: parseInt(process.env.NEXT_PUBLIC_SOCKET_PORT || "1234"),
  extensions: [
    new SQLite(),
    new Logger(),
  ],
  onListen: async () => {
    console.log(`✅ Hocuspocus server is running on ${process.env.NEXT_PUBLIC_SOCKET_URL}`);
  },
  onRequest: async ({ request }) => {
    console.log('📡 Request:', request.url);
  },
  onConnect: async () => {
    console.log('🔌 Client connected');
  },
  onDisconnect: async () => {
    console.log('❌ Client disconnected');
  },
});

// Start the server
server.listen().catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('🛑 Shutting down Hocuspocus server...');
  server.destroy().then(() => {
    console.log('✅ Hocuspocus server stopped');
    process.exit(0);
  });
});