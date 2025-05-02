import { useState } from "react";
import Pagination from "../../components/Pagination/pagination";
import SaleItemCard from "../../components/saleItemCard/saleItemCard";
import style from './UploadItems.module.css'
import data from '../../../dummyData.json'
import { useOutletContext } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";

export default function UploadItems() {
  const { contextUserItemData } = useOutletContext();
  if (contextUserItemData.length === 0) {
    console.log('상품이 없습니다')
  }
  const [page, setPage] = useState(1)
  const itemPerPage = 6;
  const indexOfLast = page * itemPerPage;
  const indexOfFirst = indexOfLast - itemPerPage;
  const currentitems = contextUserItemData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(contextUserItemData.length / itemPerPage);
  return (
    <>
      <div className={contextUserItemData.length === 0 ? style.mainContainer : ''}>
        {
          contextUserItemData.length !== 0 ? (
            <>
              <div className={style.UploadContainer}>
                {currentitems.map((item) => (
                  <SaleItemCard item={item} />
                ))}
              </div>
              <div>
                <Pagination totalPages={totalPages} currentPage={page} setCurrentPage={setPage} />
              </div>
            </>
          ) : (
            <>
              <div>
                <FaCartShopping />
                <p>상품이 없습니다.</p>
              </div>
            </>
          )
        }
      </div>
    </>
  )
}
