import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import CustomSection from '../components/CustomSection';

const styles = (theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  section: {
    borderBottom: `.5px solid ${theme.palette.section_divider}`,
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  subsection: {
    borderBottom: `.5px solid ${theme.palette.section_divider}`,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  secondaryTitle: {
    fontSize: "16px",
    letterSpacing: "0em",
    lineHeight: "1.2em"
  },
  primaryTitle: {
    fontSize: "18px",
    letterSpacing: "0.007em",
    lineHeight: "1.45em"
  },
  description: { 
  },
  heading: {
    //marginBottom: theme.spacing(1),
  },
  buttons: {},
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
);

export default enhance(CustomSection);
