import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
}from '@material-ui/core'
import NavBar from '../NavBar/NavBar';
import {getBubbleSortAnimations} from '../../BubbleSort';
// import {bubbleSort} from '../../BubbleSort';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    height: '75vh',
  },
  dataBox: {
    width: '50%',
    minHeight: '2.5em',
    border: '1px solid black',
    display: 'flex', 
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '1em',
    padding: '1em'
  },
  dataContainer: {
    display: 'flex', 
    justifyContent: 'center',
  },
  dataBar: {
    backgroundColor: '#c5e1a4',
    margin: '0 1px',
    maxHeight: '80vh',
    display: 'inline-block',
  },
  controllerBtn: {
    position: 'absolute',
    bottom: '1em',
    right: '1em'
  }
}))

const PRIMARY_COLOR = '#c5e1a4'; //Normal color of bars
const SECONDARY_COLOR = '#e1a4a6'; //Color of bars when they are being compared
const COMPLETED_COLOR = '#c1a4e1';
const ANIMATION_SPEED_MS = 1; //Animation Speed (how fast color changes, how fast height gets overwritten)

const SortingVisualizer = () => {
  const styles = useStyles()
  const [currentArray, setCurrentArray] = useState([])
  const [arrayDensity, setArrayDensity] = useState(150)
  const [runningTime, setRunningTime] = useState(0)
  const [arrayAccess, setArrayAccess] = useState(0)
  const [disableControlBtns, setDisableControlBtns] = useState(false)
  
  useEffect(() => {
    const randomArray = Array(arrayDensity).fill().map(() => Math.round(Math.random() * 500))
    setCurrentArray(randomArray)
    setArrayDensity(randomArray.length)
  }, [])

  const handleReset = () => {
    setCurrentArray(Array(arrayDensity).fill().map(() => Math.round(Math.random() * 500)))
    setArrayAccess(0)
    const dataBars = document.querySelectorAll('#dataBar')
    dataBars.forEach((dataBar) => {
      dataBar.style.backgroundColor = PRIMARY_COLOR
    })
  }

  const bubbleSort = () => {
    setDisableControlBtns(prev => !prev)
    const [animations, sortArray] = getBubbleSortAnimations(currentArray);
    for (let i = 0; i < animations.length; i++) {
        const isColorChange = (i % 4 === 0) || (i % 4 === 1);
        const dataBars = document.querySelectorAll('#dataBar');
        if(isColorChange === true) {
            const color = (i % 4 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
            const [barOneIndex, barTwoIndex, inPlace] = animations[i];
            const barOneStyle = dataBars[barOneIndex].style;
            const barTwoStyle = dataBars[barTwoIndex].style;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              inPlace ? barTwoStyle.backgroundColor = COMPLETED_COLOR : barTwoStyle.backgroundColor = color;
              setArrayAccess(prev => prev+1)
            },i * ANIMATION_SPEED_MS);
        }
        else {
            const [barIndex, newHeight] = animations[i];
            if (barIndex === -1) {
                continue;
            }
            const barStyle = dataBars[barIndex].style;
            setTimeout(() => {
                barStyle.height = `${newHeight}px`;
                setArrayAccess(prev => prev+1)
            },i * ANIMATION_SPEED_MS);  
        }
    }
    const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 3000);
    setTimeout(() => {
      setDisableControlBtns(prev => !prev)
    }, RESTORE_TIME)
  } 

  return (
    <React.Fragment>
      <NavBar />
      <div className={styles.dataBox}>
        <span>Dataset size: {currentArray.length}</span>
        <span>Array access: {arrayAccess}</span>
        <span>Time: {runningTime} secs</span>
      </div>
      <div className={styles.root}>
        <Grid container xs={11} md={9} className={styles.dataContainer}>
          {currentArray.map((item, index) => {
            return <div key={index} className={styles.dataBar} id="dataBar" style={{ height: `${item}px`, width: '4px' }} />
          })}
        </Grid>
      </div>
      <div className={styles.controllerBtn}>
        <Button onClick={handleReset} id="generateBtn" disabled={disableControlBtns}>
          Generate New Dataset
        </Button>
        <Button onClick={bubbleSort} id="bubbleSortBtn" disabled={disableControlBtns}>
          Bubble Sort
        </Button>
      </div>
    </React.Fragment>
  )
}

export default SortingVisualizer;
