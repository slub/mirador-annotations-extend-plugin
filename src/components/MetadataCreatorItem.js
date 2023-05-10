import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';


class MetadataCreatorItem extends Component {
  constructor(props) {
    super(props);

    this.handleTextFieldInput = this.handleTextFieldInput.bind(this);
  }

  handleTextFieldInput(e) {
    const { handleChange } = this.props;

    handleChange(e.target.value);
  }


  render() {
    const {
      id,
      value,
    } = this.props;

    return (
      <TextField
        autoFocus
        id={id}
        value={value ? value : ''}
        onChange={this.handleTextFieldInput}
        variant="standard"
      />
    )
  }
}

MetadataCreatorItem.propTypes = {
  handleChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
}

MetadataCreatorItem.defaultProps = {
  value: '',
}

export default MetadataCreatorItem;
