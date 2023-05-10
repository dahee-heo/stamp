import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { styled } from "../config/stitches.config";

const PaginationStyled = styled('div', {
  ".pagination": {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    "button": {
      paddingRight: "10px",
    },
  
    "span": {
      width: "30px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontDize: "12px",
      marginRight: "8px",
      borderRadius: "3px",
      border: "1px solid $gray300",
      cursor: "pointer",
      "&.active": {
        fontWeight: "$bold",
        backgroundColor: "$primary",
        color: "#fff",
      }
    }
  }
})

const Pagination = ({ paginateOption, loadPage, onPrev, onNext }) => {
  const { 
    page, 
    limit, 
    totalDocs, 
    totalPages, 
    hasNextPage, 
    hasPrevPage 
  } = paginateOption;
  const [pageArray, setPageArray] = useState([])

  useEffect(() => {
    pagenation(page, limit, totalPages)
  }, [page, limit, totalPages])

  const pagenation = (page, limit, totalPages) => {
    const pageNum = []

    let a = Math.floor(page / limit)
    let start = a * limit + 1
    let end = start + limit - 1
    end = end > totalPages ? totalPages : end
    for (let i = start; i < end + 1; i++) {
      pageNum.push(i)
    }
    setPageArray(pageNum)
  }

  return (
    <PaginationStyled>
      <div className='pagination'>
        <button 
          className='pagination-prev-button' 
          onClick={() => { onPrev(page) }}
        ><ChevronLeftIcon />
        </button>
        {
          pageArray.map((ele) => {
            return (
              <span 
                className={ele === page ? 'active' : ''} 
                key={ele} 
                onClick={() => { loadPage(ele) }}
              >{ele}</span>
            )
          })
        }
        <button 
          className='pagination-next-button' 
          onClick={() => { onNext(page) }}
          ><ChevronRightIcon />
        </button>
      </div>
    </PaginationStyled>
  )
}

export default Pagination