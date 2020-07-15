import React, { Component } from 'react';
import { Container, Row, Col, Media, Form, FormGroup, Input, Label, Alert, Button, Card, CardBody, A } from 'reactstrap';
import { AvForm, AvField, AvRadio, AvRadioGroup } from 'availity-reactstrap-validation';
import { Link } from "react-router-dom";
import axios from 'axios';
// import InputForm from "../tests/testUpload"
import handleUpload from "../uploadFuncsClient"

//Import Icons
import FeatherIcon from 'feather-icons-react';

//Import components
import PageBreadcrumb from "../../../components/Shared/PageBreadcrumb";
// let urls = []
// window.urls = []
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
        }
    }

    handleUpload = async (ev, uploadInput, values) => {
        let urls = []
    
        for (let i in uploadInput) {
            let file = uploadInput[i].files[0];
    
            // Split the filename to get the name and type
            let fileParts = uploadInput[i].files[0].name.split('.');
            let fileName = fileParts[0];
            let fileType = fileParts[1];
            console.log("Preparing the upload");
            let url = await this.insertFile(file, fileName, fileType)
            console.log(url)
            urls.push(url)
    
        }
        // console.log('infunc')
        // console.log('f', urls, urls.length)
        return urls
    
    }

    insertFile = (file, fileName, fileType) => {
        return axios.post("/sign_s3", {
                fileName: fileName,
                fileType: fileType
            })
                .then(response => {
                    var returnData = response.data.data.returnData;
                    var signedRequest = returnData.signedRequest;
                    var url = returnData.url;
                    // console.log(url)
    
                    var options = {
                        headers: {
                            'Content-Type': fileType
                        }
                    };
                    return [signedRequest, file, options, url]
                    
                }).then((data) => {
                    let signedRequest = data[0]
                    let file = data[1]
                    let options = data[2]
                    let url = data[3]
                    return axios.put(signedRequest, file, options)
                    .then(result => {
                        console.log("Response from s3 successful")
    
                        return url
                    })
                    .catch(error => {
                        alert("ERROR " + JSON.stringify(error));
                    })
                }
                    
                )
                .catch(error => {
                    alert(JSON.stringify(error));
                })
    }

    uploadHandler = async (e, values) => {
        let promise = new Promise((resolve, reject) => {
            resolve(this.handleUpload(e, [this.uploadInputDF, this.uploadInputTR], values))
        }).then(data => data    
        )
        let res = await promise
        return res
        // handleUpload(e, [this.uploadInputDF, this.uploadInputTR], values).then(data => {console.log(data)})
    }

    handleValidSubmit = (e,values) => {
        this.uploadHandler(e,values).then(res => {
            console.log(res)
            let DFLink = res[0]
            let TRLink = res[1]
            
            values.DischargeForm = DFLink
            values.COVID19TestResults=TRLink
            console.log(values)
            axios.post('/donorQueue/create-donor-queue', values)
            .then(res => {
                console.log('data uploaded')
                // console.log(res.data);
                // let final = [res.data[res.data.length - 2], res.data[res.data.length - 3]];

                // this.setState({
                //     donors: res.data
                // })
            });
            this.form.reset();
        })
        // console.log(res)
        console.log(values)
        
        
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
                                    <h4 className="title">Request Eligibility as a Donor</h4>
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
                                        <AvForm onValidSubmit = {this.handleValidSubmit} className="login-form mt-4" ref={c => (this.form = c)}>
                                            <Row>
                                            <Col md="6">
                                                    <FormGroup className="position-relative">
                                                        <Label for="FirstName">First name <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="user" className="fea icon-sm icons" /></i>
                                                        <AvField type="text" className="form-control pl-5" name="FirstName" id="FirstName" placeholder="First Name" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter first name"},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                
                                                <Col md="6">
                                                    <FormGroup className="position-relative">
                                                        <Label for="LastName">Last name <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="user-check" className="fea icon-sm icons" /></i>
                                                        <AvField type="text" className="form-control pl-5" name="LastName" id="LastName" placeholder="Last Name" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter first name"},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="12">
                                                    <FormGroup className="position-relative">
                                                        <Label for="SocialSecurityNumber">SSN <span className="text-danger">*</span></Label>
                                                        <AvField type="number" className="form-control pl-5" name="SocialSecurityNumber" id="SocialSecurityNumber" placeholder="Social Security Number" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter a valid social security number"},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup className="position-relative">
                                                        <Label for="DateOfBirth">Date of Birth <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="user" className="fea icon-sm icons" /></i>
                                                        <AvField type="date" className="form-control pl-5" name="DateOfBirth" id="DateOfBirth" placeholder="" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter birthdate"},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup className="position-relative">
                                                        <Label for="Weight">Weight <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="user" className="fea icon-sm icons" /></i>
                                                        <AvField type="number" className="form-control pl-5" name="Weight" id="Weight" placeholder="Enter Weight" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter weight"},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md="6">
                                                    <FormGroup className="position-relative">
                                                        <Label for="Email">Your Email <span className="text-danger">*</span></Label>
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

                                                <Col md="6">
                                                    <FormGroup className="position-relative">
                                                        <Label for="PhoneNumber">Phone Number<span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="phone" className="fea icon-sm icons" /></i>
                                                        <AvField type="phone" className="form-control pl-5" name="PhoneNumber" id="PhoneNumber" placeholder="Enter phone number" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter your phone number"},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md="5">
                                                    <FormGroup className="position-relative">
                                                        <Label for="StreetAddress">Street Address <span className="text-danger">*</span></Label>
                                                        <i><FeatherIcon icon="home" className="fea icon-sm icons" /></i>
                                                        <AvField type="address" className="form-control pl-5" name="StreetAddress" id="StreetAddress" placeholder="Enter address" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter your address"},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md="3">
                                                    <FormGroup className="position-relative">
                                                        <Label for="City">City <span className="text-danger">*</span></Label>
                                                        {/* <i><FeatherIcon icon="home" className="fea icon-sm icons" /></i> */}
                                                        <AvField type="text" className="form-control pl-5" name="City" id="City" placeholder="Enter city" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter your city"},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md="2">
                                                    <FormGroup className="position-relative">
                                                        <Label for="StateCode">State Code<span className="text-danger">*</span></Label>
                                                        {/* <i><FeatherIcon icon="home" className="fea icon-sm icons" /></i> */}
                                                        <AvField type="text" className="form-control pl-5" name="StateCode" id="StateCode" placeholder="Enter state" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter your state"},
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md="2">
                                                    <FormGroup className="position-relative">
                                                        <Label for="ZipCode">Zip Code<span className="text-danger">*</span></Label>
                                                        {/* <i><FeatherIcon icon="home" className="fea icon-sm icons" /></i> */}
                                                        <AvField type="number" className="form-control pl-5" name="ZipCode" id="ZipCode" placeholder="Enter zip" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please enter your zip code"},
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

                                                <Col md="12">
                                                    <FormGroup className="position-relative">
                                                        <Label for="DischargeForm"> Discharge Form<span className="text-danger">*</span></Label>
                                                        {/* <i><FeatherIcon icon="file" className="fea icon-sm icons" /></i> */}
                                                        {/* <AvField type="file" className="form-control pl-5" name="DischargeForm" id="DischargeForm" placeholder="Please upload your hospital release form" required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please upload discharge form"},
                                                            }}
                                                        /> */}
                                                        <br/>
                                                        <input ref={(ref) => { this.uploadInputDF = ref; }} type="file"/>
                                                        <br/>
                                                    </FormGroup>
                                                </Col>

                                                <Col md="12">
                                                    <FormGroup className="position-relative">
                                                        <Label for="COVID19TestResults"> COVID-19 Test Results <span className="text-danger">*</span></Label>
                                                        {/* <i><FeatherIcon icon="file" className="fea icon-sm icons" /></i>
                                                        <AvField type="file" className="form-control pl-5" name="COVID19TestResults" id="COVID19TestResults" placeholder="Please upload your latest COVID-19 test results." required
                                                            errorMessage=""
                                                            validate={{
                                                                required: {value: true, errorMessage: "Please upload your form"},
                                                            }}
                                                        /> */}
                                                        <br/>
                                                        <input ref={(ref) => { this.uploadInputTR = ref; }} type="file"/>
                                                        <br/>
                                                    </FormGroup>
                                                </Col>
                                                
                                                <Col md="12">
                                                <FormGroup className="position-relative">
                                                <Label for="Screening1"> Have you been infected by COVID-19 Y/N? <span className="text-danger">*</span></Label>
                                                <AvRadioGroup inline name="Screening1" required
                                                >
                                                    <AvRadio customInput label="Yes" value="Yes" />
                                                    <AvRadio customInput label="No" value="No" />
                                                    </AvRadioGroup>
                                                    </FormGroup>
                                                </Col>

                                                <Col md="12">
                                                <FormGroup className="position-relative">
                                                <Label for="DonateConsent"> Do you consent to donating plasma? <span className="text-danger">*</span></Label>
                                                <AvRadioGroup inline name="DonateConsent" required
                                                >
                                                    <AvRadio customInput label="Yes" value="Yes" />
                                                    <AvRadio customInput label="No" value="No" />
                                                    </AvRadioGroup>
                                                    </FormGroup>
                                                </Col>

                                                <Col md = "12">
                                                <FormGroup className="position-relative">
                                                    <Label for="ResearchConsent"> Do you consent to your information being used for research? <span className="text-danger">*</span></Label>
                                                    <AvRadioGroup inline name="ResearchConsent" required
                                                    >
                                                        <AvRadio customInput label="Yes" value="Yes" />
                                                        <AvRadio customInput label="No" value="No" />
                                                    </AvRadioGroup>
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

            <section className="section">

            
        </section>
            </React.Fragment>
        );
    }
}

export default HelpCenterSupportRequest;
