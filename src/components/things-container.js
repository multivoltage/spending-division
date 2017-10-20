import React, { Component } from 'react';
import PartecipantChooser from './partecipant-chooser.js';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import IconButton from 'material-ui/IconButton';
import RemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';
import Paper from 'material-ui/Paper';
import { red500 } from 'material-ui/styles/colors';
import classNames from 'classnames/bind';
import Done from 'material-ui/svg-icons/action/done';
const doneIcon = <Done />;
export default class ThingsContainer extends Component {

  constructor(props){
    super(props);
  }


  render() {
    // putting this 2 lines invide Input' value attr, name did not change we step changed
    let name = this.props.thing.name || "";
    let price = this.props.thing.price;
    if(price === undefined)
      price = "";
    
    let percDiscount = this.props.thing.percDiscount;
    let amountFieldClasses = classNames('amount', this.props.className, {
      'discounted': percDiscount > 0
    });    

    return (
      <section className="things-container">
        <header>
            <TextField id="txt_name" className="_name" floatingLabelText="Name" fullWidth={true} value={name} onChange={this.onThingChangeName.bind(this,this.props._index)}/>
            <div className="price-choser">
              <TextField id="amount" className={amountFieldClasses} floatingLabelText="Price" type="number" fullWidth={true} value={price-(price*percDiscount/100)} onChange={this.onThingChangePrice.bind(this,this.props._index)} />
              <TextField id="discount" className="discount" floatingLabelText="Discount" type="number" fullWidth={false} value={percDiscount} onChange={this.onDiscountChange.bind(this,this.props._index)} />
              <span className="discount-unit">%</span>
              <RaisedButton className="discount-remove" label={"RESET"} disabled={percDiscount === 0} onTouchTap={this.onDiscountedReset.bind(this,this.props._index)} />
              <section className="quantity-choser">  
                  <IconButton onTouchTap={this.handleDecrementQuantity.bind(this)}>
                      <RemoveCircleOutline color={red500} />
                  </IconButton> 
                  <span className="counter-label">{this.props.thing.quantity}x</span>   
                  <IconButton onTouchTap={this.handleIncrementQuantity.bind(this)}>
                      <AddCircleOutline color="#009688"/>
                  </IconButton>          
              </section>
            </div>
        </header>
        <p className="title">PARTECIPANTS</p>

          <div className="partecipants">
            <Checkbox className="selectAll" label="ALL" 
                      onCheck={this.onCheck.bind(this)} 
                      checkedIcon={<ActionFavorite />}
                      uncheckedIcon={<ActionFavoriteBorder />}       
                      checked={this.allPeoplePartecipants()}/>
            {this.renderPartecipants()}
          </div>

      </section>
    );
  }

  handleIncrementQuantity(e){
    e.preventDefault();
    this.props.handleQuantityForThing(this.props.thing,1);
  }

  handleDecrementQuantity(e){
    e.preventDefault();
    this.props.handleQuantityForThing(this.props.thing,-1);
  }

  allPeoplePartecipants(){
    if(!this.props.people || (!this.props.thing && !this.props.thing.partecipants)){
      return false;
    }

    let totalPeople = this.props.people.length;
    let partecipants = this.props.thing.partecipants.length;
    
    return totalPeople === partecipants;
  }

  onCheck(ctx,data){
    this.props.handleSelectAll(data,this.props.thing);
  }

  renderPartecipants(){
    return this.props.people.map((people,index) => {
      return (<PartecipantChooser key={index} people={people} thing={this.props.thing} handleSelectSingle={this.props.handleSelectSingle.bind(this)}/>);
    });
  }

  onThingChangeName(index,ctx){
     let newThing = Object.assign({}, this.props.thing);
     newThing.name = ctx.target.value;
     this.props.handleThingChange(newThing,index);
  }

  onThingChangePrice(index,ctx){
    let newThing = Object.assign({}, this.props.thing);
    newThing.price = parseFloat(ctx.target.value);
    newThing.percDiscount = 0;
    this.props.handleThingChange(newThing,index);
  }

  onDiscountChange(index,ctx){
    let newThing = Object.assign({}, this.props.thing);
    let percDiscount = parseFloat(ctx.target.value);
    if(isNaN(percDiscount))
      percDiscount = 0;

    newThing.percDiscount = percDiscount;
    this.props.handleThingChange(newThing,index);
  }

  onDiscountedReset(index,ctx){
    let newThing = Object.assign({}, this.props.thing);
    newThing.percDiscount = 0;
    this.props.handleThingChange(newThing,index);    
  }
}
