import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'mirador/dist/es/src/state/actions';
import { getVisibleCanvases } from 'mirador/dist/es/src/state/selectors/canvases';
import ExternalStorageAnnotation from '../components/ExternalStorageAnnotation';

const mapDispatchToProps = {
  receiveAnnotation: actions.receiveAnnotation,
};

function mapStateToProps(state, { targetProps }) {
  return {
    canvases: getVisibleCanvases(state, { windowId: targetProps.windowId }),
    config: state.config,
  };
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(ExternalStorageAnnotation);
