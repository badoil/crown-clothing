import React from 'react'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop-action'

import  CollectionsOverview  from "../../components/collections-overview/collections-overview.component";
import CollectionPage from '../collectionpage/collectionpage.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';


import { firestore, convertCollectionsSnapshotToMyApp } from '../../firebase/firebase.utils'

//const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;
    
    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections')

        collectionRef.get().then( snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMyApp(snapshot) 
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        })

    }

    render(){
        const { match } = this.props;
        const { loading } = this.state;
        return(
            <div className='shop-page'>
                <Route exact path={`${match.path}`}  component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} 
                    render={(props => <CollectionPageWithSpinner isLoading={loading} {...props}/> )}
                    />
            </div>
        )}
    
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})


export default connect(null, mapDispatchToProps)(ShopPage);

//render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>}

