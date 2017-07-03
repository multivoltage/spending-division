import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import ButtonsNavigation from './components/buttons-navigations.js';
import FormPeople from './components/form-people.js';
import ThingsContainer from './components/things-container.js';
import Recap from './components/recap.js';
import SidebarNavigation from './components/sidebar-navigation.js';
import { Icon, Label } from 'semantic-ui-react';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      people: [{name: 'Me'}],
      things: [{partecipants:[]}],
      step: 0, // step + 1 = things[x],
      showRecap: false,
      sidebarVisible: false
    };
  }

  render() {
    return (
      <div>
        <div className="top-menu">
          <img src="https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_menu_white_24px.svg" 
               onClick={this.handleSidebar.bind(this)} />
        </div>
        <Label className="things-counter">
          THINGS: {this.state.things.length}
        </Label>
        {this.renderCorrectSection()}            
        <ButtonsNavigation handleAction={this.handleAction.bind(this)}/>
        <SidebarNavigation things={this.state.things} 
                           sidebarVisible={this.state.sidebarVisible}
                           handleSelectThing={this.handleSelectThing.bind(this)}/>
      </div>
    );
  }

  handleSidebar(){
    this.setState({sidebarVisible: !this.state.sidebarVisible});
  }

  renderCorrectSection(){
    if(this.state.showRecap){
      return (<Recap people={this.state.people} things={this.state.things} handleCloseRecat={this.handleCloseRecat.bind(this)}/>);
    }

    if(this.state.step === 0) // form people step
      return (
          <FormPeople people={this.state.people}
              createEmptyPeople={this.createEmptyPeople.bind(this)}
              removeLastPeople={this.removeLastPeople.bind(this)}
              handleEditName={this.handleEditName.bind(this)} />
      );
    
    if(this.state.step > 0){
      let selectedThing = this.state.things[this.state.step-1];
      return (<ThingsContainer people={this.state.people} thing={selectedThing} 
                              handleThingChange={this.handleThingChange.bind(this)} 
                              _index={this.state.step-1}
                              handleSelectSingle={this.handleSelectSingle.bind(this)}
                              handleSelectAll={this.handleSelectAll.bind(this)} />);      
    }
  }

  handleSelectAll(allSelected,thing){
    let thingCopy = Object.assign({},thing);
    let index = this.state.things.indexOf(thing);

    thingCopy.partecipants = allSelected ? this.state.people.map((p) => p.name) : [];
    let thingsCopy = Object.assign([],this.state.things);
    thingsCopy[index] = thingCopy;
    this.setState({things: thingsCopy});
  }
  
  handleSelectSingle(wantPartecipant, people,thing){
    let thingCopy = Object.assign({},thing);
    if(wantPartecipant){
      // check if is not partecipant (shold not be happend :( )
      if(!thingCopy.partecipants.find((p) => p === people.name)){
        thingCopy.partecipants.push(people.name);
      }
    } else {
      // check if is name is present (shoud be present)
      if(thingCopy.partecipants.find((p) => p === people.name)){
        let index = thingCopy.partecipants.indexOf(people.name);
        thingCopy.partecipants.splice(index, 1);        
      }
    }

    let index = this.state.things.indexOf(thing);
    let thingsCopy = Object.assign([],this.state.things);
    thingsCopy[index] = thingCopy;
    this.setState({things: thingsCopy});
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

    } else if(direction === 'next'){
      current++;
      if(!this.state.things[current-1]){
        let things = this.state.things.push({partecipants: []});
        this.setState({thing: things, step: current});
      } else 
        this.setState({step: current});
    } else if(direction === 'done'){
      this.setState({showRecap: true});
    }
  }

  handleCloseRecat(){
    this.setState({showRecap: false});
  }

  handleSelectThing(thing){
    let index = this.state.things.indexOf(thing);
    this.setState({
      step: index+1,
      sidebarVisible: false
    });
  }
}
