import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { getConfig } from 'mirador/dist/es/src/state/selectors';
import AnnotationBodyItem from "../components/AnnotationBodyItem";

const mapStateToProps = (state) => ({
  htmlSanitizationRuleSet: getConfig(state).annotations.htmlSanitizationRuleSet,
})

const styles = (theme) => ({
  editAnnotation: {
    backgroundColor: theme.palette.shades.light,
  },
  editAnnotationListItem: {
    display: "inherit !important",
    '&:last-child': {
      borderBottom: 'none',
    },
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
  content: {

  }
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps),
);

export default enhance(AnnotationBodyItem);
