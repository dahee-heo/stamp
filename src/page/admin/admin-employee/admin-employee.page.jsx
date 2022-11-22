import React, { useState, useEffect } from 'react'
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Badge,
  Button,
} from '@chakra-ui/react'

import './admin-employee.page.scss'
import { useDisclosure } from '@chakra-ui/react'
import AdminEmployeeRegistPage from './admin-employee-regist.page'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import * as qs from 'qs'
import PaginationComponent from '../../../component/pagination.component'
import AdminEmployeeUpdatePage from './admin-employee-update.page'
import { employeeDelete, userGetList } from '../../../service/auth.service'



const AdminEmployeePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: updateOpen, onOpen: updateOnOpen, onClose: updateOnClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [userData, setUserData] = useState([])
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

  const [pageArray, setPageArray] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    let page = searchParams.get('page')
    // console.log('effect page: ', page);
    loadUser(page)
  }, [])

  const loadUser = async function (page = 1) {
    // console.log('load page: ', page);
    const paginationMeta = { page: page ?? 1, limit: 10 }
    const getUserData = await userGetList(paginationMeta)
    // console.log('getUserData: ', getUserData);
    const { docs, ...option } = getUserData.data
    // console.log('docs: ', docs);

    setSearchParams(paginationMeta, { replace: true })
    setUserData(docs)
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
  }

  async function userDelete(id) {
    const res = await employeeDelete(id)
    loadUser(paginateOption.page)
  }

  return (

    <div className='admin-employee-list'>
      <h2>직원관리</h2>
      <div className='employee-add-btn'>
        <Button onClick={onOpen} colorScheme='teal'>+직원등록</Button>
      </div>
      <AdminEmployeeRegistPage
        isOpen={isOpen}
        onClose={onClose}
      ></AdminEmployeeRegistPage>
      <AdminEmployeeUpdatePage
        isOpen={updateOpen}
        onClose={updateOnClose}
        onCloseComplete={loadUser}
        input={userData}
        updateUser={updateData}
      ></AdminEmployeeUpdatePage>
      <TableContainer className='employee-table'>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>이름</Th>
              <Th>부서</Th>
              <Th>ID</Th>
              <Th isNumeric>관리</Th>
            </Tr>
          </Thead>
          <Tbody>

            {
              userData.map((user) => {
                return (
                  <Tr key={user._id}>
                    <Td>{user.name}</Td>
                    <Td><Badge colorScheme='green'>{user?.department?.department}</Badge></Td>
                    <Td>{user.id}</Td>
                    <Td isNumeric>
                      <Button colorScheme='teal' size='xs' onClick={() => {
                        setUpdateData(() => user)
                        updateOnOpen()
                      }}>
                        수정
                      </Button>
                      <Button
                        variant='outline'
                        colorScheme='teal'
                        size='xs'
                        onClick={() => { userDelete(user._id) }}
                      >
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
        onPrev={(pageIndex) => {
          loadUser(pageIndex - 1)
        }}
        loadPage={(pageIndex) => {
          loadUser(pageIndex)
        }}
        onNext={(pageIndex) => {
          loadUser(pageIndex + 1)
        }}
      ></PaginationComponent>
    </div >
  )
}

export default AdminEmployeePage