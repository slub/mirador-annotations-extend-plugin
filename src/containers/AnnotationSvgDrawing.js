import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import AnnotationSvgDrawing from '../components/AnnotationSvgDrawing';

const enhance = compose(
  withTranslation(),
);

export default enhance(AnnotationSvgDrawing);
