import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog, 
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select, 
  MenuItem,
  Input,
  DialogActions,
  Button
}from '@material-ui/core'
import AlgorithmLoader from './AlgorithmLoader';
import {
  TestButton
} from '../../CustomButtons';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh',
  },
}))

const FormDialog = ({ open, algorithm, handleChange, handleClose }) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Test the Algorithms</DialogTitle>
        <DialogContent>
          <DialogContentText>
            I wrote randomized stress tests to ensure that the algorithms are properly implemented.
            Feel free to run the test on different algorithms!
          </DialogContentText>
          <Select
            labelId="demo-dialog-select-label"
            id="demo-dialog-select"
            value={algorithm}
            onChange={handleChange}
            input={<Input />}
            fullWidth
          >
            <MenuItem value={'bubbleSort'}>Bubble Sort</MenuItem>
            <MenuItem value={'insertionSort'}>Insertion Sort</MenuItem>
            <MenuItem value={'selectionSort'}>Selection Sort</MenuItem>
            <MenuItem value={'quickSort'}>Quick Sort</MenuItem>
            <MenuItem value={'mergeSort'}>Merge Sort</MenuItem>
          </Select>
          <div style={{ minHeight: '25em', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <AlgorithmLoader algorithm={algorithm}/>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const TestInterface = () => {
  const styles = useStyles()
  const [open, setOpen] = useState(false);
  const [algorithm, setAlgorithm] = useState('bubbleSort')

  const handleChange = (e) => {
    setAlgorithm(e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <FormDialog open={open} algorithm={algorithm} handleChange={handleChange} handleClose={handleClose} />
      <TestButton onClick={handleClickOpen} variant='outlined' size='medium' endIcon={<OfflineBoltIcon />}>
        Run Test
      </TestButton>
    </React.Fragment>
  )
}

export default TestInterface;