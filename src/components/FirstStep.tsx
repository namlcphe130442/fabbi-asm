import React, {useState} from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as data from '../data/data';
import ButtonStep from './ButtonStep';

interface Props {
  activeStep: number;
  setActiveStep: ( (value: React.SetStateAction<number>) => void);
  steps: string[];
}

const FirstStep = ({ activeStep, setActiveStep, steps }: Props) => {

  const dataLocal :string|null = localStorage.getItem('OrderDetail');
  const orderDetail: OrderDetail = dataLocal !== null ? JSON.parse(dataLocal) : null;  

  const [mealValue, setMealValue] = useState(orderDetail.meal);
  const [peopleNumber, setPeopleNumber] = useState(orderDetail.people);

  const handleNext = () => {
    if(mealValue !== null && peopleNumber > 0 && peopleNumber <= 10){
      if(mealValue.name !== ''){
        if(mealValue !== orderDetail.meal){
          orderDetail.meal = mealValue;
          orderDetail.people = peopleNumber;
          orderDetail.restaurant= '';
          orderDetail.dishes=[];
          localStorage.setItem('OrderDetail', JSON.stringify(orderDetail));
        }
        setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
      }else{
        alert("Please Select a meal. Not empty!");
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  var meals: Array<Meal> = [];
  meals = data.MEALS;
  return (
    <>
      <h4>Please Select a meal</h4>
      <Autocomplete
        options={meals}
        getOptionLabel={(meal: Meal) => meal.name}
        style={{ width: '30%' }}
        renderInput={
          (params: any) => 
            <TextField 
              error={mealValue === null}
              helperText={(mealValue === null) ? 'Please again!' : ' '} 
              {...params} 
              label="Please Select a meal" 
              variant="outlined" 
            />
        }
        value={mealValue}
        getOptionSelected={(option, value) => option.id === value.id}
        onChange={(event, value: any) => setMealValue(value)}
      />
      <h4>Please Enter Number of people</h4>
      <TextField 
        value={peopleNumber}
        type="number"
        style={{ width: '30%' }}
        InputProps={{
            inputProps: { 
                max: 10, min: 1
            }
        }}
        label="Please Enter Number of people"
        onChange={(event: any) => setPeopleNumber(event.target.value)}
        error={peopleNumber <= 0 || peopleNumber > 10}
        helperText={(peopleNumber <= 0 || peopleNumber > 10) ? 'Please again!' : ' '}

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

export default FirstStep;