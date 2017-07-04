import React, { Component } from 'react';
import { Container, Input, Divider } from 'semantic-ui-react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

export default class FormPeople extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <div className="people-container">
            <section className="counter-choser">
                <FlatButton backgroundColor label="ADD PEOPLE" onClick={this.increment.bind(this,1)}/>
                <FlatButton disbled="true" disableTouchRipple="true" label={this.props.people.length} />
                <FlatButton label="REMOVE PEOPLE" onClick={this.increment.bind(this,-1)} />
            </section>
            
            <div className="inputs-people">
                {this.renderInputs()} 
            </div>   
            
        </div>
    );
  } 

  renderInputs(){
      return this.props.people.map((p,index) => {
          return (
            <TextField key={index} fullWidth={true} intText="People name..." value={p.name} onChange={this.handleChange.bind(this,index)}/>
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
