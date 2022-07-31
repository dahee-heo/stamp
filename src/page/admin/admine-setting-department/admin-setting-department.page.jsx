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
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import AdminSettingDepartmentRegistPage from './admin-setting-department-regist.page'
import { departmentRegist, departmentDelete } from '../../../service/department.service'
import axios from 'axios'
import { set } from 'react-hook-form'
import AdminSettingDepartmentUpdatePage from './admin-setting-department-update.page'
import './admin-setting-department.page.scss'
import * as qs from 'qs'
import { useSearchParams } from 'react-router-dom'
import PaginationComponent from '../../../component/pagination.component'


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
    const paginationMeta = { page: page ?? 1, limit: 10 }
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



  }

  async function depDelete(id) {
    const res = await departmentDelete(id)
  }



  // console.log(loadDepartment)

  return (
    <div className='admin-department-list'>
      {/* {depData.data} */}
      <div className='department-add-btn' >
        <Button colorScheme='teal' onClick={onOpen}>+부서추가</Button>
      </div>
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
              <Th isNumeric>관리</Th>
            </Tr>
          </Thead>
          <Tbody>

            {
              depData.map((item, index) => {
                return (
                  <Tr key={item._id}>
                    <Td >{item.department}</Td>
                    <Td isNumeric>
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
      <PaginationComponent
        paginateOption={paginateOption}
        data={depData}
      ></PaginationComponent>
    </div>

  )
}

export default AdminSettingDepartmentPage