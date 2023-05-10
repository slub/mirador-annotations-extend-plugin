import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { Add } from '@material-ui/icons';
import { Button, List } from '@material-ui/core';
import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import MiradorMenuButton from 'mirador/dist/es/src/containers/MiradorMenuButton';
import ns from 'mirador/dist/es/src/config/css-ns';
import AnnotationBodyItem from '../containers/AnnotationBodyItem';
import AnnotationMetadataItem from '../containers/AnnotationMetadataItem';
import AnnotationTargetItem from '../containers/AnnotationTargetItem';
import AnnotationSubmitDialog from '../containers/AnnotationSubmitDialog';
import CustomSection from '../containers/CustomSection';
import WebAnnotation from '../WebAnnotation';

/** */
class AnnotationCreation extends Component {
  /** */
  constructor(props) {
    super(props);
    const { t } = this.props;

    const annoState = {};
    let tempBody = {};
    let tempCreator = {};
    let tempMotivation = {};
    let tempTarget = {};

    /**
     * apply scheme to annotation for editing form
     * add/apply default values for missing fields
     * enhance fields with additional data for rendering
     */
    if (props.annotation) {
      if (props.annotation.id) {
        annoState.annoId = props.annotation.id;
      } else {
        annoState.annoId = uuid();
      }

      annoState.metadata = [];
      annoState.metadataCount = 0;

      /** add/transform basic fields for given metadata */
      tempCreator = {
        _temp_id: annoState.annoId + '-metadata-item-' + annoState.metadataCount,
        type: 'creator',
        value: props.annotation.creator && props.annotation.creator.name ? props.annotation.creator.name : null,
      };
      annoState.metadata.push(tempCreator);
      annoState.metadataCount++;

      tempMotivation = {
        _temp_id: annoState.annoId + '-metadata-item-' + annoState.metadataCount,
        type: 'motivation',
        value: props.annotation.motivation ? props.annotation.motivation : null,
      };
      annoState.metadata.push(tempMotivation);
      annoState.metadataCount++;

      /** transform body elements into given scheme */
      annoState.body = [];
      annoState.bodyCount = 0;
      if (props.annotation.body) {
        if (Array.isArray(props.annotation.body)) {
          props.annotation.body.forEach((body) => {
            tempBody = {
              _temp_id: annoState.annoId + '-body-item-' + annoState.bodyCount,
              _temp_name: t('body'),
              purpose: body.purpose ? body.purpose : null,
              type: body.type ? body.type : null,
              value: body.value,
            };
            annoState.body.push(tempBody);
            annoState.bodyCount++;
          });
        } else {
          tempBody = {
            _temp_id: annoState.annoId + '-body-item-' + annoState.bodyCount,
            _temp_name: t('body'),
            purpose: props.annotation.body.purpose ? props.annotation.body.purpose : null,
            type: props.annotation.body.type ? props.annotation.body.type : null,
            value: props.annotation.body.value,
          };
          annoState.body.push(tempBody);
          annoState.bodyCount++;
        }
      }

      /** transform target elements into given scheme */
      annoState.target = [];
      annoState.targetCount = 0;
      if (props.annotation.target.selector) {
        if (Array.isArray(props.annotation.target.selector)) {
          props.annotation.target.selector.forEach((selector) => {
            if (selector.type == 'SvgSelector') {
              const svgObject = new DOMParser().parseFromString(selector.value, 'image/svg+xml');
              const pathObjects = svgObject.querySelectorAll('path');
              pathObjects.forEach(path => {
                tempTarget = {
                  _temp_id: annoState.annoId + '-target-item-' + annoState.targetCount,
                  _temp_name: t('target'),
                  type: selector.type ? selector.type : null,
                  value: path.outerHTML,
                };
                annoState.target.push(tempTarget);
                annoState.targetCount++;
              });
            } else {
              tempTarget = {
                _temp_id: annoState.annoId + '-target-item-' + annoState.targetCount,
                _temp_name: t('target'),
                type: selector.type ? selector.type : null,
                value: selector.value,
              };
              annoState.target.push(tempTarget);
              annoState.targetCount++;
            }
          });
        } else {
          tempTarget = {
            _temp_id: annoState.annoId + '-target-item-' + annoState.targetCount,
            _temp_name: t('target'),
            type: props.annotation.target.selector.type ? props.annotation.target.selector.type : null,
            value: props.annotation.target.selector.value,
          };
          annoState.target.push(tempTarget);
          annoState.targetCount++;
        }
      }
    } else {
      /** create new annotation object with basic metadata */
      annoState.annoId = uuid();
      annoState.metadata = [];
      annoState.metadataCount = 0;
      tempCreator = {
        _temp_id: annoState.annoId + '-metadata-item-' + annoState.metadataCount,
        type: 'creator',
        value: null,
      };
      annoState.metadata.push(tempCreator);
      annoState.metadataCount++;

      tempMotivation = {
        _temp_id: annoState.annoId + '-metadata-item-' + annoState.metadataCount,
        type: 'motivation',
        value: 'commenting',
      };
      annoState.metadata.push(tempMotivation);
      annoState.metadataCount++;

    }

    this.state = {
      annoId: null,
      annotationSubmitDialogOpen: false,
      blockTargetHover: false, // blocks hover effects on svg drawing target items
      body: [], // body data
      bodyCount: 0, // global body count
      bodyEditState: null, // indicates current edited body item
      metadata: [], // metadata data
      metadataCount: 0, // global metadata count
      metadataEditState: null, // indicates current edited metadata item
      target: [], // target data
      targetCount: 0, // global target count
      targetEditState: null, // indicates current edited target item
      ...annoState,
    };

    this.confirmAnnotation = this.confirmAnnotation.bind(this);
    this.createAnnotationItem = this.createAnnotationItem.bind(this);
    this.deleteAnnotationItem = this.deleteAnnotationItem.bind(this);
    this.setEditState = this.setEditState.bind(this);
    this.setBlockTargetHover = this.setBlockTargetHover.bind(this);
    this.submitAnnotation = this.submitAnnotation.bind(this);
    this.toggleAnnotationSubmitDialogOpen = this.toggleAnnotationSubmitDialogOpen.bind(this);
    this.updateAnnotationItem = this.updateAnnotationItem.bind(this);
  }

