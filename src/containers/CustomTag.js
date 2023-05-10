import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import CustomTag from '../components/CustomTag';

const styles = (theme) => ({
  root: {
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(1),
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
);

export default enhance(CustomTag);
