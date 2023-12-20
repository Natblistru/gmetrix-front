import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (

      <nav className="sb-sidenav accordionSide sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
            <div className="navSide">
                <div className="sb-sidenav-menu-heading">Core</div>
                <Link className="nav-linkSide" to="/admin/dashboard">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Dashboard
                </Link>
                <Link className="nav-linkSide" to="/admin/profile">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Profile
                </Link>
                <div className="sb-sidenav-menu-heading">Interface</div>
                <Link className="nav-linkSide collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                    Layouts
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </Link>
                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested navSide">
                        <Link className="nav-linkSide" to="layout-static.html">Static Navigation</Link>
                        <Link className="nav-linkSide" to="layout-sidenav-light.html">Light Sidenav</Link>
                    </nav>
                </div>
                <Link className="nav-linkSide collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                    Pages
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </Link>
                <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested navSide accordionSide" id="sidenavAccordionPages">
                        <Link className="nav-linkSide collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                            Authentication
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                            <nav className="sb-sidenav-menu-nested navSide">
                                <Link className="nav-linkSide" to="login.html">Login</Link>
                                <Link className="nav-linkSide" to="register.html">Register</Link>
                                <Link className="nav-linkSide" to="password.html">Forgot Password</Link>
                            </nav>
                        </div>
                        {/* Video */}
                        <Link className="nav-linkSide collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseVideo" aria-expanded="false" aria-controls="pagesCollapseVideo">
                            Videos
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="pagesCollapseVideo" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                            <nav className="sb-sidenav-menu-nested navSide">
                                <Link className="nav-linkSide" to="/admin/add-video">Add Video</Link>
                                <Link className="nav-linkSide" to="/admin/view-video">Videos</Link>
                                <Link className="nav-linkSide" to="/admin/add-breakpoint">Add Breakpoint</Link>
                                <Link className="nav-linkSide" to="/admin/view-breakpoint">Breakpoints</Link>
                            </nav>
                        </div>
                        {/* Teacher's */}
                        <Link className="nav-linkSide collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseTeachers" aria-expanded="false" aria-controls="pagesCollapseTeachers">
                            Teacher's
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="pagesCollapseTeachers" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                            <nav className="sb-sidenav-menu-nested navSide">
                                <Link className="nav-linkSide" to="/admin/add-teacher-topic">Add Teacher's Topics</Link>
                                <Link className="nav-linkSide" to="/admin/view-teacher-topic">Teacher's Topics</Link>
                            </nav>
                        </div>
                        <Link className="nav-linkSide collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                            Error
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                            <nav className="sb-sidenav-menu-nested navSide">
                                <Link className="nav-linkSide" to="401.html">401 Page</Link>
                                <Link className="nav-linkSide" to="404.html">404 Page</Link>
                                <Link className="nav-linkSide" to="500.html">500 Page</Link>
                            </nav>
                        </div>
                    </nav>
                </div>
                <div className="sb-sidenav-menu-heading">Addons</div>
                <Link className="nav-linkSide" to="charts.html">
                    <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                    Charts
                </Link>
                <Link className="nav-linkSide" to="tables.html">
                    <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                    Tables
                </Link>
            </div>
        </div>
        <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            Start Bootstrap
        </div>
      </nav>
    );

}

export default Sidebar;