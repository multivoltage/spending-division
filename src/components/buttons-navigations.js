import React, { Component } from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import NavigateNext from 'material-ui/svg-icons/image/navigate-next';
import NavigateBefore from 'material-ui/svg-icons/image/navigate-before';
import Done from 'material-ui/svg-icons/action/done';


const nextIcon = <NavigateNext />;
const beforeIcon = <NavigateBefore />;
const doneIcon = <Done />;

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
              icon={beforeIcon}
              onTouchTap={this.handlePrev.bind(this)}
            />
            <BottomNavigationItem
              label="Recap"
              icon={doneIcon}
              onTouchTap={this.handleDone.bind(this)}
            />
            <BottomNavigationItem
              label="Next"
              icon={nextIcon}
              onTouchTap={this.handleNext.bind(this)}
            />
          </BottomNavigation>
        </Paper>
    );
  }

  handlePrev(e){
      e.preventDefault();
      this.setState({selectedIndex: 0});
      this.props.handleAction('prev');
  }

  handleNext(e){
      e.preventDefault();
      this.setState({selectedIndex: 2});
      this.props.handleAction('next');
  }

  handleDone(e){
    e.preventDefault();
    this.setState({selectedIndex: 1});
    this.props.handleAction('done');
  }
  
}
