import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import MetadataCreatorItem from '../components/MetadataCreatorItem';


const enhance = compose(
  withTranslation(),
);

export default enhance(MetadataCreatorItem);
