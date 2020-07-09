import React, { Component } from 'react';
import { Container, Row, Col, Media, Form, FormGroup, Input, Label, Alert, Button, Card, CardBody, A } from 'reactstrap';
import { AvForm, AvField, AvRadio, AvRadioGroup } from 'availity-reactstrap-validation';
import { Link } from "react-router-dom";
import axios from 'axios';
import Select from 'react-select'

//Import Icons
import FeatherIcon from 'feather-icons-react';

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";

const options = [ // definintely implement live search for hospitals later with the api - react-select provides async search
    { value: '5793230', label: 'CENTRAL VALLEY GENERAL HOSPITAL 1025 NORTH DOUTY STREET' },
    { value: '53391362', label: 'LOS ROBLES HOSPITAL & MEDICAL CENTER - EAST CAMPUS 150 VIA MERIDA' },
    { value: '11190023', label: 'EAST LOS ANGELES DOCTORS HOSPITAL' }
  ]


class CenterSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathItems : [
                //id must required
                { id : 1, name : "Landrick", link : "/index" },
                { id : 2, name : "Help Center", link : "#" },
                { id : 3, name : "Support" },
            ],
            submitMessage: false,
            isOpen : false,
            CenterID: null,
            options: []
        }
        this.handleSubmit.bind(this);
        this.handleIDChange.bind(this);
    }
    
    componentWillMount = () => {
        // axios.post('/getcenters')
        // .then(res => {
        //     let centers = res.data.markers.marker
        //     let toState = centers.map((center) => {
        //         return {
        //             value: center.name + ' - '+ center.address,
        //             label: center.name + ' - '+ center.address}
        //     })
        //     this.setState({options: toState})
        // });

        // not using http://localhost:4000/getcenters nor https://plasmaconnect.herokuapp.com:4000/getcenters - second one xml needs to be deciphered, rather not

        // axios.post('https://plasmaconnect.herokuapp.com:4000/getcenters')
        // .then(res => {
        //     console.log(res)
        //     console.log(res.data)
        // });

        // axios.get('/').then(res => {
        //     console.dir(res)
        //     console.dir(res.data)
        // });
        
        
    }
    handleIDChange = center => {
        // console.log()
        this.setState(
          {CenterID: center}
        );
      };

    handleValidSubmit = (e,values) => {
        values.CenterID = this.state.CenterID.value
        console.log(values)
    //     axios.post('http://localhost:4000/donorQueue/create-donor-queue', values)
    //   .then(res => {
    //         console.log(res.data);
    //         // let final = [res.data[res.data.length - 2], res.data[res.data.length - 3]];

    //         this.setState({
    //             donors: res.data
    //         })
    //     });
        this.setState({submitMessage: true})
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
                                    <h4 className="title">Register your Plasma Donation Center</h4>
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
                                        <AvForm onValidSubmit = {this.handleValidSubmit} className="login-form mt-4">
                                            <Row>
                                            <Col md="12" className="mb-0">
                                                <Alert isOpen={this.state.submitMessage} toggle={() => this.setState({submitMessage : false})} color="primary" >
                                                    Thank you! We will get back to you soon via email regarding your account creation.
                                                </Alert>
                                                </Col>
                                                <Col md="12">
                                                <FormGroup className="position-relative">
                                                        <Label for="CenterID">Plasma Donation Name and Address <span className="text-danger">*</span></Label>
                                                        {/* <i><FeatherIcon icon="user" className="fea icon-sm icons" /></i> */}
                                                        <Select options={this.state.options} value={this.state.CenterID} onChange = {this.handleIDChange} />
                                                </FormGroup>
                                                </Col>
                                            {/* <Col md="12">
                                                    <FormGroup className="position-relative">
                                                        <Label for="HospitalID">Hospital Name and Address <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="user" className="fea icon-sm icons" /></i>
                                                        <AvField type="text" className="form-control pl-5" name="HospitalID" id="HospitalID" placeholder="First Name" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter your Hospital's Name and Address."},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col> */}

                                                <Col md="12">
                                                    <FormGroup className="position-relative">
                                                        <Label for="Email">Plasma Donation Center Email <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="mail" className="fea icon-sm icons" /></i>
                                                        <AvField type="text" className="form-control pl-5" name="Email" id="Email" placeholder="Enter Email" required
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
                                                        <Label for="Username">Username <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="heart" className="fea icon-sm icons" /></i>
                                                        <AvField type="text" className="form-control pl-5" name="Username" id="Username" placeholder="Enter Username" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter your username"},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="12">
                                                    <FormGroup className="position-relative">
                                                        <Label for="Password">Password <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="heart" className="fea icon-sm icons" /></i>
                                                        <AvField type="password" className="form-control pl-5" name="Password" id="Password" placeholder="Enter Password" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter your password"},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                {/* <Col md="12">
                                                    <FormGroup>
                                                        <div className="custom-control custom-checkbox">
                                                            <Input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                                            <Label className="custom-control-label" for="Accept">I Accept <Link to="/" className="text-primary">Terms And Conditions</Link></Label>
                                                        </div>
                                                    </FormGroup>
                                                </Col> */}
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
            </React.Fragment>
        );
    }
}

export default CenterSignUp;
