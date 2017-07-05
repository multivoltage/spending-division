import React, { Component } from 'react';
import Calculator from '.././utils.js';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

export default class Recap extends Component {

  constructor(props){
    super(props);
  }

  render() {

    let total = 0;
    this.props.things.forEach((t) => {
        if(t){
            total += t.price;
        }
    });
    total = total+" €";
    return (
        <Paper className="recap-container" zDepth={1}>
            <List className="recap-cost">
                <Subheader>General Info</Subheader>
                <ListItem primaryText="Total cost" rightIcon={<span className="value">{total}</span>} />
                <ListItem primaryText="Partecipants" rightIcon={<span className="value">{this.props.people.length}</span>} />
            </List>
            <Divider />
            <List className="recap-quotes">
                <Subheader>Single quotes</Subheader>
                {this.renderPeopleRecap()}
            </List>
        </Paper>
    );
  }

  handleCloseRecat(){
      this.props.handleCloseRecat();
  }
  
  renderPeopleRecap(){
      return this.props.people.map((p,index) => {
          return this.renderPeopleSingle(index,p);
      })
  }  

  renderPeopleSingle(index,p){
      return (
          <ListItem key={index} primaryText={p.name} rightIcon={<span className="value">{Calculator.AmountForPeople(this.props.things,p)+" €"}</span>}/>
      );
  }
}
