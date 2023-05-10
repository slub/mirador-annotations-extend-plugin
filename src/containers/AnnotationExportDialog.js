import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import AnnotationExportDialog from '../components/AnnotationExportDialog';

const styles = (theme) => ({
  listitem: {
    '&:focus': {
      backgroundColor: theme.palette.action.focus,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
);

export default enhance(AnnotationExportDialog);
