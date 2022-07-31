import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import axios from 'axios'
import * as qs from 'qs'
import { useSearchParams } from 'react-router-dom'

const PaginationComponent = ({ paginateOption }) => {

  const { page, limit, totalDocs, totalPages, hasNextPage, hasPrevPage } = paginateOption;

  // const [depData, setDepData] = useState([])
  const [option, setOption] = useState(paginateOption)
  // setPaginateOption(paginateOption)

  const [pageArray, setPageArray] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()


  useEffect(() => {
    pagenation(option.page, option.limit, option.totalPages)
  }, [])

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
    <div className='pagination'>
      <button disabled={paginateOption.hasPrevPage} className='pagination-prev-button'><ChevronLeftIcon /></button>
      {
        pageArray.map((ele) => {
          return (
            <span key={ele}>{ele}</span>
          )
        })
      }
      <button disabled={paginateOption.hasNextPage} className='pagination-next-button'><ChevronRightIcon /></button>
    </div>
  )
}

export default PaginationComponent