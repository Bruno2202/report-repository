import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
	server: {
		https: false,
	},
	plugins: [
		react(),
		tailwindcss(),
		mkcert()
	],
})