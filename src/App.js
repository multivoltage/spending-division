import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import ButtonsNavigation from './components/buttons-navigations.js';
import FormPeople from './components/form-people.js';
import ThingsContainer from './components/things-container.js';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      people: [{name: 'Me'}],
      things: [{}],
      step: 1 // step + 1 = things[x]
    };
  }

  render() {
    return (
      <div>
        {this.renderCorrectSection()}            
        <ButtonsNavigation handleAction={this.handleAction.bind(this)}/>
      </div>
    );
  }

  renderCorrectSection(){
    if(this.state.step === 0) // form people step
      return (
          <FormPeople people={this.state.people}
              createEmptyPeople={this.createEmptyPeople.bind(this)}
              removeLastPeople={this.removeLastPeople.bind(this)}
              handleEditName={this.handleEditName.bind(this)} />
      );

    let selectedThing = this.state.things[this.state.step-1];
    return (<ThingsContainer people={this.state.people} thing={selectedThing} 
                             handleThingChange={this.handleThingChange.bind(this)} 
                             _index={this.state.step-1}
                             handleSelectSingle={this.handleSelectSingle.bind(this)}
                             handleSelectAll={this.handleSelectAll.bind(this)} />);
  }

  handleSelectAll(allSelected,index){
    let things = Object.assign([],this.state.things);
    things.forEach((thing) => {
      thing.partecipants = allSelected ? this.state.people.map((p) => p.name) : []
    });
    this.setState({things: things});
  }
  
  handleSelectSingle(isPartecipant, people){
    let thing = Object.assign([],this.state.things).find((thing) => thing.name === people.name);
    debugger;
    if(!thing.partecipants.includes(people.name)){
      thing.partecipants.push(people.name);
    } else {
      let index = thing.partecipants.indexOf(people.name);
      if (index > -1)
          thing.partecipants.splice(index, 1);
    }
    
    debugger;
  }

  handleThingChange(thing,index){
    let things = this.state.things;
    things[index] = thing;
    this.setState({things: things});    
  }

  handleEditName(index,name){
    let p = this.state.people[index];
    p.name = name;
    this.setState({people: this.state.people});
  }
  createEmptyPeople(){
    let people = this.state.people;
    people.push({});
    this.setState({people: people});
  }
  removeLastPeople(){
    let people = this.state.people;
    people.pop();
    this.setState({people: people});
  }
  
  // next
  handleAction(direction){
    let current = this.state.step;
    if(direction === 'prev'){
      if(current === 0)
        return;
      
      current--;
      this.setState({step: current});

    } else {
      current++;
      if(!this.state.things[current-1]){
        let things = this.state.things.push({});
        this.setState({thing: things, step: current});
      } else 
        this.setState({step: current});
    }
  }
}
