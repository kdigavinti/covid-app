import React from "react";
import ReactDOM from "react-dom";

import AppRouter from "./approuter";
// import * as serviceWorker from './client/serviceWorker';

// boostrap
import "bootstrap/dist/css/bootstrap.min.css";
//fontawesome
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "react-image-lightbox/style.css";
import "react-datepicker/dist/react-datepicker.css";
//carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AppResults from "./appresults";

// if (
// 	!window.location.pathname.includes("admin") ||
// 	!window.location.pathname.includes("pharmacyadmin")
// ) {
// 	require("./client/assets/css/all.css");
// 	require("./client/assets/css/all.min.css");
// 	require("./client/assets/css/fontawesome.min.css");
// 	require("./client/assets/css/style.css");
// 	require("./client/assets/js/script.js");
// }

// ReactDOM.render(<AppRouter />, document.getElementById("root"));   by p- commented as this is for appcontainer now checking for appresults page


ReactDOM.render(<AppResults />, document.getElementById("root"));

// if (module.hot) {
// 	// enables hot module replacement if plugin is installed
// 	module.hot.accept();
// }
