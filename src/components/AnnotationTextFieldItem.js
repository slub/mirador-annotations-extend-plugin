import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

class AnnotationTextFieldItem extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { updateValue } = this.props;

    if (updateValue) {
      updateValue(e.target.value);
    }
  }

  render() {
    const { value } = this.props;

    return (
      <TextField
        autoFocus
        hiddenLabel
        onChange={this.onChange}
        size="small"
        style={value ? { width: (value.length * 7.5) } : { width: 10 }}
        value={value}
        variant="standard"
      />
    )
  }
}

AnnotationTextFieldItem.propTypes = {
  updateValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default AnnotationTextFieldItem;
