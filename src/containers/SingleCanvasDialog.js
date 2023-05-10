import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import SingleCanvasDialog from '../components/SingleCanvasDialog';

const enhance = compose(
  withTranslation(),
);

export default enhance(SingleCanvasDialog);
