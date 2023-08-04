import React from "react";
import Link from "next/link";

function Header() {
  return (
    <div className=" sticky-top shadow" id="header">
      <nav className="navbar navbar-expand-lg pb-0 navbar-white bg-white container header">
        <div className="d-flex justify-content-between p-2">
          <a className="navbar-brand" href="/">
            <div className="d-flex" id="logo">
              <img
                src={'/assets/images/logo.svg'}
                height={"30px"}
                className="logo-img"
                alt="logo"
              />
            </div>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* <span className="navbar-toggler-icon"></span> */}
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        <div
          className="collapse navbar-collapse nav-item-lg"
          id="navbarSupportedContent"
        >
          <div className="d-flex nav-responsive">
            <div>
              <label className="nav-elelment">
                <Link href="/mijn-abbo-stop" className="text-decoration-none">
                  <span>Mijn Abbo Stop</span>
                </Link>
              </label>
            </div>
            <div>
              <label className="nav-elelment">
                <Link href="/categorieen" className="text-decoration-none">
                  <span>Categorieën</span>
                </Link>
              </label>
            </div>
            <div>
              <label className="nav-elelment">
                <Link href="/contact" className="text-decoration-none">
                  <span>Contact</span>
                </Link>
              </label>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
