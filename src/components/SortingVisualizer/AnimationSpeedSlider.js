import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 150 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const marks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
];

const AnimationSpeedSlider = ({sortingSpeed, setSortingSpeed}) => {
  const classes = useStyles();
  const handleChange = (event, newSpeed) => {
    setSortingSpeed(newSpeed * -1 + 6);
  };

  return (
    <div className={classes.root}>
      <Slider
        // ValueLabelComponent={ValueLabelComponent}
        // valueLabelDisplay="on"
        onChange={handleChange}
        aria-label="custom thumb label"
        steps={5}
        defaultValue={3}
        min={1}
        max={5}
        marks={marks}
      />
    </div>
  );
}

export default AnimationSpeedSlider;