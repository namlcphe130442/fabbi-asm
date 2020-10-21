import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, Button, Typography} from '@material-ui/core';
import './App.css';
import FirstStep from './components/FirstStep';
import SecondStep from './components/SecondStep';
import ThirdStep from './components/ThirdStep';
import FourthStep from './components/FourthStep';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(5),
      margin: theme.spacing(3),
      border: '2px solid #ccc',
      alignItems: 'center',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

function getSteps() {
  return ['Step 1', 'Step 2', 'Step 3', 'Review'];
}

const App = () => {

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <FirstStep activeStep={activeStep} setActiveStep={setActiveStep} steps={steps}/>;
      case 1:
        return <SecondStep activeStep={activeStep} setActiveStep={setActiveStep} steps={steps}/>;
      case 2:
        return <ThirdStep activeStep={activeStep} setActiveStep={setActiveStep} steps={steps}/>;
      default:
        return <FourthStep activeStep={activeStep} setActiveStep={setActiveStep} steps={steps}/>;
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>{getStepContent(activeStep)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
