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
                <div className="sb-sidenav-menu-heading">Interface</div>
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
                                <Link className="nav-linkSide" to="/admin/login">Login</Link>
                                <Link className="nav-linkSide" to="/admin/register">Register</Link>
                                <Link className="nav-linkSide" to="/admin/forgot-password">Forgot Password</Link>
                                <Link className="nav-linkSide" to="/admin/reset-password">Reset Password</Link>

                            </nav>
                        </div>

            
                        <Link className="nav-linkSide collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                            Error
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                            <nav className="sb-sidenav-menu-nested navSide">
                                <Link className="nav-linkSide" to="/admin/403">403 Page</Link>
                                <Link className="nav-linkSide" to="/admin/404">404 Page</Link>

                            </nav>
                        </div>
                    </nav>
                </div>



                <Link className="nav-linkSide collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseTables" aria-expanded="false" aria-controls="collapseTables">
                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                    Tables
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </Link>
                <div className="collapse" id="collapseTables" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested navSide accordionSide" id="sidenavAccordionTables">
                        <Link className="nav-linkSide collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#tablesCollapseVideo" aria-expanded="false" aria-controls="tablesCollapseVideo">
                            Videos
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="tablesCollapseVideo" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionTables">
                            <nav className="sb-sidenav-menu-nested navSide">
                            <Link className="nav-linkSide" to="/admin/view-video">Videos</Link>
                            <Link className="nav-linkSide" to="/admin/view-breakpoint">Breakpoints</Link>
                            </nav>
                        </div>

                        {/* Teacher's */}
                        <Link className="nav-linkSide collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#tablesCollapseTeachers" aria-expanded="false" aria-controls="tablesCollapseTeachers">
                            Teacher's
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="tablesCollapseTeachers" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordionTables">
                            <nav className="sb-sidenav-menu-nested navSide">
                                <Link className="nav-linkSide" to="/admin/view-teacher-topic">Teacher's Topics</Link>
                                <Link className="nav-linkSide" to="/admin/view-subtopic">Teacher's Subopics</Link>
                                <Link className="nav-linkSide" to="/admin/view-subtopic-image">Subopic Images</Link>
                                <Link className="nav-linkSide" to="/admin/view-teacher-video">Teacher's Videos</Link>
                                <Link className="nav-linkSide" to="/admin/view-flip-card">Teacher's Flip Cards</Link>
                            </nav>
                        </div>

                        {/* Evaluation's */}
                        <Link className="nav-linkSide collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#tablesCollapseEvaluation" aria-expanded="false" aria-controls="tablesCollapseEvaluation">
                            Evaluation's
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="tablesCollapseEvaluation" aria-labelledby="headingThree" data-bs-parent="#sidenavAccordionTables">
                            <nav className="sb-sidenav-menu-nested navSide">
                                <Link className="nav-linkSide" to="/admin/view-evaluation">Evaluations</Link>
                                <Link className="nav-linkSide" to="/admin/view-evaluation-subject">Evaluation Subjects</Link>
                                <Link className="nav-linkSide" to="/admin/view-evaluation-source">Evaluation Sources</Link>
                                <Link className="nav-linkSide" to="/admin/view-evaluation-subject-source">Evaluation Subject Sources</Link>                           
                                <Link className="nav-linkSide" to="/admin/view-evaluation-item">Evaluation Items</Link>     
                                <Link className="nav-linkSide" to="/admin/view-evaluation-answer">Evaluation Answers</Link>                            
                                <Link className="nav-linkSide" to="/admin/view-evaluation-option">Evaluation Options</Link>                             
                                <Link className="nav-linkSide" to="/admin/view-evaluation-answer-option">Evaluation Answer Options</Link>                               
                                <Link className="nav-linkSide" to="/admin/view-evaluation-form-page">Evaluation Form Pages</Link>  
                            </nav>
                        </div>

                        {/* Test's */}
                        <Link className="nav-linkSide collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#tablesCollapseTest" aria-expanded="false" aria-controls="tablesCollapseTest">
                            Test's
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="tablesCollapseTest" aria-labelledby="headingFour" data-bs-parent="#sidenavAccordionTables">
                            <nav className="sb-sidenav-menu-nested navSide">
                                <Link className="nav-linkSide" to="/admin/view-test-item">Test Items</Link>
                                <Link className="nav-linkSide" to="/admin/view-test-item-column">Test Columns</Link>
                                <Link className="nav-linkSide" to="/admin/view-test-item-option">Test Options</Link>
                                <Link className="nav-linkSide" to="/admin/view-formative-test">Formative Tests</Link>   
                                <Link className="nav-linkSide" to="/admin/view-formative-test-item">Formative Test Items</Link>   
                                {/* <Link className="nav-linkSide" to="/admin/view-summative-test">Summative Tests</Link>    */}  
                                <Link className="nav-linkSide" to="/admin/view-summative-test-item">Summative Test Items</Link>                  
                            </nav>
                        </div>
                    </nav>
                </div>
            </div>
        </div>

        <div className="sb-sidenav-footer">
        </div>
      </nav>
    );

}

export default Sidebar;