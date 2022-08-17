import React from 'react';
import './menu.css';
import './menuScript';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
const Navbar = () => {
    return (
        <Router>
            <div className="vertical-nav bg-white" id="sidebar">
                <div className="py-4 px-3 mb-4 bg-light">
                    <div className="media d-flex align-items-center">
                        <div className="media-body">
                            <h4 className="m-0">Jason Doe</h4>
                            <p className="font-weight-light text-muted mb-0">Web developer</p>
                        </div>
                    </div>
                </div>

                <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Main</p>

                <ul className="nav flex-column bg-white mb-0">
                    <li className="nav-item">
                        <a href="#" className="nav-link text-dark font-italic bg-light">
                            <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="./novaPagina" className="nav-link text-dark font-italic">
                            <i className="fa fa-address-card mr-3 text-primary fa-fw"></i>
                            About
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-dark font-italic">
                            <i className="fa fa-cubes mr-3 text-primary fa-fw"></i>
                            Services
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-dark font-italic">
                            <i className="fa fa-picture-o mr-3 text-primary fa-fw"></i>
                            Gallery
                        </a>
                    </li>
                </ul>

                <p className="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">Charts</p>

                <ul className="nav flex-column bg-white mb-0">
                    <li className="nav-item">
                        <a href="#" className="nav-link text-dark font-italic">
                            <i className="fa fa-area-chart mr-3 text-primary fa-fw"></i>
                            Area charts
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-dark font-italic">
                            <i className="fa fa-bar-chart mr-3 text-primary fa-fw"></i>
                            Bar charts
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-dark font-italic">
                            <i className="fa fa-pie-chart mr-3 text-primary fa-fw"></i>
                            Pie charts
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-dark font-italic">
                            <i className="fa fa-line-chart mr-3 text-primary fa-fw"></i>
                            Line charts
                        </a>
                    </li>
                </ul>
            </div>

            <div className="page-content p-5" id="content">
                <button id="sidebarCollapse" type="button" className="btn btn-light bg-white rounded-pill shadow-sm px-4 mb-4"><i className="fa fa-bars mr-2"></i><small className="text-uppercase font-weight-bold">Toggle</small></button>

                <h2 className="display-4 text-white">Bootstrap vertical nav</h2>
                <p className="lead text-white mb-0">Build a fixed sidebar using Bootstrap 4 vertical navigation and media objects.</p>
                <p className="lead text-white">Snippet by <a href="https://bootstrapious.com/snippets" className="text-white">
                    <u>Bootstrapious</u></a>
                </p>
                <div className="separator"></div>
                <div className="row text-white">
                    <div className="col-lg-7">
                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor.
                        </p>
                        <div className="bg-white p-5 rounded my-5 shadow-sm">
                            <p className="lead font-italic mb-0 text-muted">"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                        </div>
                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor.
                        </p>
                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor.
                        </p>
                    </div>
                    <div className="col-lg-5">
                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor.
                        </p>
                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor.
                        </p>
                    </div>
                </div>

            </div>
        </Router>
    );
}

export default Navbar;