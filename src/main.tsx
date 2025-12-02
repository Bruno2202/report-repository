import './style.css'
import { Home } from './pages/Home'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router';
import ModalProvider from './contexts/ModalContext';
import SearchProvider from './contexts/SearchContext';
import ReportProvider from './contexts/ReportContext';
import { Toaster } from 'react-hot-toast';

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
	<ModalProvider>
		<ReportProvider>
			<SearchProvider>
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={
								<Home />
							}
						/>
					</Routes>
					<Toaster
						position="top-center"
						reverseOrder={false}
						toastOptions={{
							duration: 2300,
							style: {
								backgroundColor: "var(--color-aside-dark)",
								border: "1px solid var(--color-border-dark)",
								color: "white",
								fontFamily: "'Inter'",
								fontWeight: "500",
								padding: "12px 16px",
								borderRadius: "8px",
								boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
							},
							success: {
								iconTheme: {
									primary: "var(--color-success)",
									secondary: "#ffffff",
								},
							},
							error: {
								iconTheme: {
									primary: "var(--color-error)",
									secondary: "#ffffff",
								},
							},
						}}
					/>
				</BrowserRouter>
			</SearchProvider>
		</ReportProvider>
	</ModalProvider>
);