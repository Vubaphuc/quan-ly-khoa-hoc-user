import React from "react";
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="header d-flex align-items-center">
      <div className="container">
        <div className="d-flex justify-content-start align-items-center">
          <div className="logo">
            <Link to={"/khoa-hoc"}>
              <img
                src="https://techmaster.vn/resources/image/logo-techmaster/white/white_200x74.png"
                alt="logo"
              />
            </Link>
          </div>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <div className="menu">
              <Link
                to={"/khoa-hoc/onlab"}
                className="text-white text-uppercase ms-5"
              >
                Phòng lab
              </Link>
              <Link
                to={"/khoa-hoc/online"}
                className="text-white text-uppercase ms-3"
              >
                Trực tuyến
              </Link>
            </div>
            <div className="cart">
              <a className="text-white position-relative" href="/gio-hang">
                <span className="fs-5">
                  <i className="fa-solid fa-cart-shopping"></i>
                </span>
                <span className="cart-count bg-info px-1 rounded-2 position-absolute">
                  0
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
