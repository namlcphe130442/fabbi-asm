import React from 'react';
import ButtonStep from './ButtonStep';

interface Props {
  activeStep: number;
  setActiveStep: ((value: React.SetStateAction<number>) => void);
  steps: string[];
}

const FourthStep = ({ activeStep, setActiveStep, steps }: Props) => {

  const dataLocal :string|null = localStorage.getItem('OrderDetail');
  const orderDetail: OrderDetail = dataLocal !== null ? JSON.parse(dataLocal) : null;

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  return(
    <>
      <div> Meal: <span>{orderDetail.meal.name}</span> </div>
      <div> No of People: <span>{orderDetail.people}</span> </div>
      <div> Restaurant: <span>{orderDetail.restaurant}</span> </div>
      <div> 
        <span>Dishes:</span> 
        <ul style={{border: '1px black'}}> 
          {orderDetail.dishes.map((item, index) => (
            <li key={index}> <span> {item.name} </span> - <span>{item.numOfDish}</span></li>
          ))}
        </ul>
      </div>
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

export default FourthStep;