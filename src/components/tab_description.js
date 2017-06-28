import React, { Component } from 'react';
import { Button, Container } from 'semantic-ui-react';

export default class TabDescription extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      isEditing: false
    }
  }
  render() {
    return (
      <Container className="tab-description">
        <textarea disabled={!this.state.isEditing}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.    
        </textarea>
        {this.renderCorrectButton()}
      </Container>      
    );    
  }

  renderCorrectButton(){

    const handleClick = () => {
      this.setState({ isEditing: !this.state.isEditing });
    }
    if(!this.state.isEditing)
      return (<Button onClick={handleClick} className="edit" size='mini'>Edit</Button>);
    // else
    return (<Button onClick={handleClick} className="save" size='mini'>Save</Button>);
  }
}

