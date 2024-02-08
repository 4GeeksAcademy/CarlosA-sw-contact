import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import injectContext from "./store/appContext";

import { NavegationBar } from "./component/navbar";
import { Footer } from "./component/footer";
import { ContactList } from "./views/ContactList.jsx";
import { ContactDetails } from "./views/ContactDetails.jsx"
import { Home } from "./views/Home.jsx";
import { SWInfo } from "./views/SWInfo.jsx";
import { SWDetails } from "./views/SWDetails.jsx";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="bg-dark-subtle">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<NavegationBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/sw/:category" element={<SWInfo />} />
						<Route path="/sw/:category/:id" element={<SWDetails />} />
						<Route path="/contact" element={<ContactList />} />
						<Route path="/details/:id/:mode" element={<ContactDetails />} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
