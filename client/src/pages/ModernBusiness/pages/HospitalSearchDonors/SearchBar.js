
import React, { Component } from 'react';
import { Container, Row, Col, Alert, Label, Input, Form, FormGroup, Button, Card, Collapse, CardHeader, CardBody } from 'reactstrap';
import { AvForm, AvField, AvRadio, AvRadioGroup } from 'availity-reactstrap-validation';
import axios from 'axios'


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const dotenv = require('dotenv');

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            Contactvisible: false,
            advanced: false,
            BloodType: 'Any',
            Range: 5,
            CurrentZipCode: '',
            Address: '',
            Coord: {}

        }
        this.handleStart = this.handleStart.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    getZip = (pos) => {
        axios('https://maps.googleapis.com/maps/api/geocode/json', {
            method: 'GET',
            params: {
                latlng: pos.coords.latitude + ',' + pos.coords.longitude,
                sensor: 'true',
                key: process.env.REACT_APP_GoogleMapsAPIKey 

            }
        }).then(res => {
            let results = res.data.results
            console.log(res.data.results)
            let postalCode = results[0].address_components.find(function (component) {
                return component.types[0] == "postal_code";
            });
            let zip = postalCode.long_name
            this.setState({ CurrentZipCode: zip })
        })
    }

    componentDidMount = () => {

        if ("geolocation" in navigator) {
            console.log("Available");
            let pos = []
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position)

                // this.getZip(position)
                this.setState({
                    Address: 'Using Current',
                    Coord: [
                        position.coords.longitude,    
                        position.coords.latitude,
                    ]
                })
            }
            )

        } else {
            console.log("Not Available");
        }
    }

    getLatLng = (values) => {
        return axios('https://maps.googleapis.com/maps/api/geocode/json', {
            method: 'GET',
            params: {
                address: values,
                key: process.env.REACT_APP_GoogleMapsAPIKey

            }
        }).then(res => {
            console.log(res)
            console.log(res.data.results[0].geometry.location)
            return [res.data.results[0].geometry.location.lng, res.data.results[0].geometry.location.lat]

        }).catch(err => {
            console.log(err)
            return 'error'
        })
    }

    handleValidSubmit = async (e, values) => {

        values.BloodType = this.state.BloodType == 'Any' ? '' : this.state.BloodType
        values.Range = this.state.Sex == 'Any' ? '' : this.state.Range
        values.location = this.state.Coord
        values.Address = ''
        
        if (this.state.Address !== 'Using Current') {
            console.log('Reverse Geocoding...')
            let loc = await this.getLatLng(this.state.Address)
            console.log(loc)
            values.location = loc
        }
        console.log(values)

        this.props.onSubmit(values)

        // event.preventDefault();
        // this.setState({ Contactvisible: true });
    }

    openAdvancedOptions = () => {
        this.setState({ advanced: !this.state.advanced })
    }


    handleStart = date => {
        this.setState({
            startDate: date
        });
    };

    handleEnd = date => {
        this.setState({
            endDate: date
        });
    };

    changeField = (field, e) => {
        if (field === "BloodType") {
            console.log(field)
            this.setState({ BloodType: e })
        }
        if (field === "Range") {
            this.setState({ Range: e })
        }
        if (field == "Address") {
            this.setState({Address: e})
        }
    }
    render() {
        return (
            <React.Fragment >

                <section className="section-two " id="bookroom" style={{ paddingTop: 100 }}>
                    <Container >
                        <Row className="justify-content-center" >

                            <Col lg={12}>
                                {/* <Alert color="primary" isOpen={this.state.Contactvisible} toggle={()=>{ this.setState({Contactvisible : !this.state.Contactvisible}) }}>
                                    Registration Done Successfully.
                            </Alert> */}
                                <AvForm onValidSubmit={this.handleValidSubmit} className="login-form mt-4" ref={c => (this.form = c)} className="p-4 shadow bg-white rounded">
                                    <h4 className="mb-3">Find donors</h4>

                                    <Row className="align-items-center">
                                        {/* <Col lg="6" md="6">
                                        <FormGroup className="position-relative">
                                            <Label for="Zip Code">Zip Code </Label>
                                            <AvField type="text" className="form-control" name="ZipCode" id="ZipCode" value={this.state.CurrentZipCode} placeholder=""
                                            />
                                        </FormGroup>
                                    </Col> */}
                                        <Col lg="6" md="6">
                                            <FormGroup className="position-relative">
                                                <Label for="Address">Address </Label>
                                                <AvField onChange={(e) => { this.changeField("Address", e.target.value) }} type="text" className="form-control" name="Address" id="Address" value = {this.state.Address == 'Using Current' ? '' : this.state.Address} placeholder={this.state.Address == 'Using Current' ? "Using your current address" : "Street Address, City, State"}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="3" md="6">
                                            <FormGroup className="position-relative">
                                                <Label for="Blood Type">Range (miles) </Label>
                                                <AvField onChange={(e) => { this.changeField("Range", e.target.value) }} value={this.state.Range} id="Range" type="select" name="Range" >
                                                    <option>1</option>
                                                    <option>5</option>
                                                    <option>10</option>
                                                    <option>15</option>
                                                    <option>20</option>
                                                </AvField>
                                            </FormGroup>
                                        </Col>
                                        <Col lg="3">
                                            <FormGroup className="position-relative">
                                                <Label for="Blood Type">Blood Type </Label>
                                                <AvField onChange={(e) => { this.changeField("BloodType", e.target.value) }} value={this.state.BloodType} name="BloodType" id="BloodType" type="select" name="BloodType" >
                                                    <option>Any</option>
                                                    <option>A+</option>
                                                    <option>A-</option>
                                                    <option>B+</option>
                                                    <option>B-</option>
                                                    <option>O+</option>
                                                    <option>O-</option>
                                                    <option>AB+</option>
                                                    <option>AB-</option>
                                                </AvField>
                                            </FormGroup>
                                        </Col>


                                        <Col lg="6">
                                            <Button id="search" name="search" className="searchbtn btn btn-primary w-100 p" >Search </Button>
                                        </Col>



                                    </Row>

                                    {/* <Row className="text-left" xs="15">
                                        <Col >
                                            <FormGroup className="position-relative">
                                                <Label for="Zip Code">Zip Code </Label>
                                                <AvField type="text" className="form-control" name="ZipCode" id="ZipCode" placeholder=""
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col >
                                            <FormGroup className="position-relative">
                                                <Label for="Blood Type">Blood Type </Label>
                                                <AvField onChange={(e) => { this.changeField("BloodType", e.target.value) }} value={this.state.BloodType} name="BloodType" id="BloodType" type="select" name="BloodType" >
                                                    <option>Any</option>
                                                    <option>A+</option>
                                                    <option>A-</option>
                                                    <option>B+</option>
                                                    <option>B-</option>
                                                    <option>O+</option>
                                                    <option>O-</option>
                                                    <option>AB+</option>
                                                    <option>AB-</option>
                                                </AvField>
                                            </FormGroup>


                                        </Col>
                                        <Col>
                                        <Label for="Blood Type"></Label>
                                            <Button id="search" name="search" className="searchbtn btn btn-primary w-100 p" >Search </Button>
                                        </Col>


                                    </Row> */}







                                    {/* <Row className="text-left">
                                        <Col lg="4" md="6">
                                            <h6 className="title mb-0"> Advanced Options
                                            <i onClick={this.openAdvancedOptions} className={this.state.advanced ? "mdi mdi-chevron-up" : "mdi mdi-chevron-down"}></i>
                                            </h6>
                                            <Collapse isOpen={this.state.advanced}>
                                                <CardBody>
                                                    <FormGroup className="position-relative">
                                                        <Label for="Range">Zip Code Range </Label>
                                                        <AvField type="number" className="form-control" name="Range" id="Range" placeholder="" />
                                                    </FormGroup>
                                                    <FormGroup className="position-relative">
                                                        <Label for="LastDateInfect">Earliest Last Date of COVID-19 Infection </Label>
                                                        <AvField type="number" className="form-control" name="LastDateInfect" id="LastDateInfect" placeholder="" />
                                                    </FormGroup>
                                                </CardBody>
                                            </Collapse>
                                        </Col>
                                    </Row>
                                 */}
                                </AvForm>

                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}

export default SearchBar;