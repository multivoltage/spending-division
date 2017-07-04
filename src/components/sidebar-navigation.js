import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class SidebarNavigation extends Component {
  
  render() {

    return (
      <Drawer className="drawer" open={this.props.sidebarVisible}>
        <MenuItem className="go-partecipants" onTouchTap={this.props.handleSelectThing.bind(this)}>See all people</MenuItem>
        {this.renderSections()}
      </Drawer>
    )
  }

  renderSections(){
      return this.props.things.map((thing,index) => {
          return (
              <MenuItem key={index} onTouchTap={this.props.handleSelectThing.bind(this,thing)}>{thing.name}</MenuItem>
          );
      });
  }
}

