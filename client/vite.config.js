import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(), // You're missing the react plugin
  ],
  server: {
    allowedHosts: [
      'kanban-board-1-5uko.onrender.com', // Remove https:// from hosts,
      'kanban-board-qwae.onrender.com',
      '0.0.0.0'
    ],
    port: 3001,
    open: true,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        // target: "https://localhost:3001",
        target: "https://kanban-board-1-5uko.onrender.com",
        changeOrigin: true,
        secure: false,
      },
      "/auth": {
        // target: "https://localhost:3001",
        target: "https://kanban-board-1-5uko.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    host: true,
    port: 3000,
  },
});


// export default defineConfig({
//   plugins: [
//     react(), // You're missing the react plugin
//     tailwindcss(),
//   ],
//   server: {
//     allowedHosts: [
//       'mov-api-e-client.onrender.com', // Remove https:// from hosts
//       'mov-api-e-server.onrender.com',
//       '0.0.0.0'
//     ],
//     port: 3001,
//     open: true,
//     host: "0.0.0.0",
//     proxy: {
//       "/api": {
//         target: "https://mov-api-e-server.onrender.com",
//         changeOrigin: true,
//         secure: false,
//       },
//       "/auth": {
//         target: "https://mov-api-e-server.onrender.com",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
//   preview: {
//     host: true,
//     port: 3000,
//   },
// });