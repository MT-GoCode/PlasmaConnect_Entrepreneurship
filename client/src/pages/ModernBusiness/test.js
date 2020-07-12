import React, { Component } from 'react';
import axios from 'axios'

// import { colourOptions } from '../data';

// type State = {
//   inputValue: string,
// };


const promiseOptions = inputValue =>
  new Promise(resolve => {
      resolve(
        axios.get('/getcenters')
        .then(res => { 
            let centers = res.data.markers.marker
            let toState = centers.map((center) => {
                return {
                    value: center.name + ' - '+ center.address,
                    label: center.name + ' - '+ center.address}
            })
            return toState
            // this.setState({options: toState})
        })        
      );
  });

export default class WithCallbacks extends Component{
  state = { inputValue: '' };
  handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };
  render() {
    return (
      <div>
        <AsyncSelect
          cacheOptions
          loadOptions={promiseOptions}
          defaultOptions
          onInputChange={this.handleInputChange}
        />
      </div>
    );
  }
}