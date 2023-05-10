import React, { Component } from 'react';
import PropTypes, { node } from 'prop-types';
import { Typography } from '@material-ui/core';

class CustomSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      buttons,
      children,
      classes,
      inner,
      primary,
      secondary,
    } = this.props;

    return (
      <div className={inner ? classes.subsection : classes.section}>
        <div className={classes.container}>
          <div className={classes.heading}>
            <Typography
              className={inner ? classes.secondaryTitle : classes.primaryTitle}
              color={inner ? undefined : "primary"}
            >
              {primary}
            </Typography>
            <Typography className={classes.description}>
              {secondary}
            </Typography>
          </div>
          <div className={classes.buttons}>
            {buttons}
          </div>
        </div>
        {children}
      </div>
    )
  }
}

CustomSection.propTypes = {
  buttons: PropTypes.node,
  children: PropTypes.node.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  inner: PropTypes.bool,
  primary: PropTypes.string,
  secondary: PropTypes.object,
}
CustomSection.defaultProps = {
  buttons: null,
  classes: {},
  inner: false,
  primary: '',
  secondary: null,
}

export default CustomSection;
