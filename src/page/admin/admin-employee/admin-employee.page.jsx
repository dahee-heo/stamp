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
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

import './admin-employee.page.scss'
import { useDisclosure } from '@chakra-ui/react'
import AdminEmployeeRegistPage from './admin-employee-regist.page'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import * as qs from 'qs'



const AdminEmployeePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [userData, setUserData] = useState([])
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
    console.log('test')

    let page = searchParams.get('page')
    console.log('effect page: ', page);
    loadUser(page)
  }, [])

  const loadUser = async function (page = 1) {
    // console.log('load page: ', page);

    const paginationMeta = { page: page ?? 1, limit: 10 }
    const qsString = qs.stringify(paginationMeta)
    let url = 'http://localhost:3000/users'
    if (qsString.length) {
      url += '?' + qsString
    }

    const getUserData = await axios.get(url)
    const { docs, ...option } = getUserData.data
    console.log('docs: ', docs);

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

  return (

    <div className='admin-employee-list'>
      <h2>????????????</h2>
      <div className='employee-add-btn'>
        <Button onClick={onOpen} colorScheme='teal'>+????????????</Button>

        {/* <Button colorScheme='teal' size='md' >+????????????</Button> */}
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
              <Th>??????</Th>
              <Th>??????</Th>
              <Th>ID</Th>
              <Th>??????</Th>
            </Tr>
          </Thead>
          <Tbody>

            {
              userData.map((user) => {
                return (
                  <Tr key={user._id}>
                    <Td>{user.name}</Td>
                    <Td><Badge colorScheme='green'>{user.department}</Badge></Td>
                    <Td>{user.id}</Td>
                    <Td>
                      <Button colorScheme='teal' size='xs'>
                        ??????
                      </Button>
                      <Button variant='outline' colorScheme='teal' size='xs'>
                        ??????
                      </Button>
                    </Td>
                  </Tr>
                )
              })
            }
            {/* <Tr>
              <Td>?????????</Td>
              <Td><Badge colorScheme='green'>????????????</Badge></Td>
              <Td>Random001</Td>
              <Td>
                <Button colorScheme='teal' size='xs'>
                  ??????
                </Button>
                <Button variant='outline' colorScheme='teal' size='xs'>
                  ??????
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>Rachel MacAdams</Td>
              <Td><Badge colorScheme='green'>????????????</Badge></Td>
              <Td>rachel</Td>
              <Td>
                <Button colorScheme='teal' size='xs'>
                  ??????
                </Button>
                <Button variant='outline' colorScheme='teal' size='xs'>
                  ??????
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>?????????</Td>
              <Td><Badge colorScheme='purple'>??????</Badge></Td>
              <Td>hong</Td>
              <Td>
                <Button colorScheme='teal' size='xs'>
                  ??????
                </Button>
                <Button variant='outline' colorScheme='teal' size='xs'>
                  ??????
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>?????????</Td>
              <Td><Badge colorScheme='purple'>??????</Badge></Td>
              <Td>Random004</Td>
              <Td>
                <Button colorScheme='teal' size='xs'>
                  ??????
                </Button>
                <Button variant='outline' colorScheme='teal' size='xs'>
                  ??????
                </Button>
              </Td>
            </Tr> */}
          </Tbody>
        </Table>
      </TableContainer>

      <div className='pagination'>
        <button disabled={paginateOption.hasPrevPage} className='pagination-prev-button'><ChevronLeftIcon /></button>

        {/* <span className='action'>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span> */}
        {
          pageArray.map((ele) => {
            return (
              <span key={ele} onClick={() => { loadUser(ele) }}>{ele}</span>
            )
          })
        }
        <button disabled={paginateOption.hasNextPage} className='pagination-next-button'><ChevronRightIcon /></button>
      </div>
    </div >
  )
}

export default AdminEmployeePage