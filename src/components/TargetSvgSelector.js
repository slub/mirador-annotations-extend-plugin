import PropTypes from "prop-types"
import React, { Component } from 'react';
import AnnotationSvgDrawing from '../containers/AnnotationSvgDrawing';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import RectangleIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CircleIcon from '@material-ui/icons/RadioButtonUnchecked';
import GestureIcon from '@material-ui/icons/Gesture';
import { Radio } from '@material-ui/core';
import { Collapse } from '@material-ui/core';

class SelectorTools extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      activeTool,
      blockTargetHover,
    } = this.props;

    if (activeTool !== 'edit') {
      blockTargetHover(true);
    }
  }

  componentWillUnmount() {
    const { blockTargetHover } = this.props;

    blockTargetHover(false);
  }

  render() {
    const {
      activeTool,
      changeColor,
      changeTool,
      colors,
      strokeColor,
      t,
      // add key, nörgels about missing key
    } = this.props;

    return (
      <>
        <div>
          <ToggleButtonGroup
            aria-label={t('targetTools_selection')}
            exclusive
            onChange={changeTool}
            value={activeTool}
          >
            <ToggleButton
              aria-label={t('targetTools_rectangle')}
              disabled={activeTool == 'edit'}
              value="rectangle"
            >
              <RectangleIcon />
            </ToggleButton>
            <ToggleButton
              aria-label={t('targetTools_ellipse')}
              disabled={activeTool == 'edit'}
              value="ellipse"
            >
              <CircleIcon />
            </ToggleButton>
            <ToggleButton
              aria-label={t('targetTools_freehand')}
              disabled={activeTool == 'edit'}
              value="freehand"
            >
              <GestureIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div>
          {colors.map((value, index) => (
            <Radio
              aria-label={t('targetTools_color', { color: value })}
              checked={strokeColor == value}
              disabled={activeTool == 'edit'}
              key={index}
              onChange={changeColor}
              style={activeTool !== 'edit' ? { color: `${value}` } : {}}
              value={value}
            />
          ))}
        </div>
      </>
    )
  }
}

SelectorTools.propTypes = {
  activeTool: PropTypes.string.isRequired,
  blockTargetHover: PropTypes.func.isRequired,
  changeColor: PropTypes.func.isRequired,
  changeTool: PropTypes.func.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  strokeColor: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}


class TargetSvgSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTool: 'rectangle',
      strokeColor: "#cc0000",
      strokeWidth: 3,
      closedMode: true,
    }

    this.changeTool = this.changeTool.bind(this);
    this.updateGeometry = this.updateGeometry.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  componentDidMount() {
    const { value } = this.props;

    if (value) {
      this.setState({ activeTool: 'edit' });
    }
  }

  changeTool(e, tool) {
    const { activeTool } = this.state;

    if (activeTool !== 'edit') {
      this.setState({
        activeTool: tool,
      });
    };
    switch (tool) {
      case 'rectangle':
        this.setState({ closedMode: true });
        break;
      case 'ellipse':
        this.setState({ closedMode: true });
        break;
      case 'freehand':
        this.setState({ closedMode: false });
        break;
      default:
        break;
    }

  }

  changeColor(e) {
    this.setState({ strokeColor: e.target.value });
  }

  updateGeometry({ svg }) {
    const { updateValue, blockTargetHover } = this.props;
    const { activeTool } = this.state;

    if (svg && activeTool !== 'edit') {
      this.setState({ activeTool: 'edit' });
    }
    updateValue({ value: svg });
    blockTargetHover(false);
  }

  render() {
    const {
      blockTargetHover,
      classes,
      edit,
      hover,
      t,
      targetId,
      value,
      windowId,
    } = this.props;

    const {
      activeTool,
      closedMode,
      strokeColor,
      strokeWidth,
    } = this.state;

    const colors = ["#cc0000", "#fcba03", "#32c784", "#403df2"];

    return (
      <div className={classes.selector}>
        <Collapse
          className={classes.editAnnotationCollapse}
          in={edit}
          unmountOnExit
        >
          {
            edit && (
              <SelectorTools
                activeTool={activeTool}
                blockTargetHover={blockTargetHover}
                changeTool={this.changeTool}
                changeColor={this.changeColor}
                colors={colors}
                key={`${targetId}-tools`}
                strokeColor={strokeColor}
                t={t}
              />
            )
          }
        </Collapse>
        {
          (edit || hover) && (
            <AnnotationSvgDrawing
              activeTool={activeTool}
              closed={closedMode}
              edit={edit}
              strokeColor={strokeColor}
              strokeWidth={strokeWidth}
              svg={value}
              updateGeometry={this.updateGeometry}
              windowId={windowId}
            />
          )
        }
      </div>
    )
  }
};

TargetSvgSelector.propTypes = {
  blockTargetHover: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  edit: PropTypes.bool.isRequired,
  hover: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  targetId: PropTypes.string.isRequired,
  updateValue: PropTypes.func.isRequired,
  value: PropTypes.string,
  windowId: PropTypes.string.isRequired,
}
TargetSvgSelector.defaultProps = {
  classes: {},
  value: null,
};

export default TargetSvgSelector;
