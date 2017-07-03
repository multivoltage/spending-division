import React, { Component } from 'react';
import { Button, Divider } from 'semantic-ui-react';

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

export default class ButtonsNavigation extends Component {

  constructor(props){
    super(props);
    this.state = {
        canNext: false,
        selectedIndex: 0
    };
  }

  render() {
    return (
        <Paper zDepth={2} className="navigation-buttons">
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Prev"
              icon={nearbyIcon}
              onClick={this.handlePrev.bind(this)}
            />
            <BottomNavigationItem
              label="Done"
              icon={nearbyIcon}
              onClick={this.handleDone.bind(this)}
            />
            <BottomNavigationItem
              label="Next"
              icon={nearbyIcon}
              onClick={this.handleNext.bind(this)}
            />
          </BottomNavigation>
        </Paper>
    );
  }

  handlePrev(){
      this.setState({selectedIndex: 0});
      this.props.handleAction('prev');
  }

  handleNext(){
      this.setState({selectedIndex: 2});
      this.props.handleAction('next');
  }

  handleDone(){
    this.setState({selectedIndex: 1});
    this.props.handleAction('done');
  }
  
}
