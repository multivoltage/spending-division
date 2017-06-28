import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import ButtonsNavigation from './components/buttons-navigations.js';
import FormPeople from './components/form-people.js';
import SingleThing from './components/single-thing.js';
import Thing from './components/single-thing.js';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      people: [{},{},{}],
      things: [{}],
      step: 1
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

    return this.renderThings();
  }

  renderThings(){
    return this.state.things.map((thing,index) => {
      return (<Thing key={index} thing={thing} reactKey={index}
                     handleThingChangeName={this.handleThingChangeName.bind(this)}
              />);
    });
  }

  handleThingChangeName(name,index){
    let thing = this.state.things[index];
    thing.name = name;
    this.setState({things: this.state.things});    
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
    this.setState({step: direction === 'next' ? ++current : --current});
  }
}
