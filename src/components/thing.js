import React, { Component } from 'react';
import { Container, Input, Divider } from 'semantic-ui-react';

export default class SingleThing extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <Container className="thing-container">
        <Input placeholder="thing..." value={this.props.thing.name} onChange={this.handleThingChangeName.bind(this,this.props.reactKey)}/>
        <Input placeholder="price..." value={this.props.thing.price} type="number" onChange={this.handleThingChangePrice.bind(this,this.props.reactKey)}/>
        <p className="title">PARTECIPANTS</p>
        <Divider />
      </Container>
    );
  }
}
