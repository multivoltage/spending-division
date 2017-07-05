import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import RemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';
import { red500 } from 'material-ui/styles/colors';

export default class FormPeople extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <div className="people-container">
            <section className="counter-choser">
                <IconButton>
                    <AddCircleOutline color="#009688" onClick={this.increment.bind(this,1)}/>
                </IconButton>    
                <IconButton>
                    <RemoveCircleOutline color={red500} onClick={this.increment.bind(this,-1)}/>
                </IconButton>  
                <span className="counter-label">{this.props.people.length} people</span>          
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
            <TextField name="people-name" key={index} fullWidth={true} hintText="People name..." value={p.name} onChange={this.handleChange.bind(this,index)}/>
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