  /**
   * generic delete function
   * use identifier for item type and id for deletion
   * version doesn't consider metadata deletion
   */
  deleteAnnotationItem(type, _temp_id) {
    const {
      body,
      target,
    } = this.state;

    let dataPos = null;
    let index = 0;
    let newData = null;

    switch (type) {
      case 'target':
        while (index < target.length && !dataPos) {
          if (target[index]._temp_id == _temp_id) {
            dataPos = index;
          }
          index++;
        }
        newData = target;
        newData.splice(dataPos, 1);
        this.setState({ target: newData });
        break;
      case 'body':
        while (index < body.length && !dataPos) {
          if (body[index]._temp_id == _temp_id) {
            dataPos = index;
          }
          index++;
        }
        newData = body;
        newData.splice(dataPos, 1);
        this.setState({ body: newData });
        break;
      default:
        break;
    }
  }

  /**
   * generic create function
   * use item type for dynamic item generation
   * version doesn't consider metadata creation
   */
  createAnnotationItem(type, subType = null) {
    const {
      annoId,
      body,
      bodyCount,
      target,
      targetCount,
    } = this.state;

    const { t } = this.props;

    let newData = null;

    switch (type) {
      case 'target':
        let targetBase = {
          _temp_id: annoId + '-target-item-' + targetCount,
          _temp_name: t('target'),
          type: 'SvgSelector',
          value: null,
        };
        newData = target.concat(targetBase);
        this.setState({
          target: newData,
          targetCount: targetCount + 1,
        });
        break;
      case 'body':
        let bodyBase = {
          _temp_id: annoId + '-body-item-' + bodyCount,
          _temp_name: t('body'),
          purpose: subType,
          type: 'TextualBody',
          value: '',
        };
        newData = body.concat(bodyBase);
        this.setState({
          body: newData,
          bodyCount: bodyCount + 1,
        });
        break;
      default:
        break;
    }
  }

