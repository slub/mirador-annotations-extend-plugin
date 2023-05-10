import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CanvasListItem from '../containers/CanvasListItem';
import AnnotationActionsContext from '../AnnotationActionsContext';
import SingleCanvasDialog from '../containers/SingleCanvasDialog';

/** */
class CanvasAnnotationsWrapper extends Component {
  /** */
  constructor(props) {
    super(props);

    this.state = {
      singleCanvasDialogOpen: false,
      activeAnnotationId: false,
    };

    this.toggleSingleCanvasDialogOpen = this.toggleSingleCanvasDialogOpen.bind(this);
    this.setActiveAnnotationId = this.setActiveAnnotationId.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.createAnnotation !== this.props.createAnnotation) {
      if (this.props.createAnnotation) {
        this.setActiveAnnotationId(null);
      }
    }
  }

  setActiveAnnotationId(value) {
    this.setState({ activeAnnotationId: value });
  };

  /** */
  toggleSingleCanvasDialogOpen() {
    const { singleCanvasDialogOpen } = this.state;
    this.setState({
      singleCanvasDialogOpen: !singleCanvasDialogOpen,
    });
  }

  /** */
  render() {
    const {
      addCompanionWindow,
      annotationsOnCanvases,
      canvases,
      config,
      createAnnotation,
      receiveAnnotation,
      switchToSingleCanvasView,
      TargetComponent,
      targetProps,
      windowViewType,
    } = this.props;

    const {
      activeAnnotationId,
      singleCanvasDialogOpen,
    } = this.state;

    const props = {
      ...targetProps,
      listContainerComponent: CanvasListItem,
    };

    return (
      <AnnotationActionsContext.Provider
        value={{
          activeAnnotationId,
          addCompanionWindow,
          annotationsOnCanvases,
          canvases,
          config,
          receiveAnnotation,
          setActiveAnnotationId: this.setActiveAnnotationId,
          storageAdapter: config.annotation.adapter,
          toggleSingleCanvasDialogOpen: this.toggleSingleCanvasDialogOpen,
          windowId: targetProps.windowId,
          createAnnotation,
          windowViewType,
        }}
      >
        <TargetComponent
          {...props} // eslint-disable-line react/jsx-props-no-spreading
        />
        {windowViewType !== 'single' && (
          <SingleCanvasDialog
            handleClose={this.toggleSingleCanvasDialogOpen}
            open={singleCanvasDialogOpen}
            switchToSingleCanvasView={switchToSingleCanvasView}
          />
        )}
      </AnnotationActionsContext.Provider>
    );
  }
}

CanvasAnnotationsWrapper.propTypes = {
  TargetComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  addCompanionWindow: PropTypes.func.isRequired,
  annotationsOnCanvases: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  canvases: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    index: PropTypes.number
  })),
  config: PropTypes.shape({
    annotation: PropTypes.shape({
      adapter: PropTypes.func
    })
  }).isRequired,
  createAnnotation: PropTypes.bool.isRequired,
  receiveAnnotation: PropTypes.func.isRequired,
  switchToSingleCanvasView: PropTypes.func.isRequired,
  targetProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  windowViewType: PropTypes.string.isRequired
}

CanvasAnnotationsWrapper.defaultProps = {
  annotationsOnCanvases: {},
  canvases: [],
};

export default CanvasAnnotationsWrapper;
