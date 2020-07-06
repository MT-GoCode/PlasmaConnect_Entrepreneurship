import React, { Component } from 'react';
import { Container, Row, Col, Media, Form, FormGroup, Input, Label, Alert, Button, Card, CardBody } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
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
                                    <h4 className="title">(WIP) Request Eligibility as a Donor</h4>
                                    <div className="page-next">
                                        <nav className="d-inline-block">
                                         </nav>
                                    </div>
                                </div>
                            </Col>  
                        </Row>
                        <center>
                        <div style = {{width:"50%"}} className="cover-user-img d-flex align-items-center">
                            <Row>
                                <Col xs={12}>
                                    <Card className="login_page border-0" style={{zIndex:1}}>
                                        <CardBody className="p-0">
                                            {/* <h4 className="card-title text-center">Sign up as a donor</h4> */}
                                        <AvForm className="login-form mt-4">
                                            <Row>
                                            <Col md="6">
                                                    <FormGroup className="position-relative">
                                                        <Label for="firstname">First name <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="user" className="fea icon-sm icons" /></i>
                                                        <AvField type="text" className="form-control pl-5" name="firstname" id="firstname" placeholder="First Name" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter first name"},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup className="position-relative">
                                                        <Label for="lastname">Last name <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="user-check" className="fea icon-sm icons" /></i>
                                                        <AvField type="text" className="form-control pl-5" name="lastname" id="lastname" placeholder="Last Name" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter first name"},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="12">
                                                    <FormGroup className="position-relative">
                                                        <Label for="email">Your Email <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="mail" className="fea icon-sm icons" /></i>
                                                        <AvField type="text" className="form-control pl-5" name="email" id="email" placeholder="Enter Email" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter your email"},
                                                                pattern: {value: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$', errorMessage: 'E-Mail is not valid!'},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md="12">
                                                    <FormGroup className="position-relative">
                                                        <Label for="phone">Phone <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="phone" className="fea icon-sm icons" /></i>
                                                        <AvField type="phone" className="form-control pl-5" name="phone" id="phone" placeholder="Enter phone number" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter your phone number"},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md="12">
                                                    <FormGroup className="position-relative">
                                                        <Label for="streetaddress">Street Address <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="home" className="fea icon-sm icons" /></i>
                                                        <AvField type="text" className="form-control pl-5" name="streetaddress" id="streetaddress" placeholder="Enter address" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter your address"},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md="12">
                                                    <FormGroup className="position-relative">
                                                        <Label for="city">City <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="home" className="fea icon-sm icons" /></i>
                                                        <AvField type="text" className="form-control pl-5" name="city" id="city" placeholder="Enter city" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter your city"},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md="12">
                                                    <FormGroup className="position-relative">
                                                        <Label for="state">State <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="home" className="fea icon-sm icons" /></i>
                                                        <AvField type="text" className="form-control pl-5" name="state" id="state" placeholder="Enter state" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter your state"},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md="12">
                                                    <FormGroup className="position-relative">
                                                        <Label for="zip">Zip <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="home" className="fea icon-sm icons" /></i>
                                                        <AvField type="number" className="form-control pl-5" name="zip" id="zip" placeholder="Enter zip" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter your zip code"},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md="12">
                                                    <FormGroup className="position-relative">
                                                        <Label for="bloodtype">Blood Type <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="heart" className="fea icon-sm icons" /></i>
                                                        <AvField type="text" className="form-control pl-5" name="bloodtype" id="bloodtype" placeholder="Enter blood type" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter your blood type"},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md="12">
                                                    <FormGroup className="position-relative">
                                                        <Label for="releaseform">Release form <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="file" className="fea icon-sm icons" /></i>
                                                        <AvField type="file" className="form-control pl-5" name="releaseform" id="releaseform" placeholder="Please upload your hospital release form" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please upload your form"},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md="12">
                                                    <FormGroup>
                                                        <div className="custom-control custom-checkbox">
                                                            <Input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                                            <Label className="custom-control-label" for="customCheck1">I Accept <Link to="#" className="text-primary">Terms And Conditions</Link></Label>
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col md="12" className="mb-0">
                                                    <Button color="primary" block>Request Eligibility</Button>
                                                </Col>
                                                {/* <Col lg="12" className="mt-4 text-center">
                                                    <h6>Or Signup With</h6>
                                                    <ul className="list-unstyled social-icon mb-0 mt-3">
                                                    <li className="list-inline-item"><Link to="#" className="rounded mr-1"><i><FeatherIcon icon="facebook" className="fea icon-sm fea-social" /></i></Link></li>
                                                    <li className="list-inline-item"><Link to="#" className="rounded mr-1"><i><FeatherIcon icon="github" className="fea icon-sm fea-social" /></i></Link></li>
                                                    <li className="list-inline-item"><Link to="#" className="rounded mr-1"><i><FeatherIcon icon="twitter" className="fea icon-sm fea-social" /></i></Link></li>
                                                    <li className="list-inline-item"><Link to="#" className="rounded"><i><FeatherIcon icon="gitlab" className="fea icon-sm fea-social" /></i></Link></li>
                                                    </ul>
                                                </Col> */}
                                                {/* <Col className="mx-auto">
                                                    <p className="mb-0 mt-3"><small className="text-dark mr-2">Already have an account ?</small> <Link to="/auth-cover-login" className="text-dark font-weight-bold">Sign Up</Link></p>
                                                </Col> */}
                                            </Row>
                                        </AvForm>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                        </center>
                </section>
                
            </React.Fragment>

            <section className="section">

            
        </section>
            </React.Fragment>
        );
    }
}

export default HelpCenterSupportRequest;
