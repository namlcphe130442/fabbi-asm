import React from 'react'
import { Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


interface Props {
    activeStep: number;
    handleBack?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
    handleNext?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
    steps: string[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backButton: {
      marginRight: theme.spacing(1),
    },
  }),
);

const ButtonStep = ({ activeStep, handleBack, handleNext, steps }: Props) => {
    const classes = useStyles();
    return (
        <>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
        </>
    )
}

export default ButtonStep;
