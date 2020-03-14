import { createStructuredSelector} from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { selectCollectionsLoaded } from '../../redux/shop/shop.selector'
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import CollectionPage from './collectionpage.component';


const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectCollectionsLoaded(state)
})

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);

export default CollectionPageContainer;

// const CollectionPageContainer = connect(mapStateToProps)(WithSpinner(CollectionPage))