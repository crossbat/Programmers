import React from 'react';
import './Comments.css';
import default_profile from '../../../assets/default_profile.svg';
import delete_btn from '../../../assets/ic_x.svg';

const Comments = () => {
    return (
        <div className='comments_container'>
            
            <div className="comment_input_wrapper">
                <input placeholder='댓글을 입력해주세요.'/>
                <button>입력</button>
            </div>
            
            <div className='comment_container'>
                <div className='comments_title'>
                    <p className='comment_title_txt'>댓글</p>
                    <p className='comment_title_count'>1개</p>
                </div>

                <div className="comment">
                    <img src={default_profile} width={50}/>
                    <div className="comment_txt_container">
                        <p className='comment_nickname'>user_nickname</p>
                        <p className='comment_txt'>저 이거 구매하고 싶어요!</p>
                    </div>
                    <img src={delete_btn}/>
                </div>
            </div>
        </div>
    );
} 

export default Comments;