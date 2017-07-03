import React, { Component } from 'react';
import { Container, Divider, Icon } from 'semantic-ui-react';
import Calculator from '.././utils.js';

export default class Recap extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <Container>
             <Icon size="big" name="close" onClick={this.handleCloseRecat.bind(this)} />
            {this.renderPeople()}
        </Container>
    );
  }

  handleCloseRecat(){
      this.props.handleCloseRecat();
  }
  
  renderPeople(){
      return this.props.people.map((p,index) => {
          return this.renderPeopleRecap(index,p);
      })
  }  

  renderPeopleRecap(index,p){
      return (
          <p key={index}>{p.name} {Calculator.AmountForPeople(this.props.things,p)}</p>
      );
  }
}
