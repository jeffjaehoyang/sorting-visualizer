import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
}from '@material-ui/core'
import NavBar from '../NavBar/NavBar';
import { getBubbleSortAnimations, bubbleSort } from '../Algorithms/BubbleSort';
import { getMergeSortAnimations, mergeSort } from '../Algorithms/MergeSort';
import { getInsertionSortAnimations, insertionSort } from '../Algorithms/InsertionSort';
import { getSelectionSortAnimations, selectionSort } from '../Algorithms/SelectionSort';
import { AlgoStressTest } from '../Algorithms/AlgoStressTest';
import TestInterface from './TestInterface';
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  COMPLETED_COLOR,
  SORTING_SPEED_MS
} from '../../Configs';
import {
  PlainButton,
  SlowButton, 
  FastButton,
  VeryFastButton,
} from '../../CustomButtons';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SyncIcon from '@material-ui/icons/Sync';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    height: '75vh',
  },
  dataBox: {
    border: '1px solid #e3e3e4',
    borderRadius: 10,
    display: 'flex', 
    justifyContent: 'space-around',
    alignItems: 'center',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    marginRight: '1em',
    // marginTop: '1em',
    padding: '1em'
  },
  dataContainer: {
    justifyContent: 'center',
  },
  dataBar: {
    backgroundColor: '#c5e1a4',
    marginRight: '2px',
    maxHeight: '80vh',
    display: 'inline-block',
    width: '3px'
  },
  controllerBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto', 
    marginRight: 'auto'
  }
}))

