import React, { Component } from 'react';
import { Checkbox, Container } from 'semantic-ui-react';

export default class PartecipantChooser extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
          <Checkbox label={this.props.people.name} checked={this.isPeoplePartecipant()} onChange={this.onChange.bind(this)} />
    );
  }

  isPeoplePartecipant(){
    return this.props.thing.partecipants ? this.props.thing.partecipants.includes(this.props.people.name) : false;
  }

  onChange(ctx,data){
    this.props.handleSelectSingle(data.checked,this.props.people);
  }
}