  /**
  * generic update function
  * use item type and id for item update
  */
  updateAnnotationItem(type, content, _temp_id) {
    const {
      body,
      metadata,
      target,
    } = this.state;

    let dataPos = null;
    let index = 0;
    let newData = null;

    switch (type) {
      case 'target':
        while (index < target.length && !dataPos) {
          if (target[index]._temp_id == _temp_id) {
            dataPos = index;
          }
          index++;
        }
        newData = target;
        newData[dataPos] = content;
        this.setState({ target: newData });
        break;
      case 'metadata':
        while (index < metadata.length && !dataPos) {
          if (metadata[index]._temp_id == _temp_id) {
            dataPos = index;
          }
          index++;
        }
        newData = metadata;
        newData[dataPos] = content;
        this.setState({ metadata: newData });
        break;
      case 'body':
        while (index < body.length && !dataPos) {
          if (body[index]._temp_id == _temp_id) {
            dataPos = index;
          }
          index++;
        }
        newData = body;
        newData[dataPos] = content;
        this.setState({ body: newData });
        break;
      default:
        break;
    }
  }

  /**
   * prevent multiple parallel editing per type
   */
  setEditState(editState, type) {
    switch (type) {
      case 'target':
        this.setState({ targetEditState: editState });
        break;
      case 'body':
        this.setState({ bodyEditState: editState });
        break;
      case 'metadata':
        this.setState({ metadataEditState: editState });
        break;
      default:
        break;
    }
  }

  /**
   * block hover effects on targets
   * applies if svg target is created but not drwan
   * dirty fix to prevent rendering issues
   */
  setBlockTargetHover(block) {
    this.setState({ blockTargetHover: block });
  }

  /** toggle dialog with additional hints for user */
  toggleAnnotationSubmitDialogOpen() {
    const { annotationSubmitDialogOpen } = this.state;

    this.setState({ annotationSubmitDialogOpen: !annotationSubmitDialogOpen });
  }

  /** additional validation on annotation submit */
  submitAnnotation() {
    const { annotation } = this.props;
    const { metadata } = this.state;

    const creator = metadata.find(item => item.type == 'creator').value;
    if (!annotation && !creator) {
      this.toggleAnnotationSubmitDialogOpen();
    } else {
      this.confirmAnnotation();
    }
  }

  /** */
  confirmAnnotation() {
    const {
      annotation,
      canvases,
      closeCompanionWindow,
      config,
      receiveAnnotation,
    } = this.props;

    const {
      annoId,
      body,
      metadata,
      target,
    } = this.state;

    canvases.forEach((canvas) => {
      const tBody = body;
      const tTarget = target;
      let targets = null;

      const storageAdapter = config.annotation.adapter(canvas.id);

      tTarget.forEach(a => delete a._temp_id);
      tTarget.forEach(a => delete a._temp_name);

      if (target.length !== 0) {
        /**
         * combine svg-paths to one path
         * necessary as viewer displays only one svg target
        */
        const tSvgTargetArray = '<svg xmlns="http://www.w3.org/2000/svg">' + tTarget.filter(a => a.type == 'SvgSelector')?.map(a => a.value).join('') + '</svg>';

        /**
         * include different targets
         * not supported so far
         */
        targets = tTarget.filter(a => a.type !== 'SvgSelector');
        targets.push({ type: 'SvgSelector', value: tSvgTargetArray });
      }

      tBody.forEach(a => delete a._temp_id);
      tBody.forEach(a => delete a._temp_name);
      tBody.forEach(a => a.purpose == null ? delete a.purpose : null);

      const anno = new WebAnnotation({
        body: tBody,
        canvasId: canvas.id,
        creator: metadata.find(item => item.type == 'creator').value,
        id: (annotation && annotation.id) || annoId,
        manifestId: canvas.options.resource.id,
        motivation: metadata.find(item => item.type == 'motivation').value,
        target: targets,
      }).toJson();

      if (annotation) {
        storageAdapter.update(anno).then(annoPage => receiveAnnotation(canvas.id, storageAdapter.annotationPageId, annoPage));
      } else {
        storageAdapter.create(anno).then(annoPage => receiveAnnotation(canvas.id, storageAdapter.annotationPageId, annoPage));
      }
    });

    closeCompanionWindow();
  }

