import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Check } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import TargetSvgSelector from '../containers/TargetSvgSelector';
import ColorIcon from '../icons/Color';
import CustomListItem from '../containers/CustomListItem';
import MiradorMenuButton from 'mirador/dist/es/src/containers/MiradorMenuButton';

class AnnotationTargetItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: null,
      hover: false,
    }

    this.confirm = this.confirm.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.updateTargetValue = this.updateTargetValue.bind(this);
  }

  componentDidMount() {
    const {
      handleEdit,
      target,
    } = this.props;

    if (!target.value) {
      handleEdit(target._temp_id, 'target');
    }
    if (target.type) {
      switch (target.type) {
        case 'SvgSelector':
          if (target.value) {
            var val = target.value.split('stroke="');
            this.setState({ color: val[1].substr(0, 7) })
          }
          break;
        default:
          break;
      }
    }
  }

  componentWillUnmount() {
    const { handleEdit } = this.props;

    if (this.editing()) {
      handleEdit(null, 'target');
    }
  }

  edit() {
    const {
      handleEdit,
      target,
    } = this.props;

    handleEdit(target._temp_id, 'target');
  }

  updateTargetValue({ value }) {
    const {
      target,
      updateContent
    } = this.props;

    if (value && target.type == 'SvgSelector') {
      var val = value.split('stroke="');
      this.setState({ color: val[1].substr(0, 7) });
    }

    updateContent('target', { value: value, type: target.type, _temp_id: target._temp_id, _temp_name: target._temp_name }, target._temp_id);
  }

  confirm() {
    const { handleEdit } = this.props;

    handleEdit(null, 'target');
  }

  editing() {
    const {
      edit,
      target,
    } = this.props;

    return target._temp_id == edit;
  }

  delete() {
    const {
      handleDelete,
      target,
    } = this.props;

    handleDelete('target', target._temp_id);
  }

  /**
   * use hoverBlock as dirty fix to prevent rendering failure
   * blocks hover effect on targets as long as in editing mode and no drawn target
   */
  renderSvgSelector() {
    const {
      hoverBlock,
      t,
      target,
      blockTargetHover,
      windowId,
    } = this.props;

    const {
      color,
      hover,
    } = this.state;

    const edit = this.editing();

    return (
      <CustomListItem
        onMouseEnter={() => this.props.edit !== null && hoverBlock ? {} : this.setState({ hover: true })}
        onMouseLeave={() => this.props.edit !== null && hoverBlock ? {} : this.setState({ hover: false })}
        buttons={
          <>
            <MiradorMenuButton
              aria-label={
                edit
                  ? t('targetBtn_confirm')
                  : t('targetBtn_edit')
              }
              size="small"
              onClick={() => edit ? this.confirm() : this.edit()}
            >
              {
                edit
                  ? <Check />
                  : <EditIcon />
              }
            </MiradorMenuButton>
            <MiradorMenuButton
              aria-label={t('targetBtn_delete')}
              size="small"
              onClick={this.delete}
            >
              <DeleteIcon />
            </MiradorMenuButton>
          </>
        }
        primary={target._temp_name}
        secondary={
          color
            ? (
              <>
                {t('color')}
                <ColorIcon
                  style={{
                    color: color,
                    marginLeft: '25px'
                  }}
                />
              </>
            )
            : target.value
        }
      >
        <TargetSvgSelector
          edit={edit}
          hover={hover}
          blockTargetHover={blockTargetHover}
          key={`${target._temp_id}-SvgSelector`}
          targetId={target._temp_id}
          updateValue={this.updateTargetValue}
          value={target.value}
          windowId={windowId}
        />
      </CustomListItem>
    )
  }

  render() {
    const { target } = this.props;

    return (
      <>
        {(() => {
          switch (target.type) {
            case 'SvgSelector':
              return this.renderSvgSelector();
            default:
              return null;
          }
        })()}
      </>
    )
  }
}

AnnotationTargetItem.propTypes = {
  blockTargetHover: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  edit: PropTypes.string,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  hoverBlock: PropTypes.bool,
  t: PropTypes.func.isRequired,
  target: PropTypes.object.isRequired,
  updateContent: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
}

AnnotationTargetItem.defaultProps = {
  classes: {},
  edit: null,
  hoverBlock: false,
}

export default AnnotationTargetItem;