const SortingVisualizer = () => {
  const styles = useStyles()
  const [currentArray, setCurrentArray] = useState([])
  const [arrayDensity, setArrayDensity] = useState(175)
  const [runningTime, setRunningTime] = useState(0)
  const [currentAlgo, setCurrentAlgo] = useState('Not Selected')
  const [disableControlBtns, setDisableControlBtns] = useState(false)
  
  useEffect(() => {
    const randomArray = Array(arrayDensity).fill().map(() => Math.round(Math.random() * 500))
    setCurrentArray(randomArray)
    setArrayDensity(randomArray.length)
    // console.log(AlgoStressTest(insertionSort, 50))
  }, [])

  const handleReset = () => {
    setCurrentArray(Array(arrayDensity).fill().map(() => Math.round(Math.random() * 500)))
    setCurrentAlgo('Not Selected')
    const dataBars = document.querySelectorAll('#dataBar')
    dataBars.forEach((dataBar) => {
      dataBar.style.backgroundColor = PRIMARY_COLOR
    })
  }

  const startBubbleSort = () => {
    setCurrentAlgo('Bubble Sort')
    setDisableControlBtns(prev => !prev)
    const [animations, sortedArray] = getBubbleSortAnimations(currentArray);
    for (let i = 0; i < animations.length; i++) {
        const changeColor = (i % 4 === 0) || (i % 4 === 1);
        const dataBars = document.querySelectorAll('#dataBar');
        if(changeColor) { // change dataBar's color
            const updatedColor = (i % 4 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
            const [indexOne, indexTwo, inPlace] = animations[i];
            const barOneStyle = dataBars[indexOne].style;
            const barTwoStyle = dataBars[indexTwo].style;
            setTimeout(() => {
              barOneStyle.backgroundColor = updatedColor;
              inPlace ? barTwoStyle.backgroundColor = COMPLETED_COLOR : barTwoStyle.backgroundColor = updatedColor;
            }, i * SORTING_SPEED_MS);
        }
        else { // change dataBar's height
            const [barIndex, newHeight] = animations[i];
            if (barIndex === null || newHeight === null) continue
            const barStyle = dataBars[barIndex].style;
            setTimeout(() => {
                barStyle.height = `${newHeight}px`;
            }, i * SORTING_SPEED_MS);  
        }
    }
    const completionTime = parseInt(SORTING_SPEED_MS*animations.length + 1000);
    setTimeout(() => {
      setDisableControlBtns(prev => !prev)
    }, completionTime)
  }

  const startInsertionSort = () => { 
    setCurrentAlgo('Insertion Sort')
    setDisableControlBtns(prev => !prev)
    const [animations, sortedArray] = getInsertionSortAnimations(currentArray);
    for (let i = 0; i < animations.length; i++) {
        const message = animations[i][0];
        const dataBars = document.querySelectorAll('#dataBar');
        if(message === 'color') { // change dataBar's color
            const [message, indexOne, indexTwo] = animations[i];
            const updatedColor = (i % 6 === 0) || (i % 6 === 2) ? SECONDARY_COLOR : PRIMARY_COLOR;
            if (indexOne === null || indexTwo === null) continue
            const barOneStyle = dataBars[indexOne].style;
            const barTwoStyle = dataBars[indexTwo].style;
            setTimeout(() => {
              barOneStyle.backgroundColor = updatedColor;
              barTwoStyle.backgroundColor = updatedColor;
            }, i * SORTING_SPEED_MS);
        }
        else { // change dataBar's height
            const [message, barIndex, newHeight] = animations[i];
            if (barIndex === null || newHeight === null) continue
            const barStyle = dataBars[barIndex].style;
            setTimeout(() => {
                barStyle.height = `${newHeight}px`;
            }, i * SORTING_SPEED_MS);  
        }
    }
    const completionTime = parseInt(SORTING_SPEED_MS*animations.length);
    setTimeout(() => {
      const dataBars = document.querySelectorAll('#dataBar');
      dataBars.forEach(item => {
        item.style.backgroundColor = COMPLETED_COLOR;
      })
      setDisableControlBtns(prev => !prev)
    }, completionTime)
  }

  const startSelectionSort = () => { 
    setCurrentAlgo('Selection Sort')
    setDisableControlBtns(prev => !prev)
    const [animations, sortedArray] = getSelectionSortAnimations(currentArray);
    for (let i = 0; i < animations.length; i++) {
        const message = animations[i][0];
        const dataBars = document.querySelectorAll('#dataBar');
        if (message === 'compare') {
          const [message, color, indexOne] = animations[i];
          const updatedColor = color === 'primary' ? PRIMARY_COLOR : SECONDARY_COLOR;
          const barOneStyle = dataBars[indexOne].style;
          setTimeout(() => {
            barOneStyle.backgroundColor = updatedColor;
          }, i * SORTING_SPEED_MS);
        } else if (message === 'sorted') {
          const [message, indexOne] = animations[i];
          const barOneStyle = dataBars[indexOne].style;
          setTimeout(() => {
            barOneStyle.backgroundColor = COMPLETED_COLOR;
          }, i * SORTING_SPEED_MS);
        } else { // change dataBar's height
          const [message, barIndex, newHeight] = animations[i];
          const barStyle = dataBars[barIndex].style;
          setTimeout(() => {
              barStyle.height = `${newHeight}px`;
          }, i * SORTING_SPEED_MS);  
        }
    }
    const completionTime = parseInt(SORTING_SPEED_MS*animations.length);
    setTimeout(() => {
      const dataBars = document.querySelectorAll('#dataBar');
      dataBars.forEach(item => {
        item.style.backgroundColor = COMPLETED_COLOR;
      })
      setDisableControlBtns(prev => !prev)
    }, completionTime)
  }

  const startMergeSort = () => {
    setCurrentAlgo('Merge Sort')
    setDisableControlBtns(prev => !prev)
    const [animations, sortedArray] = getMergeSortAnimations(currentArray);
    for (let i = 0; i < animations.length; i++) {
        const changeColor = (i % 3 !== 2);
        const dataBars = document.querySelectorAll('#dataBar');
        if(changeColor === true) {
            const [indexOne, indexTwo] = animations[i];
            const color = (i % 3 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
            const barOneStyle = dataBars[indexOne].style;
            const barTwoStyle = dataBars[indexTwo].style;
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            },i * SORTING_SPEED_MS);
            
        }
        else {
            setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = dataBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
              },i * SORTING_SPEED_MS);
        }
    }
    const completionTime = parseInt(SORTING_SPEED_MS*animations.length/2 + 2500);
    setTimeout(() => {
      const dataBars = document.querySelectorAll('#dataBar');
      dataBars.forEach(item => {
        item.style.backgroundColor = COMPLETED_COLOR;
      })
      setDisableControlBtns(prev => !prev)
    }, completionTime)
  }

  return (
    <React.Fragment>
      <NavBar />
      <div style={{ height: '90vh', padding: '1em' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '1em' }}>
          <Grid item className={styles.dataBox} xs={12} md={6}>
            <span>Dataset size: {currentArray.length}</span>
            <span>Sorting Algorithm: {currentAlgo}</span>
            <span>Time: {runningTime} secs</span>
          </Grid>
          <TestInterface />
        </div>
        <div className={styles.root}>
          <Grid item xs={11} md={9} className={styles.dataContainer}>
            {currentArray.map((item, index) => {
              return <div key={index} className={styles.dataBar} id='dataBar' style={{ height: `${item}px` }} />
            })}
          </Grid>
        </div>
        <Grid item className={styles.controllerBtn} xs={12}>
          <PlainButton onClick={handleReset} disabled={disableControlBtns} style={{ marginRight: '1em' }} startIcon={<SyncIcon />} variant='outlined' size='small'>
            Generate New Dataset
          </PlainButton>
          <SlowButton onClick={startBubbleSort} disabled={disableControlBtns} style={{ marginRight: '1em' }} startIcon={<PlayCircleOutlineIcon />} variant='outlined' size='small'>
            Bubble Sort
          </SlowButton>
          <SlowButton onClick={startInsertionSort} disabled={disableControlBtns} style={{ marginRight: '1em' }} startIcon={<PlayCircleOutlineIcon />} variant='outlined' size='small'>
            Insertion Sort
          </SlowButton>
          <SlowButton onClick={startSelectionSort} disabled={disableControlBtns} style={{ marginRight: '1em' }} startIcon={<PlayCircleOutlineIcon />} variant='outlined' size='small'>
            Selection Sort
          </SlowButton>
          <FastButton onClick={startMergeSort} disabled={disableControlBtns} style={{ marginRight: '1em' }} startIcon={<PlayCircleOutlineIcon />} variant='outlined' size='small'>
            Merge Sort
          </FastButton>
          <FastButton onClick={startBubbleSort} disabled={disableControlBtns} style={{ marginRight: '1em' }} startIcon={<PlayCircleOutlineIcon />} variant='outlined' size='small'>
            Quick Sort
          </FastButton>
          <FastButton onClick={startBubbleSort} disabled={disableControlBtns} style={{ marginRight: '1em' }} startIcon={<PlayCircleOutlineIcon />} variant='outlined' size='small'>
            Heap Sort
          </FastButton>
          <VeryFastButton onClick={startBubbleSort} disabled={disableControlBtns} style={{ marginRight: '1em' }} startIcon={<PlayCircleOutlineIcon />} variant='outlined' size='small'>
            Bucket Sort
          </VeryFastButton>
          <VeryFastButton onClick={startBubbleSort} disabled={disableControlBtns} style={{ marginRight: '1em' }} startIcon={<PlayCircleOutlineIcon />} variant='outlined' size='small'>
            Radix Sort
          </VeryFastButton>
        </Grid>
      </div>
    </React.Fragment>
  )
}

export default SortingVisualizer;
