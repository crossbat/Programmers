import React, { useState, useRef, useEffect } from 'react';
import './ItemRegister.css'
import SampleImg from '../../../assets/sampleImg.svg';
import { formatNumber } from '../../../utils/format';

const onlyNumber = (str) => str.replace(/[^0-9]/g, '');

const ItemRegister = ({ isEdit = false, item = null }) => {
    const fileInputRef = useRef(null);

    const [preview, setPreview] = useState(SampleImg);
    const [form, setForm] = useState({
        title: '',
        category: '',
        price: '',
        description: ''
    });

    useEffect(() => {
        if (isEdit && item) {
          setForm({
            title: item.title || '',
            category: item.category || '',
            price: item.price ? formatNumber(item.price) : '',
            description: item.description || ''
          });
          if (item.imageUrl) {
            setPreview(item.imageUrl);
          }
        }
      }, [isEdit, item]);
      
    const handleUploadClick = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if(file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'price') {
          const onlyNums = onlyNumber(value);
          setForm((prev) => ({
            ...prev,
            [name]: formatNumber(onlyNums)
          }));
        } else {
          setForm((prev) => ({
            ...prev,
            [name]: value
          }));
        }
    };
    
    const handleSubmit = () => {
    const cleanPrice = Number(onlyNumber(form.price));

    const dataToSubmit = {
        ...form,
        price: cleanPrice,
    };

    if (isEdit) {
        console.log('수정 요청', dataToSubmit);
        // update API 호출
    } else {
        console.log('등록 요청', dataToSubmit);
        // create API 호출
    }
    };

    console.log(item);

    return (
        <div className='item_create_container'>
            <h1 className='sell_title'>{isEdit ? '수정하기' : '판매하기'}</h1>

            <section className='item_img_upload'>
                <img src={preview}></img>
                <button 
                    className='item_img_upload_btn'
                    type='button'
                    onClick={handleUploadClick}
                >
                    업로드
                </button>
                <input 
                    type='file'
                    accept='image/*'
                    style={{display: 'none'}}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
            </section>

            <section className='item_create_input_container'>
                <input 
                    className='item_create_input' 
                    name='title'
                    placeholder='제목'
                    value={form.title}
                    onChange={handleChange}
                />
                <input 
                    className='item_create_input' 
                    name='category'
                    placeholder='카테고리'
                    value={form.category}
                    onChange={handleChange}
                />
                <input 
                    className='item_create_input' 
                    name='price'
                    placeholder='가격'
                    value={form.price}
                    onChange={handleChange}
                />
                <textarea 
                    className='item_create_input'
                    name='description'
                    placeholder='설명'
                    value={form.description}
                    onChange={handleChange}
                    style={{
                        height: '200px', 
                        resize: 'vertical', 
                        whiteSpace: 'pre-wrap', 
                        overflowWrap: 'break-word'
                        }}
                />
            </section>

            <div style={{display: 'flex', justifyContent: 'center'}}>
            <button className='item_create_btn' onClick={handleSubmit}>작성 완료</button>
            </div>
        </div>
    )
}

export default ItemRegister;