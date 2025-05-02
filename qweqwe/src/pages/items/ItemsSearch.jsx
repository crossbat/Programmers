import React from 'react';
import './ItemsSearch.css';
import { useLocation } from 'react-router-dom';
import data from '../../../dummyData.json';
import Category from '../../components/items/category/Category';
import Item from '../../components/items/item/Item';

const ItemsSearch = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('q');
    const category = queryParams.get('category') || '전체';

    const filteredItems = data.items.filter(item =>
        category === '전체' || item.category === category
    );

    console.log(filteredItems);

    return (
        <div className='container'>
            <h1>내 주변 "{q}" 검색 결과</h1>
            <div className='search_container'>
                <Category selectedCategory={category} keyword={q} />
                
                <div className='items_container'>
                {
                    filteredItems.map(item => (
                            <Item item={item} key={item.id}/>
                        ))
                }
                </div>
            </div>
        </div>
    )
}

export default ItemsSearch;