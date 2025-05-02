import React from 'react';
import ItemDetail from '../../components/items/itemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import data from '../../../dummyData.json';

const ItemsDetail = () => {
    const {id} = useParams();
    const item = data.items.find((item) => item.id === parseInt(id));

    return (
        <ItemDetail item={item}/>
    )
}

export default ItemsDetail;