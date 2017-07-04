import React, { Component } from 'react';
import { Container, Input, Divider, Checkbox } from 'semantic-ui-react';
import PartecipantChooser from './partecipant-chooser.js';
import TextField from 'material-ui/TextField';

export default class ThingsContainer extends Component {

  constructor(props){
    super(props);
  }


  render() {
    // putting this 2 lines invide Input' value attr, name did not change we step changed
    let name = this.props.thing.name || "";
    let price = this.props.thing.price || "";
    return (
      <Container className="things-container">
        <header>
            <TextField className="_name" floatingLabelText="thing name" fullWidth={true} value={name} onChange={this.onThingChangeName.bind(this,this.props._index)}/>
            <TextField className="_price" floatingLabelText="thing price" fullWidth={true} value={price} type="number" onChange={this.onThingChangePrice.bind(this,this.props._index)}/>
            <p className="title">PARTECIPANTS</p>
        </header>
        <Divider />

          <div className="partecipants">
            <Checkbox className="selectAll" label="ALL" onChange={this.onChange.bind(this)} checked={this.allPeoplePartecipants()}/>
            {this.renderPartecipants()}
          </div>

      </Container>
    );
  }

  allPeoplePartecipants(){
    if(!this.props.people || (!this.props.thing && !this.props.thing.partecipants)){
      return false;
    }

    let totalPeople = this.props.people.length;
    let partecipants = this.props.thing.partecipants.length;
    
    return totalPeople === partecipants;
  }

  onChange(ctx,data){
    this.props.handleSelectAll(data.checked,this.props.thing);
  }

  renderPartecipants(){
    return this.props.people.map((people,index) => {
      return (<PartecipantChooser key={index} people={people} thing={this.props.thing} handleSelectSingle={this.props.handleSelectSingle.bind(this)}/>);
    });
  }

  onThingChangeName(index,ctx){
     let newThing = Object.assign({}, this.props.thing);
     newThing.name = ctx.target.value;
     this.props.handleThingChange(newThing,index);
  }

  onThingChangePrice(index,ctx){
    let newThing = Object.assign({}, this.props.thing);
    newThing.price = +ctx.target.value;
    this.props.handleThingChange(newThing,index);
  }
}
