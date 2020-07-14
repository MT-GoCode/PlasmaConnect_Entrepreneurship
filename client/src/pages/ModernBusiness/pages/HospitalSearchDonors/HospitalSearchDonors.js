import React, { Component } from 'react';
import { Container, Row, Col, Media, Form, FormGroup, Input, Label, Alert } from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios'
//Import Icons
import FeatherIcon from 'feather-icons-react';
import SearchBar from './SearchBar';
import DonorList from './DonorList'


class SignUpInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathItems : [
                //id must required
                { id : 1, name : "Landrick", link : "/index" },
                { id : 2, name : "Help Center", link : "#" },
                { id : 3, name : "Support" },
            ],
            isOpen : false,
            query: {},
            data: []
        }
        // this.handleSubmit.bind(this);
    }

    onSubmit = (values) =>{
        this.setState({query: values})
        axios.post('/query/donateSearch').then(res => {
          console.log(res.data)
          this.setState({data: res.data})
        })
        // console.log(this.state.query)
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
                <section className="bg-half d-table w-100">
                        <Row className="justify-content-center">
                          <SearchBar onSubmit = {this.onSubmit}/>
                        </Row>
                  </section>
                  <DonorList data = {this.state.data} />
                  <section className="section">
                  </section>
            </React.Fragment>

           
        );
    }
}

export default SignUpInfo;