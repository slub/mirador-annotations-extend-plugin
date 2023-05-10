import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import * as actions from 'mirador/dist/es/src/state/actions';
import { getCompanionWindow } from 'mirador/dist/es/src/state/selectors/companionWindows';
import { getVisibleCanvases } from 'mirador/dist/es/src/state/selectors/canvases';
import AnnotationCreation from '../components/AnnotationCreation';

const styles = (theme) => ({
  button: {
    padding: 0,
    marginRight: 0,
    marginLeft: 'auto',
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
  editAnnotation: {
    backgroundColor: theme.palette.shades.light,
  },
  editAnnotationCollapse: {
    padding: theme.spacing(1),
  },
  editAnnotationListItem: {
    display: "inherit !important",
    '&:last-child': {
      borderBottom: 'none',
    },
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
  grouped: {
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    border: 'none',
    margin: theme.spacing(0.5),
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
  },
  section: {
    borderBottom: `.5px solid ${theme.palette.section_divider}`,
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  addSection: {
    width: '100%',
    display: 'flex',
  },
});

const mapDispatchToProps = (dispatch, { id, windowId }) => ({
  closeCompanionWindow: () => dispatch(
    actions.removeCompanionWindow(windowId, id),
  ),
  receiveAnnotation: (targetId, annoId, annotation) => dispatch(
    actions.receiveAnnotation(targetId, annoId, annotation),
  ),
});

/** */
function mapStateToProps(state, { id: companionWindowId, windowId }) {
  const { annotationid } = getCompanionWindow(state, { companionWindowId, windowId });
  const canvases = getVisibleCanvases(state, { windowId });

  let annotation;
  canvases.forEach((canvas) => {
    const annotationsOnCanvas = state.annotations[canvas.id];
    Object.values(annotationsOnCanvas || {}).forEach((value, i) => {
      if (value.json && value.json.items) {
        annotation = value.json.items.find((anno) => anno.id === annotationid);
      }
    });
  });

  return {
    annotation,
    canvases,
    config: state.config,
    windowId,
  };
}

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(AnnotationCreation);
