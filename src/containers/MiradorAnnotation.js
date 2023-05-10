import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import * as actions from 'mirador/dist/es/src/state/actions';
import { getWindowViewType } from 'mirador/dist/es/src/state/selectors';
import { getVisibleCanvases } from 'mirador/dist/es/src/state/selectors/canvases';
import MiradorAnnotation from '../components/MiradorAnnotation';
import { getCompanionWindowsForContent } from 'mirador/dist/es/src/state/selectors/companionWindows';


const mapDispatchToProps = (dispatch, props) => ({
  addCompanionWindow: (content, additionalProps) => dispatch(
    actions.addCompanionWindow(props.targetProps.windowId, { content, ...additionalProps }),
  ),
  switchToSingleCanvasView: () => dispatch(
    actions.setWindowViewType(props.targetProps.windowId, 'single'),
  ),
});

function mapStateToProps(state, { targetProps: { windowId } }) {
  const annotationCreationCompanionWindows = getCompanionWindowsForContent(state, { content: 'annotationCreation', windowId });
  var annotationEdit = true;
  if (Object.keys(annotationCreationCompanionWindows).length !== 0) {
    annotationEdit = false;
  }

  return {
    canvases: getVisibleCanvases(state, { windowId }),
    config: state.config,
    createAnnotation: annotationEdit,
    windowViewType: getWindowViewType(state, { windowId }),
  }
};

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(MiradorAnnotation);
