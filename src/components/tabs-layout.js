import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Container, Dimmer, Loader, Divider } from 'semantic-ui-react';

/**
 * we want to pass:
 * - tabs: string array of tabs
 * - name of tab selected
 */
export default class TabsLayout extends Component {

    constructor(props){
        super(props);
        this.state = {
            selected: this.props.selected
        };
    }

    renderTabsChildrensBody(){
        return this.props.children.find((child) => child.props.tab === this.state.selected);
    }

    renderHeader(){

        return this.props.tabs.map((tab,index) => {
            return (
                <span className={tab === this.state.selected ? 'tab selected' : 'tab'}
                      onClick={this.handleClick.bind(this,tab)}>{tab}</span>
            );
        });
    }

    handleClick(tab){
        this.setState({selected: tab});
    }

    render() {
        return (
            <div className="tablayout">
                <header className="tabs">{this.renderHeader()}</header>
                <div className="contents">
                    {this.renderTabsChildrensBody()}
                </div>
            </div>
        );
    }
}

