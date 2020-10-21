import React, { useState } from 'react';
import ButtonStep from './ButtonStep';
import OrderItem from './OrderItem';
import * as data from '../data/data';


interface Props {
    activeStep: number;
    setActiveStep: ((value: React.SetStateAction<number>) => void);
    steps: string[];
}
const orderItems: Array<Order> = [];

const ThirdStep = ({ activeStep, setActiveStep, steps }: Props) => {

  const [isAdd, setIsAdd] = useState(false);
  const dataLocal :string|null = localStorage.getItem('OrderDetail');
  const orderDetail: OrderDetail = dataLocal !== null ? JSON.parse(dataLocal) : null;
  
  var meal = orderDetail.meal.name;
  var restaurant = orderDetail.restaurant;

  var dishes: Array<Dish> = [];
  dishes = data.DISHES;

  var dishOrder: Array<string> = [];
  dishes.forEach(dish => {
    if(restaurant === dish.restaurant && dish.availableMeals.includes(meal))
    dishOrder.push(dish.name);
  });   

  const s4 = () => {
    return Math.floor((1+ Math.random()) * 0x10000).toString(16).substring(1);
  }

  const generateId = () => {
      return s4() + s4() + '-' + s4() + '-' + s4() + s4() + '-' + s4()
  }

  const showOrder = () => {
    if(orderItems.length === 0){
      const dishNew: Order = { id: generateId(), name: '', numOfDish: 1 };
      orderItems.push(dishNew);
      return <OrderItem orderItems={orderItems} dishOrder={dishOrder} dish={dishNew}/>;
    }else{
      return(
        orderItems.map( (dish, index) => (
          <div key={dish.id}>
            <OrderItem orderItems={orderItems} key={dish.id} dishOrder={dishOrder} dish={dish}/><br/>
          </div>
        ))
      );
    }
  }

  const handleNext = () => {
    var error = false;
    var total = 0;
    orderItems.forEach(item => {
      total += +item.numOfDish;
      if(item.name === '' || item.name === null){ error = true;}
    });    
    if(error){
      alert('Please Select a Dish. Not empty!');
    }else if(total > 10){
      alert('The total number of dishes should be maximum of 10 is allowed')
    }else if(total < orderDetail.people){
      alert('The total number of dishes should be greater or equal to the number of people selected in the first step ')
    }else{
      orderDetail.dishes=orderItems;
      localStorage.setItem('OrderDetail', JSON.stringify(orderDetail));
      setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    }    
    
  };

  const handleBack = () => {
    orderItems.length = 0;
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  }; 

  const handleAddClick = () => {
    var error = false;
    orderItems.forEach(item => {
      if(item.name === '' || item.name === null){ error = true; return;}
    });
    if(error){
      alert('Please Select a Dish. Not empty!');
    }else{
      if(dishOrder.length === orderItems.length){
        alert('The restaurant has only '+ dishOrder.length +' suitable dishes for you to choose from');
      }else{
        setIsAdd(!isAdd);
      }
    }
  }

  const add = () => {
    const dishNew: Order = { id: generateId(), name: '', numOfDish: 1 };
    orderItems.push(dishNew);
    setIsAdd(false);
    return <OrderItem orderItems={orderItems} dishOrder={dishOrder} dish={dishNew}/>;
  }
  return (
    <>
      {showOrder()}
      <br/>
      {
        (isAdd) && add()
      }     
      <br/>
      <button onClick={handleAddClick}>Add</button>
      <br/><br/>
      <ButtonStep
        activeStep={activeStep}
        handleBack={handleBack}
        handleNext={handleNext}
        steps={steps}
      />
    </>
  );
}

export default ThirdStep;