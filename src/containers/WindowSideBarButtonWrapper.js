import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import WindowSideBarButtonWrapper from '../components/WindowSideBarButtonWrapper';

const enhance = compose(
  withTranslation(),
);

export default enhance(WindowSideBarButtonWrapper);
