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

const AdminSettingDepartmentPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: updateOpen, onOpen: updateOnOpen, onClose: updateOnClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [depData, setDepData] = useState([])
  // const [depDeleteSelect, setdepDeleteSelect] = useState({
  //   _id: null,
  //   department: null
  // })
  //useState , id props로 넘기기

  useEffect(() => {
    loadDepartment()
  }, [])

  const loadDepartment = async function () {
    const getDepartmentData = await axios.get('http://localhost:3000/department')
    console.log('getDepartmentData: ', getDepartmentData.data);
    setDepData(getDepartmentData.data)
  }

  async function depDelete(e) {
    // setdepDeleteSelect(e.target)
    // console.log('e.target: ', e.target);
    // const res = await departmentDelete(depDeleteSelect)
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
                      <Button colorScheme='teal' size='xs' onClick={updateOnOpen}>
                        수정
                      </Button>

                      <Button variant='outline' colorScheme='teal' size='xs' onClick={depDelete}>
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
    </div>

  )
}

export default AdminSettingDepartmentPage