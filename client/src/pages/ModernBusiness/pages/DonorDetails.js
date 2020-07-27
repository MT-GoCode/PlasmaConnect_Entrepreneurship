// React Basic and Bootstrap
import React, { Component } from 'react';
import { Container, Row, Col, Alert, Form, FormGroup, Label, Input, Button, Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import axios from 'axios'

// Import Generic components
// import Section from "./section";


class DonorDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DFDoc: {},
            TRDoc: {},
            filesLoaded: false,
            files: <></>
        }
    }
    fetchFiles = (fileName, contentType) => {
        return axios(`s3/get_file/${fileName}`, {
            method: 'GET',
            // responseType: 'blob' //Force to receive data in a Blob Format
        }).then(res => {
            let input = {
                data: "data:" + contentType + ";base64," + res.data,
                contentType: contentType
            }
            return input

        })
    }

    renderFiles = async () => {
        let fileName = this.props.details.DischargeForm.key //  '3dscreenshot.png' // 
        let contentType = this.props.details.DischargeForm.contentType // 'png'//
        let DFInput = await this.fetchFiles(fileName, contentType)

        fileName = this.props.details.COVID19TestResults.key //  '3dscreenshot.png' // 
        contentType = this.props.details.COVID19TestResults.contentType // 'png'//
        let TRInput = await this.fetchFiles(fileName, contentType)

        this.setState({
            files: <>
                <li className="h6">Discharge Form: </li>
                <embed
                    src={DFInput.data}
                    id="displayFile"
                    // alt="your image"
                    width="800"
                    height={(DFInput.contentType == 'application/pdf') ? '1000' : ''}
                    // style={{ borderStyle: "solid" }}
                    type={DFInput.contentType}
                />
                <li className="h6">COVD-19 Test Results: </li>
                <embed
                    src={TRInput.data}
                    id="displayFile"
                    // alt="your image"
                    width="800"
                    height={(TRInput.contentType == 'application/pdf') ? '1000' : ''}
                    // style={{ borderStyle: "solid" }}
                    type={TRInput.contentType}
                />
            </>,
            filesLoaded: true
        })
    }

    // componentWillMount() {
    // this.fetchFiles()
    /*
    let files = [this.props.details.DischargeForm, this.props.details.COVID19TestResults]
    for (let i in files) {
        let file = files[i]
        let fileName = file.key //  '3dscreenshot.png' // 
        let contentType = file.contentType // 'png'//
        axios(`http://localhost:3100/get_file/${fileName}`, {
            method: 'GET',
            // responseType: 'blob' //Force to receive data in a Blob Format
        }).then(res => {
            let input = [{
                data: "data:" + contentType + ";base64," + res.data,
                contentType: contentType
            }]

            console.log(input)
            this.setState({
                    files: input
                }
            )
            

        })
    }
    */


    // }

    componentDidMount() {
        console.log(this.props.details.FirstName)
        document.body.classList = "";
        document.getElementById('top-menu').classList.add('nav-light');
        document.getElementById('buyButton').className = "btn btn-light";
        // document.getElementById('brandLogo').src = logolight;
        window.addEventListener("scroll", this.scrollNavigation, true);
        this.renderFiles()
    }
    // Make sure to remove the DOM listener when the component is unmounted.
    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollNavigation, true);
    }

    scrollNavigation = () => {
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        if (top > 80) {
            document.getElementById('topnav').classList.add('nav-sticky');
            document.getElementById('buyButton').className = "btn btn-primary";
            // document.getElementById('brandLogo').src = logodark;
        }
        else {
            document.getElementById('topnav').classList.remove('nav-sticky');
            document.getElementById('buyButton').className = "btn btn-light";
            // document.getElementById('brandLogo').src = logolight;
        }
    }


    render() {

        return (
            <React.Fragment>

                <section className="bg-half-170 d-table w-100" id="home" >

                    <Container>
                        <Button width="10%" className="btn btn-primary" onClick={this.props.returnList} > {'< Back'} </Button>
                        {/* <Row className="align-items-center"> */}
                        <div className="title-heading mt-4">


                            <h1 className="heading mb-3">{this.props.details.FirstName + ' ' + this.props.details.LastName} </h1>
                            {/* <CardBody> */}
                            <h5 className="card-title">Personal Details :</h5>

                            <ul className="list-unstyled feature-list">

                                <li className="h6"><i><FeatherIcon icon="mail" className="fea icon-sm text-warning mr-2" /></i>Email: {this.props.details.Email}</li>
                                {/* <li className="h6"><i><FeatherIcon icon="gift" className="fea icon-sm text-warning mr-2" /></i><span className="text-muted">D.O.B. :</span> 31st Dec, 1996</li>
                                        <li className="h6"><i><FeatherIcon icon="home" className="fea icon-sm text-warning mr-2" /></i><span className="text-muted">Address :</span> 15 Razy street</li>
                                        <li className="h6"><i><FeatherIcon icon="map-pin" className="fea icon-sm text-warning mr-2" /></i><span className="text-muted">City :</span> London</li>
                                        <li className="h6"><i><FeatherIcon icon="globe" className="fea icon-sm text-warning mr-2" /></i><span className="text-muted">Country :</span> UK</li>
                                        <li className="h6"><i><FeatherIcon icon="server" className="fea icon-sm text-warning mr-2" /></i><span className="text-muted">Postal Code :</span> 521452</li>
                                        <li className="h6"><i><FeatherIcon icon="phone" className="fea icon-sm text-warning mr-2" /></i><span className="text-muted">Mobile :</span> (+125) 1542-8452</li> */}
                                <li className="h6"><a>Show Discharge Form</a></li>
                                {this.state.filesLoaded ?
                                    this.state.files :
                                    <>Loading...</>
                                }



                            </ul>

                        </div>
                        {/* </Row> */}
                    </Container>
                </section>

            </React.Fragment>
        );
    }
}

export default DonorDetails;
