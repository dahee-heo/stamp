import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import axios from 'axios'
import * as qs from 'qs'
import { useSearchParams } from 'react-router-dom'

const PaginationComponent = ({ paginateOption }) => {

  const { page, limit, totalPages } = paginateOption;

  const [depData, setDepData] = useState([])
  const [option, setOption] = useState(paginateOption)
  // setPaginateOption(paginateOption)

  const [pageArray, setPageArray] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()


  useEffect(() => {
    pagenation(option.page, option.limit, option.totalPages)
  }, [])
  // const loadDepartment = async function (page = 1) {
  //   const paginationMeta = { page, limit: 10 }
  //   const qsString = qs.stringify(paginationMeta)
  //   let url = 'http://localhost:3000/department'
  //   if (qsString.length) {
  //     url += '?' + qsString
  //   }
  //   const getDepartmentData = await axios.get(url)
  //   const { docs, ...option } = getDepartmentData.data

  //   setSearchParams(paginationMeta, { replace: true })
  //   setDepData(docs)
  //   setPaginateOption(option)

  // }

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

  // pagenation(props.option.page, props.option.limit, props.option.totalPages)


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