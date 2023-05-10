import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from '@material-ui/core';

class CustomListItem extends Component {

  render() {
    const {
      classes,
      primary,
      secondary,
      children,
      buttons
    } = this.props;

    return (
      <ListItem
        divider
        className={classes.container}
        {...this.props}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <ListItemText
            style={{ lineHeight: 1 }}
            primary={primary}
            primaryTypographyProps={{
              variant: 'body1'
            }}
            secondary={secondary}
            secondaryTypographyProps={{
              variant: "body2"
            }}
          />
          <div>
            {buttons}
          </div>
        </div>
        <div>
          {children}
        </div>
      </ListItem>
    )
  }
}

CustomListItem.propTypes = {
  buttons: PropTypes.node,
  children: PropTypes.node,
  classes: PropTypes.objectOf(PropTypes.string),
  primary: PropTypes.string,
  secondary: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}
CustomListItem.defaultProps = {
  buttons: null,
  children: null,
  classes: {},
  primary: '',
  secondary: null,
}

export default CustomListItem;
