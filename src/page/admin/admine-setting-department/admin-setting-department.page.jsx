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
import { departmentRegist } from '../../../service/auth.service'
import axios from 'axios'

const AdminSettingDepartmentPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [depData, setDepData] = useState([{ department: '' }])

  useEffect(() => {
    axios.get('http://localhost:3000/department')
      .then(res => {
        setDepData(res.data);
        // console.log(res)
        console.log(res.data)
      })
  }, [])


  return (
    <div>
      {/* {depData.data} */}
      <Button colorScheme='teal' onClick={onOpen}>+카테고리추가</Button>
      <AdminSettingDepartmentRegistPage isOpen={isOpen} onClose={onClose}></AdminSettingDepartmentRegistPage>

      <TableContainer className='department-table'>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>부서</Th>
              <Th>관리</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>경영지원</Td>
              <Td>
                <Button colorScheme='teal' size='xs'>
                  수정
                </Button>
                <Button variant='outline' colorScheme='teal' size='xs'>
                  삭제
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>경영지원</Td>
              <Td>
                <Button colorScheme='teal' size='xs'>
                  수정
                </Button>
                <Button variant='outline' colorScheme='teal' size='xs'>
                  삭제
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>개발</Td>
              <Td>
                <Button colorScheme='teal' size='xs'>
                  수정
                </Button>
                <Button variant='outline' colorScheme='teal' size='xs'>
                  삭제
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>개발</Td>
              <Td>
                <Button colorScheme='teal' size='xs'>
                  수정
                </Button>
                <Button variant='outline' colorScheme='teal' size='xs'>
                  삭제
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>

  )
}

export default AdminSettingDepartmentPage