import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import { getBubbleSortAnimations, bubbleSort } from '../Algorithms/BubbleSort';
import { getMergeSortAnimations, mergeSort } from '../Algorithms/MergeSort';
import { getInsertionSortAnimations, insertionSort } from '../Algorithms/InsertionSort';
import { getSelectionSortAnimations, selectionSort } from '../Algorithms/SelectionSort';
import { AlgoStressTest } from '../Algorithms/AlgoStressTest';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  testResultData : {
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '1px solid #e3e3e4',
    borderRadius: 10,
    padding: '1em',
    minHeight: '7em'
  }
}));

const ALGORITHM_MAP = {
  'bubbleSort' : bubbleSort, 
  'insertionSort' : insertionSort,
  'selectionSort' : selectionSort,
  'mergeSort' : mergeSort
}

const AlgorithmLoader = ({ algorithm }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [trueTestCount, setTrueTestCount] = useState(0);
  const [falseTestCount, setFalseTestCount] = useState(0);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      const sortingAlgorithm = ALGORITHM_MAP[algorithm]
      const [falseCount, trueCount] = AlgoStressTest(sortingAlgorithm, 100)
      setTrueTestCount(trueCount)
      setFalseTestCount(falseCount)
      if (trueCount === 100) {
        setSuccess(true)
        setLoading(false)
      } else {
        setLoading(false)
      }
    }
  };

  return (
    <React.Fragment>
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          className={buttonClassname}
          onClick={handleButtonClick}
          style={{ backgroundColor: 'turquoise', boxShadow: 'none' }}
        >
          {success ? <CheckIcon /> :'Go'}
        </Fab>
        {loading && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>
      { loading ? 'Testing ...': (success ? 'All tests passed!' : '100 random arrays generated. Ready to test.') }
    </div>
    <div className={classes.testResultData}>
      <span>Number of tests: 100</span>
      <span>Success: {trueTestCount}</span>
      <span>Failed: {falseTestCount}</span>
      {/* <span>Compared against Array.sort()</span> */}
    </div>
    </React.Fragment>
  );
}

export default AlgorithmLoader;