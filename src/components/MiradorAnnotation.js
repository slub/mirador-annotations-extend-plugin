import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddBoxIcon from '@material-ui/icons/AddBox';
import GetAppIcon from '@material-ui/icons/GetApp';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import SingleCanvasDialog from '../containers/SingleCanvasDialog';
import AnnotationExportDialog from '../containers/AnnotationExportDialog';
import LocalStorageAdapter from '../adapters/LocalStorageAdapter';

/** */
class MiradorAnnotation extends Component {
  /** */
  constructor(props) {
    super(props);

    this.state = {
      annotationExportDialogOpen: false,
      singleCanvasDialogOpen: false,
    };

    this.openCreateAnnotationCompanionWindow = this.openCreateAnnotationCompanionWindow.bind(this);
    this.toggleCanvasExportDialog = this.toggleCanvasExportDialog.bind(this);
    this.toggleSingleCanvasDialogOpen = this.toggleSingleCanvasDialogOpen.bind(this);
  }

  /** */
  openCreateAnnotationCompanionWindow(e) {
    const { addCompanionWindow } = this.props;

    addCompanionWindow('annotationCreation', {
      position: 'right',
    });
  }

  /** */
  toggleSingleCanvasDialogOpen() {
    const { singleCanvasDialogOpen } = this.state;

    this.setState({
      singleCanvasDialogOpen: !singleCanvasDialogOpen,
    });
  }

  /** */
  toggleCanvasExportDialog(e) {
    const { annotationExportDialogOpen } = this.state;

    const newState = {
      annotationExportDialogOpen: !annotationExportDialogOpen,
    };

    this.setState(newState);
  }

  /** */
  render() {
    const {
      canvases,
      config,
      createAnnotation,
      switchToSingleCanvasView,
      t,
      TargetComponent,
      targetProps,
      windowViewType,
    } = this.props;

    const {
      annotationExportDialogOpen,
      singleCanvasDialogOpen,
    } = this.state;

    const storageAdapter = config.annotation && config.annotation.adapter('poke');
    const offerExportDialog = config.annotation && storageAdapter instanceof LocalStorageAdapter
      && config.annotation.exportLocalStorageAnnotations;

    return (
      <div>
        <TargetComponent
          {...targetProps} // eslint-disable-line react/jsx-props-no-spreading
        />
        <MiradorMenuButton
          aria-label={t('annotationBtn_create')}
          onClick={windowViewType === 'single' ? this.openCreateAnnotationCompanionWindow : this.toggleSingleCanvasDialogOpen}
          size="small"
          disabled={!createAnnotation}
        >
          <AddBoxIcon />
        </MiradorMenuButton>
        {singleCanvasDialogOpen && (
          <SingleCanvasDialog
            open={singleCanvasDialogOpen}
            handleClose={this.toggleSingleCanvasDialogOpen}
            switchToSingleCanvasView={switchToSingleCanvasView}
          />
        )}
        {offerExportDialog && (
          <MiradorMenuButton
            aria-label={t('annotationBtn_export')}
            onClick={this.toggleCanvasExportDialog}
            size="small"
          >
            <GetAppIcon />
          </MiradorMenuButton>
        )}
        {offerExportDialog && (
          <AnnotationExportDialog
            canvases={canvases}
            config={config}
            handleClose={this.toggleCanvasExportDialog}
            open={annotationExportDialogOpen}
          />
        )}
      </div>
    );
  }
}

MiradorAnnotation.propTypes = {
  TargetComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  addCompanionWindow: PropTypes.func.isRequired,
  canvases: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    index: PropTypes.number
  })).isRequired,
  config: PropTypes.shape({
    annotation: PropTypes.shape({
      adapter: PropTypes.func,
      exportLocalStorageAnnotations: PropTypes.bool
    })
  }).isRequired,
  createAnnotation: PropTypes.bool.isRequired,
  switchToSingleCanvasView: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  targetProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  windowViewType: PropTypes.string.isRequired
}

export default MiradorAnnotation;