  /** */
  render() {
    const {
      annotation,
      classes,
      closeCompanionWindow,
      id,
      t,
      windowId,
    } = this.props;

    const {
      annotationSubmitDialogOpen,
      blockTargetHover,
      body,
      bodyEditState,
      metadata,
      metadataEditState,
      target,
      targetEditState,
    } = this.state;

    return (
      <CompanionWindow
        title={annotation ? t('annotationEdit') : t('annotationAdd')}
        windowId={windowId}
        id={id}
        paperClassName={ns('window-sidebar-annotation-panel')}
      >

        {/* metadata section */}
        <CustomSection
          primary={t('headerLabel_metadata')}
          // secondary='test'
          id={`${id}-metadata`}
        >
          <List disablePadding>
            {metadata?.map((value, index) => (
              <AnnotationMetadataItem
                edit={metadataEditState}
                editable={annotation ? false : true}
                handleEdit={this.setEditState}
                key={value._temp_id}
                metadata={value}
                metadataPos={index}
                updateContent={this.updateAnnotationItem}
              />
            ))}
          </List>
        </CustomSection>

        {/* target section */}
        <CustomSection
          primary={t('headerLabel_target')}
          id={`${id}-targets`}
          buttons={
            <MiradorMenuButton
              aria-label={t('createBtn_target')}
              className={classes.button}
              onClick={() => this.createAnnotationItem('target')}
            >
              <Add />
            </MiradorMenuButton>
          }
        >
          <List disablePadding>
            {target?.map((value, index) => (
              <AnnotationTargetItem
                hoverBlock={blockTargetHover}
                edit={targetEditState}
                handleDelete={this.deleteAnnotationItem}
                handleEdit={this.setEditState}
                blockTargetHover={this.setBlockTargetHover}
                key={value._temp_id}
                target={value}
                targetPos={index}
                updateContent={this.updateAnnotationItem}
                windowId={windowId}
              />
            ))}
          </List>
        </CustomSection>

        {/* body section */}
        <CustomSection
          primary={t('headerLabel_body')}
          id={`${id}-bodies`}
        >
          <CustomSection
            inner
            id={`${id}-bodies-tags`}
            primary={t('headerLabel_tag')}
            buttons={
              <MiradorMenuButton
                aria-label={t('createBtn_body')}
                className={classes.button}
                onClick={() => this.createAnnotationItem('body', 'tagging')}
              >
                <Add />
              </MiradorMenuButton>
            }
          >
            <List component="div" disablePadding>
              {body.filter(item => item.purpose == 'tagging')?.map((value, index) => (
                <AnnotationBodyItem
                  body={value}
                  bodyPos={index}
                  edit={bodyEditState}
                  handleDelete={this.deleteAnnotationItem}
                  handleEdit={this.setEditState}
                  key={value._temp_id}
                  updateContent={this.updateAnnotationItem}
                />
              ))}
            </List>
          </CustomSection>
          <CustomSection
            inner
            id={`${id}-bodies-texts`}
            primary={t('headerLabel_describing')}
            buttons={
              <MiradorMenuButton
                aria-label={t('createBtn_body')}
                className={classes.button}
                onClick={() => this.createAnnotationItem('body', 'describing')}
              >
                <Add />
              </MiradorMenuButton>
            }
          >
            <List component="div" disablePadding>
              {body.filter(item => item.purpose !== 'tagging')?.map((value, index) => (
                <AnnotationBodyItem
                  body={value}
                  bodyPos={index}
                  edit={bodyEditState}
                  handleEdit={this.setEditState}
                  handleDelete={this.deleteAnnotationItem}
                  key={value._temp_id}
                  updateContent={this.updateAnnotationItem}
                />
              ))}
            </List>
          </CustomSection>
        </CustomSection>

        <div>
          <Button
            onClick={closeCompanionWindow}
          >
            {t('annotationBtn_cancel')}
          </Button>
          <Button
            color="primary"
            onClick={this.submitAnnotation}
            variant="contained"
          >
            {t('annotationBtn_submit')}
          </Button>
        </div>
        <AnnotationSubmitDialog
          open={annotationSubmitDialogOpen}
          handleClose={this.toggleAnnotationSubmitDialogOpen}
          handleSubmit={this.confirmAnnotation}
        />
      </CompanionWindow>
    );
  }
}

AnnotationCreation.propTypes = {
  annotation: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  canvases: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    index: PropTypes.number,
  })),
  classes: PropTypes.objectOf(PropTypes.string),
  closeCompanionWindow: PropTypes.func,
  config: PropTypes.shape({
    annotation: PropTypes.shape({
      adapter: PropTypes.func,
      defaults: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.number, PropTypes.string]),
      ),
    }),
  }).isRequired,
  id: PropTypes.string.isRequired,
  receiveAnnotation: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

AnnotationCreation.defaultProps = {
  annotation: null,
  canvases: [],
  classes: {},
  closeCompanionWindow: () => { },
};

export default AnnotationCreation;
