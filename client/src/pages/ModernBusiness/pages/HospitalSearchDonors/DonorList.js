import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Table } from "reactstrap";

// //Import Images
// import litecoin from "../../assets/images/crypto/litecoin.png";
// import bitcoin from "../../assets/images/crypto/bitcoin.png";
// import auroracoin from "../../assets/images/crypto/auroracoin.png";
// import coinye from "../../assets/images/crypto/coinye.png";
// import ethereum from "../../assets/images/crypto/ethereum.png";
// import potcoin from "../../assets/images/crypto/potcoin.png";
// import zcash from "../../assets/images/crypto/zcash.png";

class ListTable extends Component {
    state = {

    }

    render() {
        return (

            <div >
                <Container >
                    <Row className="justify-content-center">
                        <Col xs="12">
                            <div className="bg-white shadow rounded">
                                {this.props.data.length != 0 ?
                                    (<Table className="mb-0 table-center" hover>
                                        <thead>

                                            <tr>
                                                <th scope="col" >Name</th>
                                                <th scope="col" >Address</th>
                                                <th scope="col" >Email</th>
                                                <th scope="col" >Phone</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.props.data.map((donor, key) => {
                                                    console.log(donor)
                                                    return (
                                                        <tr key={key} onClick = {() => this.props.onSelect(donor)}>
                                                            <td>{donor.FirstName + ' ' + donor.LastName}</td>
                                                            <td>{donor.StreetAddress}</td>
                                                            <td>{donor.Email}</td>
                                                            <td>{donor.PhoneNumber}</td>
                                                            {/* <th>
                                                    <div className="d-flex align-items-center">
                                                        <img src={currency.image} className="float-left mr-3" height="50" alt=""/>
                                                        <p className="mb-0 font-weight-normal h5">{currency.name} <span className="text-muted h6">{currency.subname}</span> </p>
                                                    </div>
                                                </th>
                                                <td>₹ {currency.price}</td>
                                                <td className={ currency.change.charAt(0) === "+" ? "text-success" : "text-danger"}>{currency.change}</td>
                                                <td><Link to={currency.link} className="btn btn-primary">Buy</Link></td> */}
                                                        </tr>
                                                    )
                                                }

                                                )
                                            }
                                        </tbody>
                                    </Table>)
                                    : (<> </>)}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>



















        );
    }
}

export default ListTable;