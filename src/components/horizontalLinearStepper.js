import React from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default class HorizontalLinearStepper extends React.Component {

  handleNext = () => {

  };

  handlePrev = () => {
    
  };

  getStepContent(index) {
    debugger;
    if(index === 0){
      return "People";
    } 

    if(index === 1){
      if(this.props.things[index]){
        return this.props.things[index].name;
      } else {
        return "New";
      }
    }
    // > 1 check is thing exist 
    if(this.props.things[index]){
      return this.props.things[index].name;
    } else {
      return "Recap";
    }
  }

  render() {
    const stepIndex = this.props.stepIndex;
    const contentStyle = {margin: '0 16px'};

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>{this.getStepContent(stepIndex)}</StepLabel>
          </Step>
          <Step>
            <StepLabel>{this.getStepContent(stepIndex+1)}</StepLabel>
          </Step>
          <Step>
            <StepLabel>{this.getStepContent(stepIndex+2)}</StepLabel>
          </Step>
        </Stepper>
      </div>
    );
  }
}
