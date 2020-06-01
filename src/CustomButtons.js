import { withStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

export const PlainButton = withStyles({
  root: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    '&:hover': {
      backgroundColor: 'transparent',
    }
  },
  label: {
    textTransform: 'capitalize'
  }
})(Button);

export const SlowButton = withStyles({
  root: {
    backgroundColor: 'rgba(247, 251, 213, 0.5)',
    borderRadius: 5,
    '&:hover': {
      backgroundColor: 'rgba(247, 251, 213, 0.5)',
    }
  },
  label: {
    textTransform: 'capitalize'
  }
})(Button);

export const FastButton = withStyles({
  root: {
    backgroundColor: 'rgba(251, 236, 213, 0.5)',
    borderRadius: 5,
    '&:hover': {
      backgroundColor: 'rgba(251, 236, 213, 0.5)',
    }
  },
  label: {
    textTransform: 'capitalize'
  }
})(Button);

export const VeryFastButton = withStyles({
  root: {
    backgroundColor: 'rgba(251, 217, 213, 0.5)',
    borderRadius: 5,
    '&:hover': {
      backgroundColor: 'rgba(251, 217, 213, 0.5)',
    }
  },
  label: {
    textTransform: 'capitalize'
  }
})(Button);

export const TestButton = withStyles({
  root: {
    backgroundColor: 'rgba(208, 209, 211, 0.5)',
    borderRadius: 20,
    '&:hover': {
      backgroundColor: 'rgba(208, 209, 211, 0.5)',
    },
    height: '3em'
  },
  label: {
    textTransform: 'capitalize'
  }
})(Button);