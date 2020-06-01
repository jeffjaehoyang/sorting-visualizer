import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  Dialog, 
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField, 
  Select, 
  MenuItem,
  Input
}from '@material-ui/core'
import NavBar from '../NavBar/NavBar';
import { getBubbleSortAnimations, bubbleSort } from '../Algorithms/BubbleSort';
import { getMergeSortAnimations, mergeSort } from '../Algorithms/MergeSort';
import { getInsertionSortAnimations, insertionSort } from '../Algorithms/InsertionSort';
import { getSelectionSortAnimations, selectionSort } from '../Algorithms/SelectionSort';
import { AlgoStressTest } from '../Algorithms/AlgoStressTest';
import AlgorithmLoader from './AlgorithmLoader';
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  COMPLETED_COLOR,
  SORTING_SPEED_MS
} from '../../Configs';
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
            Feel free to run the test!
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
            <MenuItem value={'mergeSort'}>Merge Sort</MenuItem>
          </Select>
          <div style={{ minHeight: '25em', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <AlgorithmLoader algorithm={algorithm}/>
          </div>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}

const TestInterface = () => {
  const styles = useStyles()
  const [open, setOpen] = useState(false);
  const [algorithm, setAlgorithm] = useState('')

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