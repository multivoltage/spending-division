import React, { Component } from 'react';
import { Container, Input, Divider } from 'semantic-ui-react';
import PartecipantChooser from './partecipant-chooser.js';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

export default class ThingsContainer extends Component {

  constructor(props){
    super(props);
  }


  render() {
    // putting this 2 lines invide Input' value attr, name did not change we step changed
    let name = this.props.thing.name || "";
    let price = this.props.thing.price !== null ? this.props.thing.price : "";
    return (
      <Container className="things-container">
        <header>
            <TextField className="_name" floatingLabelText="Name" fullWidth={true} value={name} onChange={this.onThingChangeName.bind(this,this.props._index)}/>
            <TextField className="_price" floatingLabelText="Price" type="number" fullWidth={true} value={price} onChange={this.onThingChangePrice.bind(this,this.props._index)} />
        </header>
        <p className="title">PARTECIPANTS</p>

          <div className="partecipants">
            <Checkbox className="selectAll" label="ALL" 
                      onCheck={this.onCheck.bind(this)} 
                      checkedIcon={<ActionFavorite />}
                      uncheckedIcon={<ActionFavoriteBorder />}       
                      checked={this.allPeoplePartecipants()}/>
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

  onCheck(ctx,data){
    this.props.handleSelectAll(data,this.props.thing);
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
    newThing.price = parseFloat(ctx.target.value);
    this.props.handleThingChange(newThing,index);
  }
}
