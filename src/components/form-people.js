import React, { Component } from 'react';
import { Container, Input, Divider, Button } from 'semantic-ui-react';

export default class FormPeople extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <Container>
            <Button.Group className="counter-choser">
                <Button className="prev" color="green" onClick={this.increment.bind(this,1)}>+</Button>
                <Button disabled>{this.props.people.length}</Button>
                <Button className="next" color="red" onClick={this.increment.bind(this,-1)}>-</Button>
            </Button.Group>
            
            <div className="inputs-people">
                {this.renderInputs()} 
            </div>   
            
        </Container>
    );
  } 

  renderInputs(){
      return this.props.people.map((p,index) => {
          return (
            <Input key={index} value={p.name} placeholder='name...' onChange={this.handleChange.bind(this,index)}/>
          );
      });
  }

  handleChange(index,ctx){
      this.props.handleEditName(index,ctx.target.value);
  }

  increment(value){
      if(value === 1)
        this.props.createEmptyPeople();
      else 
        this.props.removeLastPeople();
  } 

  onChange(e){
      let count = e.target.value;
      if(isNaN(count))
        return;
      count = +count; // we have number
      this.setState({count: count});
  }

  onSubmit(e){
      alert(0);
      e.preventDefault();
  }
}
