import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Sử dụng base để đường dẫn tĩnh đúng
  build: {
    outDir: 'dist', // Vercel yêu cầu thư mục build là dist
  },
  server: {
    port: 3000, // Cấu hình cổng nếu cần khi chạy local
  },
});
