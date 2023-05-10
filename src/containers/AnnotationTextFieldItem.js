import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import AnnotationTextFieldItem from '../components/AnnotationTextFieldItem';

const enhance = compose(
  withTranslation(),
);

export default enhance(AnnotationTextFieldItem);
