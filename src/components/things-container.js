import React, { Component } from 'react';
import { Container, Input, Divider } from 'semantic-ui-react';
import Thing from './thing.js';

export default class ThingsContainer extends Component {

  constructor(props){
    super(props);
  }


  render() {
    return (
      <Container className="things-container">
        <header>
            <Input placeholder="thing..." value={this.props.thing.name} onChange={this.handleThingChangeName.bind(this,this.props.reactKey)}/>
            <Input placeholder="price..." value={this.props.thing.price} type="number" onChange={this.handleThingChangePrice.bind(this,this.props.reactKey)}/>
            <p className="title">PARTECIPANTS</p>
        </header>
        <Divider />
        
      </Container>
    );
  }
  
  handleThingChangeName(index,ctx){
     let name = ctx.target.value;
     this.props.handleThingChangeName(name,index);
  }

  handleThingChangePrice(index,ctx){
    let price = +ctx.target.value;
    this.props.handleThingChangePrice(price,index);
  }
}
