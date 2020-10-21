import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Props {
  dishOrder: Array<string>;
  dish: Order;
  orderItems: Array<Order>;
}

const OrderItem = ({ dishOrder, dish, orderItems }: Props) => {  

  const [dishValue, setDishValue] = useState(dish.name);
  const [numOfDishValue, setNumOfDishValue] = useState(dish.numOfDish);

  const handleChangeDish = (value: string|null) => {
    console.log( value);
    
    var check = false;
    orderItems.forEach(item => {
      if(item.name === value){
        check = true; 
        return;
      }
    });
    if(check===false){
      dish.name = value;
      setDishValue(value);
    }else{
      alert('not');
      setDishValue('');
      
    }
  }

  const handleChangeNumber = (event: any) => {
    dish.numOfDish = event.target.value;
    setNumOfDishValue(event.target.value);
  }

  return (
    <div style={{display: 'flex'}}>
      <Autocomplete
        id="combo-box-demo"
        options={dishOrder}
        getOptionLabel={(dishOrder: string) => dishOrder}
        value={dishValue}
        style={{ width: '30%' }}
        renderInput={
          (params: any) => 
          <TextField 
            {...params} 
            label="Please Select a Dish" 
            variant="outlined" 
          />
        }
        onChange={(event, value: string|null) => handleChangeDish(value)}
      />
      <TextField 
        type="number"
        style={{ width: '20%', marginLeft: '2%' }}
        InputProps={{
            inputProps: { 
                max: 10, min: 1
            }
        }}
        value={numOfDishValue}
        label="Please Enter no. of servings"
        onChange={(event: any) => handleChangeNumber(event)}
      />
    </div>
  );
}

export default OrderItem;