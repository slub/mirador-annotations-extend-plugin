import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import TextEditor from '../components/TextEditor';

const styles = (theme) => ({
  editorRoot: {
    borderColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)',
    borderRadius: theme.shape.borderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: theme.typography.fontFamily,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    minHeight: theme.typography.fontSize * 6,
    padding: theme.spacing(1),
  },
});

const enhance = compose(
  withStyles(styles),
);

export default enhance(TextEditor);
