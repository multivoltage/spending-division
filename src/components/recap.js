import React, { Component } from 'react';
import { Container, Divider } from 'semantic-ui-react';
import Calculator from '.././utils.js';

export default class Recap extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <Container>
            {this.renderPeople()}
        </Container>
    );
  }

  renderPeople(){
      return this.props.people.map((p) => {
          return this.renderPeopleRecap(p);
      })
  }  

  renderPeopleRecap(p){
      return (
          <p>{p.name} {Calculator.AmountForPeople(this.props.things,p)}</p>
      );
  }
}
