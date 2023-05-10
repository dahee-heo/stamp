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
} from '@chakra-ui/react'
import { Button } from '../../../component/Button';
import { ButtonsWrap } from '../../../component/ButtonsWrap';
import { useDisclosure } from '@chakra-ui/react'
import AdminEmployeeRegistPage from './admin-employee-regist.page'
import { useSearchParams } from 'react-router-dom'
import AdminEmployeeUpdatePage from './admin-employee-update.page'
import { employeeDelete } from '../../../service/auth.service'
import { userGetList } from '../../../service/user.service'
import { getData } from '../../../util/function.util';
import Pagination from '../../../component/Pagination';

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
    getUser()
  }, [])
  
  const getUser = () => {
    let page = searchParams.get('page')
    getData(page, userGetList, setSearchParams, setUserData, setPaginateOption)
  }

  async function userDelete(id) {
    const res = await employeeDelete(id)
    getData(paginateOption.page, userGetList, setSearchParams, setUserData, setPaginateOption)
  }

  return (

    <div className='admin-section-wrap'>
      <h2>직원관리</h2>
      <div className='add-btn'>
        <Button 
          color="primary" 
          size="md" 
          onClick={onOpen}
        >+직원등록</Button>
      </div>
      <AdminEmployeeRegistPage
        isOpen={isOpen}
        onClose={onClose}
        onCloseComplete={getUser}
      ></AdminEmployeeRegistPage>
      <AdminEmployeeUpdatePage
        isOpen={updateOpen}
        onClose={updateOnClose}
        onCloseComplete={getUser}
        input={userData}
        updateUser={updateData}
      ></AdminEmployeeUpdatePage>
      <TableContainer className='employee-table'>
        <Table>
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
                    <Td><Badge>{user?.department?.department}</Badge></Td>
                    <Td>{user.id}</Td>
                    <Td isNumeric>
                      <ButtonsWrap>
                        <Button 
                          color="primary"
                          size="sm"
                          onClick={() => {
                            setUpdateData(() => user)
                            updateOnOpen()
                          }}
                        >
                          수정
                        </Button>
                        <Button
                          color="outline"
                          size='sm'
                          onClick={() => { userDelete(user._id) }}
                        >
                          삭제
                        </Button>
                      </ButtonsWrap>
                    </Td>
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
      </TableContainer>

      <Pagination
        paginateOption={paginateOption}
        onPrev={(pageIndex) => {
          getData(pageIndex - 1)
        }}
        loadPage={(pageIndex) => {
          getData(pageIndex)
        }}
        onNext={(pageIndex) => {
          getData(pageIndex + 1)
        }}
      ></Pagination>
    </div >
  )
}

export default AdminEmployeePage