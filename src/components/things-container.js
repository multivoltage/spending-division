import React, { Component } from 'react';
import { Container, Input, Divider, Checkbox } from 'semantic-ui-react';
import PartecipantChooser from './partecipant-chooser.js';

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
            <Input placeholder="thing..." value={name} onChange={this.onThingChangeName.bind(this,this.props._index)}/>
            <Input placeholder="price..." value={price} type="number" onChange={this.onThingChangePrice.bind(this,this.props._index)}/>
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
    return (this.props.people && this.props.thing && this.props.thing.partecipants) ? this.props.people.length === this.props.thing.partecipants.length : false;
  }

  onChange(ctx,data){
    this.props.handleSelectAll(data.checked,this.props._index);
  }

  renderPartecipants(){
    return this.props.people.map((people) => {
      return (<PartecipantChooser people={people} thing={this.props.thing}/>);
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
