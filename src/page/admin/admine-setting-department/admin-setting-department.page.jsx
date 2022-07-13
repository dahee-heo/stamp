import React, { useState, useEffect } from 'react'
import {
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Badge,
  useDisclosure
} from '@chakra-ui/react'
import AdminSettingDepartmentRegistPage from './admin-setting-department-regist.page'
import { departmentRegist, departmentDelete } from '../../../service/auth.service'
import axios from 'axios'
import { set } from 'react-hook-form'
import AdminSettingDepartmentUpdatePage from './admin-setting-department-update.page'
import './admin-setting-department.page.scss'
import * as qs from 'qs'
import { useSearchParams } from 'react-router-dom'


const AdminSettingDepartmentPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: updateOpen, onOpen: updateOnOpen, onClose: updateOnClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [depData, setDepData] = useState([])
  const [updateData, setUpdateData] = useState({})
  const [paginateOption, setPaginateOption] = useState({
    hasNextPage: null,
    hasPrevPage: null,
    limit: null,
    nextPage: null,
    page: null,
    pagingCounter: null,
    prevPage: null,
    totalDocs: null,
    totalPages: null,

  })
  // const [depDeleteSelect, setdepDeleteSelect] = useState({
  //   _id: null,
  //   department: null
  // })
  //useState , id props로 넘기기

  const [pageArray, setPageArray] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    let page = searchParams.get('page')
    loadDepartment(page)
  }, [])

  useEffect(() => {
    console.log(depData);
    console.log(paginateOption)
  }, [depData, paginateOption])

  const loadDepartment = async function (page = 1) {
    const paginationMeta = { page, limit: 10 }
    const qsString = qs.stringify(paginationMeta)
    let url = 'http://localhost:3000/department'
    if (qsString.length) {
      url += '?' + qsString
    }
    const getDepartmentData = await axios.get(url)
    const { docs, ...option } = getDepartmentData.data

    setSearchParams(paginationMeta, { replace: true })


    setDepData(docs)
    setPaginateOption(option)


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

    pagenation(option.page, option.limit, option.totalPages)
    // const pageNum = []

    // let a = Math.floor(option.page / option.limit)
    // let start = a * option.limit + 1
    // let end = start + option.limit - 1
    // end = end > option.totalPages ? option.totalPages : end
    // for (let i = start; i < end + 1; i++) {
    //   pageNum.push(i)
    // }
    // setPageArray(pageNum)

  }

  async function depDelete(id) {
    // setdepDeleteSelect(e.target)
    // console.log('e.target: ', e.target);
    const res = await departmentDelete(id)
  }



  // console.log(loadDepartment)

  return (
    <div>
      {/* {depData.data} */}
      <Button colorScheme='teal' onClick={onOpen}>+카테고리추가</Button>
      <AdminSettingDepartmentRegistPage
        isOpen={isOpen}
        onClose={onClose}
        onCloseComplete={loadDepartment}
      ></AdminSettingDepartmentRegistPage>
      <AdminSettingDepartmentUpdatePage
        isOpen={updateOpen}
        onClose={updateOnClose}
        onCloseComplete={loadDepartment}
        input={depData}
        updateDep={updateData}
      ></AdminSettingDepartmentUpdatePage>

      <TableContainer className='department-table'>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>부서</Th>
              <Th>관리</Th>
            </Tr>
          </Thead>
          <Tbody>

            {
              depData.map((item, index) => {
                return (
                  <Tr key={item._id}>
                    <Td >{item.department}</Td>
                    <Td>
                      <Button colorScheme='teal' size='xs' onClick={() => {
                        setUpdateData(() => item)
                        // console.log(updateData)
                        updateOnOpen()
                      }}>
                        수정
                      </Button>

                      <Button variant='outline' colorScheme='teal' size='xs' onClick={() => { depDelete(item._id) }}>
                        삭제
                      </Button>
                    </Td>
                  </Tr>
                )
              })
            }

          </Tbody>
        </Table>
      </TableContainer>
      <div className='pagination'>
        <button disabled={paginateOption.hasPrevPage} className='pagination-prev-button'>prev</button>
        {/* <span className='action'>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span> */}
        {
          pageArray.map((ele) => {
            return (
              <span key={ele} onClick={() => { loadDepartment(ele) }}>{ele}</span>
            )
          })
        }
        <button disabled={paginateOption.hasNextPage} className='pagination-next-button'>next</button>
      </div>
    </div>

  )
}

export default AdminSettingDepartmentPage