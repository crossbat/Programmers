import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DajungDajung.css';

import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";

const bannerImages = [banner1, banner2];
const ITEMS_PER_PAGE = 10;

const DajungDajung = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bannerIndex, setBannerIndex] = useState(0);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      const mockData = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `상품명 ${i + 1}`,
        price: '000,000원',
        time: '0일 전',
        img: '/img/sample.png',
      }));
      setProducts(mockData);
    } catch (error) {
      console.error('상품 목록 불러오기 실패:', error);
    }
  };

  return (
    <div className="dajung-container">
      <div className="banner-box">
        <Link to="/login">
          <img
            src={bannerImages[bannerIndex]}
            alt="배너 이미지"
            className="banner-img"
            style={{ cursor: 'pointer' }}
          />
        </Link>
      </div>

      <div className="product-section">
        <h2 className="section-title">최근 등록된 상품</h2>

        <div className="product-grid">
          {paginatedProducts.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="product-card-link"
            >
              <div className="product-card">
                <img className="card-image" src={item.img} alt="상품 이미지" />
                <div className="card-info">
                  <div className="card-name">{item.name}</div>
                  <div className="card-bottom">
                    <div className="card-price">{item.price}</div>
                    <div className="card-time">{item.time}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="pagination">
          <button className="arrow" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
            {'<'}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              className={`page-number ${n === currentPage ? 'active' : ''}`}
              onClick={() => setCurrentPage(n)}
            >
              {n}
            </button>
          ))}
          <button className="arrow" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DajungDajung;
