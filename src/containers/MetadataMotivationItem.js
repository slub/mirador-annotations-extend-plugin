import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import MetadataMotivationItem from '../components/MetadataMotivationItem';

const enhance = compose(
  withTranslation(),
);

export default enhance(MetadataMotivationItem);
