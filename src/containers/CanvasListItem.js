import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import CanvasListItem from '../components/CanvasListItem';

const styles = (theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.shades.light,
  },
  containeractive: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.primary.light,
  },
  heading: {
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: '2rem',
    letterSpacing: '0.166rem',
    textTransform: 'uppercase',
  },
  buttons: {},
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
);

export default enhance(CanvasListItem);
