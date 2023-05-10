import React, { Component } from 'react';
import PropTypes from 'prop-types';
import flatten from 'lodash/flatten';
import AnnotationActionsContext from '../AnnotationActionsContext';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { Box, Typography } from '@material-ui/core';
import MiradorMenuButton from 'mirador/dist/es/src/containers/MiradorMenuButton';

/** */
class CanvasListItem extends Component {

  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const {
      canvases,
      receiveAnnotation,
      storageAdapter
    } = this.context;

    const { annotationid } = this.props;

    canvases.forEach((canvas) => {
      const adapter = storageAdapter(canvas.id);
      adapter.delete(annotationid).then((annoPage) => {
        receiveAnnotation(canvas.id, adapter.annotationPageId, annoPage);
      });
    });
  }

  handleEdit() {
    const {
      addCompanionWindow,
      annotationsOnCanvases,
      canvases,
      setActiveAnnotationId,
    } = this.context;

    const { annotationid } = this.props;
    let annotation;

    canvases.some((canvas) => {
      if (annotationsOnCanvases[canvas.id]) {
        Object.entries(annotationsOnCanvases[canvas.id]).forEach(([key, value], i) => {
          if (value.json && value.json.items) {
            annotation = value.json.items.find((anno) => anno.id === annotationid);
          }
        });
      }
      return (annotation);
    });
    addCompanionWindow('annotationCreation', {
      annotationid,
      position: 'right',

    });
    setActiveAnnotationId(annotationid);
  }

  editable() {
    const {
      annotationsOnCanvases,
      canvases,
    } = this.context;

    const { annotationid } = this.props;

    const annoIds = canvases.map((canvas) => {
      if (annotationsOnCanvases[canvas.id]) {
        return flatten(Object.entries(annotationsOnCanvases[canvas.id]).map(([key, value], i) => {
          if (value.json && value.json.items) {
            return value.json.items.map((item) => item.id);
          }
          return [];
        }));
      }
      return [];
    });
    return flatten(annoIds).includes(annotationid);
  }

  editing() {
    const {
      activeAnnotationId,
      createAnnotation,
    } = this.context;

    const { annotationid } = this.props;

    if (!createAnnotation) {
      if (activeAnnotationId == annotationid) {
        return true;
      }
    }
    return false;
  }

  creator() {
    const {
      annotationsOnCanvases,
      canvases,
    } = this.context;

    const { annotationid } = this.props;

    var creator = false;

    canvases.some((canvas) => {
      if (annotationsOnCanvases[canvas.id]) {
        Object.entries(annotationsOnCanvases[canvas.id]).forEach(([key, value], i) => {
          if (value.json && value.json.items) {
            var annotation = value.json.items.find((anno) => anno.id === annotationid);
            if (annotation?.hasOwnProperty('creator')) {
              if (annotation.creator.name) {
                creator = annotation.creator.name;
              } else {
                creator = annotation.creator;
              }
            }
          }
        });
      }
    });
    return (creator);
  }

  render() {
    const {
      children,
      classes,
      t,
    } = this.props;

    const {
      createAnnotation,
      windowViewType,
      toggleSingleCanvasDialogOpen,
    } = this.context;

    const creator = this.creator();

    return (
      <div>
        <div className={this.editing() ? classes.containeractive : classes.container}>
          <div className={classes.heading}>
            <Typography
              variant={classes.heading} >
              {creator ? creator : t('value_default')}
            </Typography>
          </div>

          <div className={classes.buttons}>
            {
              this.editable() &&
              <Box
                aria-label={t('annotationCanvas_tools')}
                size="small"
              >
                <MiradorMenuButton
                  aria-label={t('annotationBtn_edit')}
                  disabled={!createAnnotation}
                  onClick={windowViewType === 'single' ? this.handleEdit : toggleSingleCanvasDialogOpen}
                  value="edit"
                  size="small"
                >
                  <EditIcon />
                </MiradorMenuButton>
                <MiradorMenuButton
                  aria-label={t('annotationBtn_delete')}
                  disabled={!createAnnotation}
                  onClick={this.handleDelete}
                  value="delete"
                  size="small"
                >
                  <DeleteIcon />
                </MiradorMenuButton>
              </Box>
            }
          </div>
        </div>
        <li
          {...this.props} // eslint-disable-line react/jsx-props-no-spreading
        >
          {children}
        </li>
      </div>
    );
  }
}

CanvasListItem.propTypes = {
  annotationid: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  t: PropTypes.func,
}

CanvasListItem.defaultProps = {
  classes: {},
  t: key => key,
}

CanvasListItem.contextType = AnnotationActionsContext;

export default CanvasListItem;
