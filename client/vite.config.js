import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(), // ✅ Ensures React is properly loaded
  ],
  server: {
    port: 3000, // ✅ Keep frontend on 3000
    open: true,
    host: "0.0.0.0",
    hmr: {
      protocol: "ws",
      host: "localhost",
    },
    allowedHosts: [
      "localhost",
      "kanban-board-qwae.onrender.com",
    ],
    proxy: {
      "/api": {
        target: "https://kanban-board-qwae.onrender.com", // ✅ Online backend
        changeOrigin: true,
        secure: true, // 🔹 If the API uses HTTPS, this should be true
      },
      "/auth": {
        target: "https://kanban-board-qwae.onrender.com",
        changeOrigin: true,
        secure: true, // 🔹 Match the target API security
      },
    },
  },
  preview: {
    host: true,
    port: 3000,
  },
});




// import { defineConfig } from 'vite';
// // https://vitejs.dev/config/
// export default defineConfig({
//     server: {
//         port: 3000,
//         open: true,
//         proxy: {
//             '/api': {
//                 target: 'http://localhost:3001',
//                 changeOrigin: true,
//                 secure: false,
//             },
//             '/auth': {
//                 target: 'http://localhost:3001',
//                 changeOrigin: true,
//                 secure: false
//             },
//         },
//     },
// });










// export default defineConfig({
//     plugins: [
//       react(), // You're missing the react plugin
//     tailwindcss(),
//     ],
//     server: {
//     allowedHosts: [
//         'localhost:3001', // Remove https:// from hosts
//         'localhost:3001',
//         '0.0.0.0'
//     ],
//     port: 3001,
//     open: true,
//     host: "0.0.0.0",
//     proxy: {
//         "/api": {
//         target: "https://kanban-board-qwae.onrender.com",
//         changeOrigin: true,
//         secure: false,
//         },
//         "/auth": {
//         target: "https://kanban-board-qwae.onrender.com",
//         changeOrigin: true,
//         secure: false,
//         },
//     },
//     },
//     preview: {
//     host: true,
//     port: 3000,
//     },
// });

