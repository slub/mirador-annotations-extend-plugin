import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Check } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import MiradorMenuButton from 'mirador/dist/es/src/containers/MiradorMenuButton';
import MetadataCreatorItem from '../containers/MetadataCreatorItem';
import MetadataMotivationItem from '../containers/MetadataMotivationItem';
import CustomListItem from '../containers/CustomListItem';

class AnnotationMetadataItem extends Component {
  /** */
  constructor(props) {
    super(props);

    this.confirm = this.confirm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.edit = this.edit.bind(this);
    this.editing = this.editing.bind(this);
  }

  /** */
  confirm() {
    const { handleEdit } = this.props;

    handleEdit(null, 'metadata');
  }

  /** */
  handleChange(newValue) {
    const {
      metadata,
      updateContent,
    } = this.props;

    updateContent('metadata', { value: newValue, type: metadata.type, _temp_id: metadata._temp_id }, metadata._temp_id);
  }

  /** */
  edit() {
    const {
      handleEdit,
      metadata,
    } = this.props;

    handleEdit(metadata._temp_id, 'metadata');
  }

  /** */
  editing() {
    const {
      edit,
      metadata,
    } = this.props;

    return metadata._temp_id == edit;
  }

  /** */
  renderCreator() {
    const {
      metadata,
      t,
    } = this.props;
    const edit = this.editing();

    return (
      {
        primary: t('creator'),
        secondary: edit
          ? (
            <MetadataCreatorItem
              id={`${metadata}-creator`}
              value={metadata.value}
              handleChange={this.handleChange}
            />
          )
          : (metadata.value ? metadata.value : t('value_default'))
      }
    );
  }

  /** */
  renderMotivation() {
    const { metadata } = this.props;
    const edit = this.editing();

    return (
      {
        primary: metadata.type,
        secondary: edit
          ? (
            <MetadataMotivationItem
              value={metadata.value}
              handleChange={this.handleChange}
            />
          )
          : (metadata.value ? metadata.value : '')
      }
    );
  }

  /** */
  render() {
    const {
      editable,
      metadata,
      t,
    } = this.props;
    const edit = this.editing();

    return (
      <>
        {
          metadata.type !== 'creator'
            ? null
            : (
              <CustomListItem
                /**
                 * block metadata editing if this is annotation update
                 */
                {...(editable && {
                  buttons:
                    <MiradorMenuButton
                      aria-label={edit ? t('metadataBtn_confirm') : t('metadataBtn_edit')}
                      size="small"
                      onClick={() => edit ? this.confirm() : this.edit()}
                    >
                      {
                        edit
                          ? <Check />
                          : <EditIcon />
                      }
                    </MiradorMenuButton>
                })}
                {...(() => {
                  switch (metadata.type) {
                    case 'creator':
                      return this.renderCreator();
                    case 'motivation':
                      return this.renderMotivation();
                    default:
                      return null;
                  }
                })()}
              />
            )
        }
      </>
    );
  }
}

AnnotationMetadataItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  edit: PropTypes.string,
  editable: PropTypes.bool,
  handleEdit: PropTypes.func,
  metadata: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  updateContent: PropTypes.func,
};

AnnotationMetadataItem.defaultProps = {
  classes: {},
  edit: null,
  editable: false,
  handleEdit: () => { },
  updateContent: () => { },
};

export default AnnotationMetadataItem;
