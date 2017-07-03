import React, { Component } from 'react'
import { Sidebar } from 'semantic-ui-react'

export default class SidebarNavigation extends Component {
  
  render() {

    const classNames = this.props.sidebarVisible ? "sidebar-left visible" : "sidebar-left" 

    return (
      <div className={classNames}>
        {this.renderSections()}
      </div>
    )
  }

  renderSections(){
      return this.props.things.map((thing,index) => {
          return (
              <p key={index} onClick={this.props.handleSelectThing.bind(this,thing)}>{thing.name}</p>
          );
      });
  }
}

