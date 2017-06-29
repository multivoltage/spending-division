import React, { Component } from 'react';
import { Checkbox, Container } from 'semantic-ui-react';

export default class PartecipantChooser extends Component {

  constructor(props){
    super(props);
  }

  render() {
    
    return (
          <Checkbox label={this.props.people.name} checked={this.props.people.selected} />
    );
  }
}
