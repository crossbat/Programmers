import React from 'react';
import './Category.css';
import data from '../../../../dummyData.json';
import selectedIcon from '../../../assets/ic_selected.svg';
import unselectedIcon from '../../../assets/ic_unselected.svg';
import { useNavigate } from 'react-router-dom';

const Category = ({selectedCategory, keyword}) => {
    const navigate = useNavigate();

    const handleClickCategory = (categoryName) => {
        navigate(`/items?q=${keyword}&category=${categoryName}`);
    }

    return (
        <div className='category_container'>
            <div className='category_line'></div>
            <h3>카테고리</h3>
            {data.categories.map(category => (
                <div 
                    className='category' 
                    key={category.id}
                    onClick={() => handleClickCategory(category.name)}
                >
                    {selectedCategory === category.name ? (
                        <>
                            <img src={selectedIcon} alt="selected" />
                            <p>{category.name}</p>
                        </>
                    ) : (
                        <>
                            <img src={unselectedIcon} alt="unselected" />
                            <p>{category.name}</p>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Category;