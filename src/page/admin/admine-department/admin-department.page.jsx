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
  useDisclosure
} from '@chakra-ui/react'
import AdminSettingDepartmentRegistPage from './admin-department-regist.page'
import { departmentDelete, departmentGetList } from '../../../service/department.service'
import AdminSettingDepartmentUpdatePage from './admin-department-update.page'
import { useSearchParams } from 'react-router-dom'
import { Button } from '../../../component/Button';
import { ButtonsWrap } from '../../../component/ButtonsWrap';
import { getData } from '../../../util/function.util'
import Pagination from '../../../component/Pagination'

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
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    getDepartment()
  }, [])

  const getDepartment = () => {
    let page = searchParams.get('page')
    getData(page, departmentGetList, setSearchParams, setDepData, setPaginateOption)
  }

  async function depDelete(id) {
    await departmentDelete(id)
    getDepartment()
  }

  return (
    <>
      <AdminSettingDepartmentRegistPage
        isOpen={isOpen}
        onClose={onClose}
        onCloseComplete={getDepartment}
      ></AdminSettingDepartmentRegistPage>
      <AdminSettingDepartmentUpdatePage
        isOpen={updateOpen}
        onClose={updateOnClose}
        onCloseComplete={getDepartment}
        input={depData}
        updateDep={updateData}
      ></AdminSettingDepartmentUpdatePage>
      
      <div className='admin-section-wrap'>
        <h2>부서관리</h2>
        <div className='add-btn' >
          <Button 
            color="primary" 
            size="md"
            onClick={onOpen}
          >+부서추가</Button>
        </div>

        <TableContainer className='department-table'>
          <Table>
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
                        <ButtonsWrap>
                          <Button 
                            color="primary"
                            size="sm"
                            onClick={() => {
                              setUpdateData(() => item)
                              updateOnOpen()
                            }}
                          >
                            수정
                          </Button>
                          <Button
                            color="outline"
                            size='sm'
                            onClick={() => { depDelete(item._id) }}
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
            getDepartment(pageIndex - 1)
          }}
          loadPage={(pageIndex) => {
            getDepartment(pageIndex)
          }}
          onNext={(pageIndex) => {
            getDepartment(pageIndex + 1)
          }}
        ></Pagination>
      </div>
    </>

  )
}

export default AdminSettingDepartmentPage