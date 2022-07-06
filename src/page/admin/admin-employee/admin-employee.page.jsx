import React from 'react'
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,

} from '@chakra-ui/react'
import './admin-employee.page.scss'
import { useDisclosure } from '@chakra-ui/react'
import AdminEmployeeRegistPage from './admin-employee-regist.page'

const AdminEmployeePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (

    <div className='admin-employee-list'>
      <h2>직원관리</h2>
      <div className='employee-add-btn'>
        <Button onClick={onOpen} colorScheme='teal'>+직원등록</Button>

        {/* <Button colorScheme='teal' size='md' >+직원등록</Button> */}
      </div>
      <AdminEmployeeRegistPage isOpen={isOpen} onClose={onClose}></AdminEmployeeRegistPage>
      {/* <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
      <TableContainer className='employee-table'>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>이름</Th>
              <Th>부서</Th>
              <Th>ID</Th>
              <Th>관리</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>김철수</Td>
              <Td><Badge colorScheme='green'>경영지원</Badge></Td>
              <Td>Random001</Td>
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
              <Td>Rachel MacAdams</Td>
              <Td><Badge colorScheme='green'>경영지원</Badge></Td>
              <Td>rachel</Td>
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
              <Td>홍길동</Td>
              <Td><Badge colorScheme='purple'>개발</Badge></Td>
              <Td>hong</Td>
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
              <Td>박지은</Td>
              <Td><Badge colorScheme='purple'>개발</Badge></Td>
              <Td>Random004</Td>
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
    </div >
  )
}

export default AdminEmployeePage