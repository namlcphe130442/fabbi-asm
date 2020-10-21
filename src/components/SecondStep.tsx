import React, {useState} from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as data from '../data/data';
import ButtonStep from './ButtonStep';

interface Props {
    activeStep: number;
    setActiveStep: ((value: React.SetStateAction<number>) => void);
    steps: string[];
}

const SecondStep = ({ activeStep, setActiveStep, steps }: Props) => {

  const dataLocal :string|null = localStorage.getItem('OrderDetail');
  const orderDetail: OrderDetail = dataLocal !== null ? JSON.parse(dataLocal) : null;
  const [restaurant, setRestaurant] = useState(orderDetail.restaurant);

  var dishes: Array<Dish> = [];
  dishes = data.DISHES;
  var restaurants: Array<string> = [];
  var meal = orderDetail.meal.name;
  
  dishes.forEach(dish => {
    if(!restaurants.includes(dish.restaurant) && dish.availableMeals.includes(meal))
      restaurants.push(dish.restaurant); 
  });  
  
  const handleNext = () => {
    if(restaurant !== '' && restaurant !== null){
      setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    }else{
      alert("Please Select a restaurant. Not empty!");
    }
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  }; 

  const handleChangeRestaurant = (value: any) => {
    setRestaurant(value);
    orderDetail.restaurant = value;
    localStorage.setItem('OrderDetail', JSON.stringify(orderDetail));
  }
  return (
    <>
       <h4>Please Select a Restaurant</h4>
      <Autocomplete
        id="combo-box-demo"
        options={restaurants}
        getOptionLabel={(restaurant: string) => restaurant}
        value={restaurant}
        style={{ width: '30%' }}
        renderInput={
          (params: any) => 
            <TextField 
              {...params} 
              error={restaurant === null}
              helperText={(restaurant === null) ? 'Please again!' : ' '}
              label="Please Select a Restaurant" 
              variant="outlined" 
            />
        }
        onChange={(event, value: any) => handleChangeRestaurant(value)}
      />
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

export default SecondStep;