import React from 'react';
import './ItemDetail.css';
import sampleImg from '../../../assets/sampleImg.svg';
import { getDaysAgo } from '../../../utils/date';
import unLikeIcon from '../../../assets/ic_unlike.svg';
import likeIcon from '../../../assets/ic_like.svg';
import Comments from '../comments/Comments';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from '../../../utils/format';

const ItemDetail = ({item}) => {
    const navigate = useNavigate();

    const [isSeller, setIsSeller] = React.useState(true);
    const [isLike, setIsLike] = React.useState(false);

    const handleEdit = (id) => {
        navigate(`/items/edit/${id}`, { state: { item, isEdit: true } });
    }

    return (
        <>
        <div className='item_detail_container'>
            <div className='item_detail_left'>
                <div className="img_wrapper">
                    <img src={item.imageUrl} alt="Item" />  
                </div>
                <div className='item_seller_container'>
                    <div className='item_seller'>
                        <img src={sampleImg} alt="Item" width={64} style={{borderRadius: `100px`}}/>
                        <p>{item.seller}</p>
                    </div>
                    <button className='shop_btn'>상점 보러가기</button>
                </div>
            </div>

            <div className='item_detail_right'>
                <p className='item_detail_category'>{item.category}</p>
                <p className='item_detail_title'>{item.title}</p>
                <p className='item_detail_price'>{formatNumber(item.price)}원</p>
                <p className='item_detail_date'>{getDaysAgo(item.postedAt)}</p>
                <p className='item_detail_info'>{item.description}</p>

                <div className="item_detail_btns_container">
                    <button className='item_detail_btn first_btn'>
                        <div className='item_detail_like_btn'>
                            <img src={isLike ? unLikeIcon : likeIcon} alt="Like" />
                            <p>좋아요</p>
                            <p className='like_count'>01</p>
                        </div>
                    </button>
                    {isSeller ? 
                        <button className='item_detail_btn mid_btn' onClick={() => handleEdit(item.id)}>
                        수정하기
                        </button>
                     : 
                        <button className='item_detail_btn mid_btn'>
                        채팅하기
                        </button>
                    }
                    
                    {isSeller ? 
                        <button className='item_detail_btn last_btn'>
                        삭제하기
                        </button>
                     : 
                        <button className='item_detail_btn last_btn'>
                        구매하기
                        </button>
                    }
                </div>
            </div>
        </div>

        <div className='line' />

        <Comments />
        </>
    )
}

export default ItemDetail;