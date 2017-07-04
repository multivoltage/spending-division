import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Checkbox from 'material-ui/Checkbox';

export default class PartecipantChooser extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
          <Checkbox label={this.props.people.name} 
                    checked={this.isPeoplePartecipant()}
                    onCheck={this.onCheck.bind(this)} />
    );
  }

  isPeoplePartecipant(){
    return this.props.thing.partecipants ? this.props.thing.partecipants.includes(this.props.people.name) : false;
  }

  onCheck(ctx,data){
    this.props.handleSelectSingle(data,this.props.people,this.props.thing);
  }
}
