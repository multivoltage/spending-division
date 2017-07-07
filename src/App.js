import injectTapEventPlugin from 'react-tap-event-plugin';
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
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import HorizontalLinearStepper from './components/horizontalLinearStepper.js';
export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      people: [{name: 'Me'}],
      things: [{partecipants:[], quantity: 1}],
      step: 0, // step + 1 = things[x],
      showRecap: false,
      sidebarVisible: false
    };
    injectTapEventPlugin();

    //this.simulateOn();
  }

  simulateOn(){
    setTimeout(() => {
    this.setState({
      people: [{name: "diego"},{name: "luca"},{name: "paolo"}],
      showRecap: true,
      sidebarVisible: false,
      step: 1,
      things: [
        {price: 10, partecipants:["diego","luca","paolo"]},
        {price: 4, partecipants:["luca"]},
        //{price: 22.6, partecipants:["diego","paolo"]},
      ]
    });
    },1000);    
  }

  render() {

    const titleAppBar = this.state.showRecap ? "Recap" : this.state.step === 0 ? "People" : "Things "+this.state.step;
    const styleQuitRecap = {
      display: this.state.showRecap ? '' : 'none'
    };

    return (
      <MuiThemeProvider>
      
        <div>
          <AppBar className="top-menu" title={titleAppBar} 
                  onLeftIconButtonTouchTap={this.handleSidebar.bind(this)}
                  iconStyleRight={styleQuitRecap}
                  iconElementRight={<FlatButton label="Quit" onClick={this.handleCloseRecat.bind(this)} />}>
          </AppBar>
          {/* TO-DO <HorizontalLinearStepper stepIndex={this.state.step} things={this.state.things} />*/}
          <section className="section-container" zDepth={2}>
             {this.renderCorrectSection()}     
          </section>        
          <ButtonsNavigation handleAction={this.handleAction.bind(this)}/>
          <SidebarNavigation things={this.state.things} 
                             sidebarVisible={this.state.sidebarVisible}
                             handleSelectThing={this.handleSelectThing.bind(this)}/>
        </div>
      </MuiThemeProvider>
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
                              handleQuantityForThing={this.handleQuantityForThing.bind(this)}
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
  
  handleQuantityForThing(thing,quantityDelta){
    let index = this.state.things.indexOf(thing);
    let thingsCopy = Object.assign([],this.state.things);
    let thingCopy = Object.assign({},thing);
    thingCopy.quantity += quantityDelta;
    thingsCopy[index] = thingCopy;
    this.setState({things: thingsCopy});
  }
  // next
  handleAction(direction){
    let current = this.state.step;


    if(direction === 'prev' || direction === 'next'){
      let emptyNamesSize = this.state.things
                                  .map((thing) => { return thing.name})
                                  .filter((name) => {
                                    if(!name)
                                      return true;
                                    else 
                                      return false;
                                  });
      // todo                         
    }

    if(direction === 'prev'){
      if(current === 0)
        return;
      
      current--;
      this.setState({step: current});

    } else if(direction === 'next'){
      current++;
      if(!this.state.things[current-1]){
        let things = this.state.things.push({partecipants: [], quantity: 1});
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
    if(!thing){
      // go to people
      this.setState({
        sidebarVisible: false,
        step: 0
      });
    } else {
      let index = this.state.things.indexOf(thing);
      this.setState({
        step: index+1,
        sidebarVisible: false
      });
    }
  }
}
