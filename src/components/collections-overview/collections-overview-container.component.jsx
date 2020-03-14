import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux'

import WithSpinner from '../with-spinner/with-spinner.component'
import { selectIsCollectionsFetching} from '../../redux/shop/shop.selector'
import CollectionsOverview from './collections-overview.component'


const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionsFetching
})

const collectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview)

export default collectionsOverviewContainer;

//const collectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview))