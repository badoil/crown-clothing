import React, { useEffect } from 'react'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop-action'

import  collectionsOverviewContainer  from "../../components/collections-overview/collections-overview-container.component";
import CollectionPageContainer from '../collectionpage/collectionpage-container.component'




const ShopPage = ({ fetchCollectionsStart, match }) => {
    
    useEffect(()=>{

        fetchCollectionsStart();
    }, [fetchCollectionsStart])

    return(
        <div className='shop-page'>
            <Route exact path={`${match.path}`}  component={collectionsOverviewContainer} />
            <Route path={`${match.path}/:collectionId`} 
                component={CollectionPageContainer}
                />
        </div>
    )}


const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})


export default connect(null, mapDispatchToProps)(ShopPage);


