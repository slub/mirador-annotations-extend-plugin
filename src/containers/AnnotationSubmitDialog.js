import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import AnnotationSubmitDialog from '../components/AnnotationSubmitDialog';


const enhance = compose(
  withTranslation(),
);

export default enhance(AnnotationSubmitDialog);
