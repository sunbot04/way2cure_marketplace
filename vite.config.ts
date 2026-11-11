import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Note: `npm run build` forces NODE_ENV=production (via cross-env) so a machine-wide
// NODE_ENV=development cannot leak React's development build into production.
export default defineConfig({
  plugins: [react()],
});
