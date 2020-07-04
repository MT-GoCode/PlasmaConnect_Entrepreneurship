import React, { Component } from 'react';
import { Container, Row, Col, Media, Form, FormGroup, Input, Label, Alert } from 'reactstrap';
import { Link } from "react-router-dom";

//Import Icons
import FeatherIcon from 'feather-icons-react';

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";

class HelpCenterSupportRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathItems : [
                //id must required
                { id : 1, name : "Landrick", link : "/index" },
                { id : 2, name : "Help Center", link : "#" },
                { id : 3, name : "Support" },
            ],
            isOpen : false
        }
        this.handleSubmit.bind(this);
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.setState({isOpen : true})
    }

    componentDidMount() {
        window.addEventListener("scroll", this.scrollNavigation, true);
    }

    // Make sure to remove the DOM listener when the component is unmounted.
    componentWillUnmount() {
        window.removeEventListener("scroll",this.scrollNavigation, true);
    }

    scrollNavigation = () => {
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        if (top > 80) {
            document.getElementById('topnav').classList.add('nav-sticky');
        }
        else {
            document.getElementById('topnav').classList.remove('nav-sticky');
        }
    }

    render() {
        return (
            <React.Fragment>
                {/* breadcrumb */}
                <React.Fragment>
                <section className="bg-half bg-light d-table w-100">
                        <Row className="justify-content-center">
                            <Col lg="12" className="text-center">
                                <div className="page-next-level">
                                    <h4 className="title">Join Us!</h4>
                                    <div className="page-next">
                                        <nav className="d-inline-block">
                                         </nav>
                                    </div>
                                </div>
                            </Col>  
                        </Row>

                        
                        <Container style={{paddingTop: 25}}> 
                            <div className="rounded bg-primary p-lg-5 p-4">
                                <Row className="align-items-end">
                                    <Col md="8">
                                        <div className="section-title text-md-left text-center">
                                            <h4 className="title mb-3 text-white title-dark">Donor</h4>
                                            <p style = {{color: 'white'}}>As a donor...</p>
                                        </div>
                                    </Col>
                                    
                                    <Col md="4" className="mt-4 mt-sm-0">
                                        <div className="text-md-right text-center">
                                            <Link to="/donorSignUp" className="btn btn-light">Sign Up</Link>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Container>


                        <Container style={{paddingTop: 25}}>
                            <div className="rounded bg-primary p-lg-5 p-4">
                                <Row className="align-items-end">
                                    <Col md="8">
                                        <div className="section-title text-md-left text-center">
                                            <h4 className="title mb-3 text-white title-dark">Hospital</h4>
                                            <p style = {{color: 'white'}}>As a Hospital...</p>
                                        </div>
                                    </Col>
                                    
                                    <Col md="4" className="mt-4 mt-sm-0">
                                        <div className="text-md-right text-center">
                                            <Link to="#" className="btn btn-light">Sign Up</Link>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Container>

                        <Container style={{paddingTop: 25}}>
                            <div className="rounded bg-primary p-lg-5 p-4">
                                <Row className="align-items-end">
                                    <Col md="8">
                                        <div className="section-title text-md-left text-center">
                                            <h4 className="title mb-3 text-white title-dark">Plasma Collection Center</h4>
                                            <p style = {{color: 'white'}}>As a Plasma Collection Center...</p>
                                        </div>
                                    </Col>
                                    
                                    <Col md="4" className="mt-4 mt-sm-0">
                                        <div className="text-md-right text-center">
                                            <Link to="#" className="btn btn-light">Sign Up</Link>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Container>

                        <Container style={{paddingTop: 25}} >
                            <div className="rounded bg-primary p-lg-5 p-4">
                                <Row className="align-items-end">
                                    <Col md="8">
                                        <div className="section-title text-md-left text-center">
                                            <h4 className="title mb-3 text-white title-dark">Pharmaceutical R&D Company</h4>
                                            <p style = {{color: 'white'}}>As a Pharmaceutical R&D Company...</p>
                                        </div>
                                    </Col>
                                    
                                    <Col md="4" className="mt-4 mt-sm-0">
                                        <div className="text-md-right text-center">
                                            <Link to="#" className="btn btn-light">Sign Up</Link>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                </section>
                
            </React.Fragment>
{/* 
            <section className="section">

            
        </section> */}
            </React.Fragment>
        );
    }
}

export default HelpCenterSupportRequest;