// React Basic and Bootstrap
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

//import images
import about from '../../assets/images/coworking/about.jpg';

class About extends Component {

    render() {
        return (
            <React.Fragment>
                <section className="section">
                    <Container>
                        <Row className="align-items-center">
                            <Col lg="5" md="6" xs="12">
                                <img src={about} className="img-fluid rounded" alt="" />
                            </Col>

                            <Col lg="7" md="6" xs="12" className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                                <div className="section-title ml-lg-4">
                                    <h4 className="title mb-4">About</h4>
                                    <p className="text-muted">Start working with <span className="text-primary font-weight-bold">PlasmaConnect. </span>
                                    PlasmaConnect will  connect potential donors with Plasma Collection Centers and Hospitals looking for a plasma source. PlasmaConnect will also provide Pharmaceutical Companies with a database of recovered patients for their clinical trials.</p>
                                    <Link to="#" className="btn btn-primary mt-3">Join now</Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}

export default About;