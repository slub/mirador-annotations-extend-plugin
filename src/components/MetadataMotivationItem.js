import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NativeSelect, FormControl, InputLabel } from '@material-ui/core';


class MetadataMotivationItem extends Component {
  constructor(props) {
    super(props);

    const motivation = ['commenting', 'tagging'];
    const motivationOption = 0;

    this.state = {
      motivation,
      motivationOption,
    }

    this.handleSelectedMotivationOption = this.handleSelectedMotivationOption.bind(this);

  }

  componentDidMount() {
    const { value } = this.props;

    switch (value) {
      case 'commenting':
        this.setState({ motivationOption: 0 });
        break;
      case 'tagging':
        this.setState({ motivationOption: 1 });
        break;
      case 'identifying':
        this.setState({ motivationOption: 2 });
        break;
      case 'describing':
        this.setState({ motivationOption: 3 });
        break;
      default:
        this.setState({ motivationOption: 0 });
        break;
    }
  }

  handleSelectedMotivationOption(e) {
    const { handleChange } = this.props;

    handleChange(e.target.value);
    switch (e.target.value) {
      case 'commenting':
        this.setState({ motivationOption: 0 });
        break;
      case 'tagging':
        this.setState({ motivationOption: 1 });
        break;
      case 'identifying':
        this.setState({ motivationOption: 2 });
        break;
      case 'describing':
        this.setState({ motivationOption: 3 });
        break;
      default:
        this.setState({ motivationOption: 0 });
        break;
    }

  }


  render() {
    const { t } = this.props;
    const {
      motivation,
      motivationOption,
    } = this.state;

    return (
      <FormControl>
        <InputLabel
          htmlFor='uncontrolled-native-target'
          variant="standard"
        >
          {t('motivation')}
        </InputLabel>
        <NativeSelect
          inputProps={{ name: 'motivation', id: 'uncontrolled-native-motivation' }}
          onChange={this.handleSelectedMotivationOption}
          value={motivation[motivationOption]}
        >
          {motivation.map((value, index) => (
            <option value={value}>{value}</option>
          ))}
        </NativeSelect>
      </FormControl>
    )
  }
}

MetadataMotivationItem.propTypes = {
  handleChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default MetadataMotivationItem;
