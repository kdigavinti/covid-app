import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import $ from "jquery";
import { useEffect } from "react";
import AGT_MCN_LOGO from "../assets/images/results/agt-mcn-logo.png";
import AGT_LOGO from "../assets/images/results/agt-logo.png";
import Dropdown from "react-bootstrap/Dropdown";
//import DOC_IMG from "../assets/images/doctors/doctor-thumb-02.jpg";
import DOC_IMG from "../assets/images/doctors/doctor-013.jpg";

const Header = (props) => {
	let pathnames = window.location.pathname;

	const [active, setActive] = useState(false);
	const url = pathnames.split("/").slice(0, -1).join("/");

	const onHandleMobileMenu = () => {
		var root = document.getElementsByTagName("html")[0];
		root.classList.add("menu-opened");
	};

	const onhandleCloseMenu = () => {
		var root = document.getElementsByTagName("html")[0];
		root.classList.remove("menu-opened");
	};

	window.onbeforeunload = function() {
		localStorage.clear();
	 }

	useEffect(() => {
	  $(".main-nav a").on("click", function (e) {
	    if ($(this).parent().hasClass("has-submenu")) {
	      e.preventDefault();
	    }
	    if (!$(this).hasClass("submenu")) {
	      $("ul", $(this).parents("ul:first")).slideUp(350);
	      $("a", $(this).parents("ul:first")).removeClass("submenu");
	      $(this).next("ul").slideDown(350);
	      $(this).addClass("submenu");
	    } else if ($(this).hasClass("submenu")) {
	      $(this).removeClass("submenu");
	      $(this).next("ul").slideUp(350);
	    }
	  });
	}, []);

	//  console.log("sreevidhya "+url+" "+pathnames)
	return (
		<header className="header">
			<nav className="navbar navbar-expand-lg header-nav">
				<div className="navbar-header">
					<a href="#0" id="mobile_btn" onClick={() => onHandleMobileMenu()}>
						<span className="bar-icon">
							<span></span>
							<span></span>
							<span></span>
						</span>
					</a>
					<Link
						to="/home"
						className="navbar-brand "
						style={{ marginRight: "100px" }}
					>
						<img
							src={AGT_MCN_LOGO}
							width="400"
							height="45"
							object-fit="cover"
							alt=""
						/>
					</Link>
				</div>
				<div className="main-menu-wrapper">
					<div className="menu-header">
						<Link to="/home" className="menu-logo">
							<img
								src={AGT_MCN_LOGO}
								width="400"
								height="45"
								object-fit="cover"
								alt=""
							/>
						</Link>
						<a
							href="/home"
							id="menu_close"
							className="menu-close"
							onClick={() => onhandleCloseMenu()}
						>
							<i className="fas fa-times"></i>
						</a>
					</div>
					{/* <ul className="main-nav">
						<li className={pathnames.includes("/home") ? "active" : ""}>
							<Link to="/home">Home</Link>
						</li>
						<li className={`has-submenu ${
								url.includes("/patientportal") ? "active" : ""
							}`}		>
							<a href="/patientportal" className="top-nav-button">
								{" "}
								View My Results{" "}
							</a>
						</li>
						<li className={`has-submenu ${
								url.includes("/clinic") ? "active" : ""
							}`}
						>
							<a href="/clinic" className="top-nav-button">
								{" "}
								Clinic Login{" "}
							</a>
						</li>
					</ul> */}
				</div>
				<ul className="nav header-navbar-rht">
						<li className="nav-item">
							<a href="/patientportal" className="top-nav-button">
								{" "}
								View My Results{" "}
							</a>
						</li>{" "}
						<li className="nav-item">
							<a href="/clinic" className="top-nav-button">
								{" "}
								Clinic Login{" "}
							</a>
						</li>{" "}
						<li className="nav-item">
							<a href="/patientsignup" className="top-nav-button">
								{" "}
								Patient SignUp{" "}
							</a>
						</li>{" "}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
