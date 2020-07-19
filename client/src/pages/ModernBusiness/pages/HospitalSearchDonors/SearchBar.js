import React, { Component } from 'react';
import { Container, Row, Col, Alert, Label, Input, Form, FormGroup, Button } from 'reactstrap';
import { AvForm, AvField, AvRadio, AvRadioGroup } from 'availity-reactstrap-validation';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            Contactvisible: false,
        }
        this.handleStart = this.handleStart.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    handleValidSubmit(e, values) {
        this.props.onSubmit(values)
        // event.preventDefault();
        // this.setState({ Contactvisible: true });
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
    render() {
        return (
            <React.Fragment >

                <section className="section-two " id="bookroom" style={{ paddingTop: 100 }}>
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={12}>
                                {/* <Alert color="primary" isOpen={this.state.Contactvisible} toggle={()=>{ this.setState({Contactvisible : !this.state.Contactvisible}) }}>
                                    Registration Done Successfully.
                            </Alert> */}
                                <AvForm onValidSubmit={this.handleValidSubmit} className="login-form mt-4" ref={c => (this.form = c)} className="p-4 shadow bg-white rounded">
                                    <h4 className="mb-3">Find donors</h4>

                                    <Row className="text-left">
                                        <Col lg="3" md="6">
                                            <FormGroup className="position-relative">
                                                <Label for="FirstName">Name </Label>
                                                <AvField type="text" className="form-control pl-5" name="FirstName" id="FirstName" placeholder=""
                                                // errorMessage=""
                                                // validate={{
                                                //     required: {value: true, errorMessage: "Please enter your email"},
                                                //     pattern: {value: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$', errorMessage: 'E-Mail is not valid!'},
                                                // }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="3" md="6">
                                            <FormGroup className="position-relative">
                                                <Label for="ZipCode">Zip Code </Label>
                                                <AvField type="text" className="form-control pl-5" name="ZipCode" id="ZipCode" placeholder=""
                                                // errorMessage=""
                                                // validate={{
                                                //     required: {value: true, errorMessage: "Please enter your email"},
                                                //     pattern: {value: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$', errorMessage: 'E-Mail is not valid!'},
                                                // }}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col lg="6">
                                            <Row className="align-items-center">
                                                <Col lg="4" >
                                                    <FormGroup className="position-relative">
                                                        <Label for="BloodType">Blood Type </Label>
                                                        <AvField type="text" className="form-control pl-5" name="BloodType" id="BloodType" placeholder=""
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup className="position-relative">
                                                        <Label for="Age">Age </Label>
                                                        <AvField type="number" className="form-control pl-5" name="Age" id="Age" placeholder=""
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="4" className="mt-2">
                                                    <Button  id="search" name="search" className="searchbtn btn btn-primary w-100 p" >Search </Button>
                                                </Col>
                                            </Row>
                                        </Col>


                                    </Row>

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