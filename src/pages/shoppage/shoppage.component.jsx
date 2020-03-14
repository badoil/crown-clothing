import React from 'react'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop-action'

import  collectionsOverviewContainer  from "../../components/collections-overview/collections-overview-container.component";
import CollectionPageContainer from '../collectionpage/collectionpage-container.component'




class ShopPage extends React.Component {
    
    componentDidMount() {
        const { fetchCollectionsStart } = this.props;
        fetchCollectionsStart();
    }

    render(){
        const { match } = this.props;
        return(
            <div className='shop-page'>
                <Route exact path={`${match.path}`}  component={collectionsOverviewContainer} />
                <Route path={`${match.path}/:collectionId`} 
                    component={CollectionPageContainer}
                    />
            </div>
        )}
    
}


const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})


export default connect(null, mapDispatchToProps)(ShopPage);


