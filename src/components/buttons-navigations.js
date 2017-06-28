import React, { Component } from 'react';
import { Button, Divider } from 'semantic-ui-react';

export default class ButtonsNavigation extends Component {

  constructor(props){
    super(props);
    this.state = {
        canNext: false
    };
  }

  render() {
    return (
        <Button.Group className="navigation-buttons">
          <Button className="prev" color="green" onClick={this.handlePrev.bind(this)}>PREV</Button>
          <Button className="next" color="red" onClick={this.handleNext.bind(this)} disabled={this.state.canNext}>NEXT</Button>
        </Button.Group>
    );
  }

  handlePrev(){
      this.props.handleAction('prev');
  }

  handleNext(){
      this.props.handleAction('next');
  }
  
}
