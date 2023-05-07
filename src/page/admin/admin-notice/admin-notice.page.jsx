import React, { useState, useEffect } from 'react'
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
} from '@chakra-ui/react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import PaginationComponent from '../../../component/pagination.component'
import { noticeDelete, noticeGetList } from '../../../service/notice.service'
import { format } from 'date-fns'

const AdminNoticePage = () => {
  const [noticeData, setNoticeData] = useState([])
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
  const navigate = useNavigate();

  useEffect(() => {
    let page = searchParams.get('page')
    loadNotice(page)
  }, [])

  const loadNotice = async function (page = 1) {
    const paginationMeta = { page: page ?? 1, limit: 10 }
    const getUserData = await noticeGetList(paginationMeta)
    const { docs, ...option } = getUserData.data

    setSearchParams(paginationMeta, { replace: true })
    setNoticeData(docs)
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

  async function handleDelete(id) {
    if(window.confirm('게시글을 삭제하시겠습니까?')) {
      const res = await noticeDelete(id)
      loadNotice(paginateOption.page)
    } else {
      return;
    }
  }



  return (

    <div className='admin-employee-list'>
      <h2>공지사항</h2>
      <div className='employee-add-btn'>
        <Link to='/admin/notice/regist'><Button colorScheme='teal'>+ 공지사항 등록</Button></Link>
      </div>
      <TableContainer className='employee-table'>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>제목</Th>
              <Th>게시일</Th>
              <Th>작성자</Th>
              <Th>관리</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              noticeData?.map((notice) => {
                return (
                  <Tr key={notice._id}>
                    <Td><Link to={`/admin/notice/${notice._id}`}> {notice.title}</Link></Td>
                    <Td>{format(new Date(notice.date), 'yyyy-MM-dd')}</Td>
                    <Td>{notice.userId?.name}</Td>
                    <Td isNumeric>
                      <Link to={`/admin/notice/edit/${notice._id}`}>
                        <Button 
                          colorScheme='teal' 
                          size='xs' 
                        >
                          수정
                        </Button>
                      </Link>
                      <Button
                        variant='outline'
                        colorScheme='teal'
                        size='xs'
                        onClick={() => { handleDelete(notice._id) }}
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
          loadNotice(pageIndex - 1)
        }}
        loadPage={(pageIndex) => {
          loadNotice(pageIndex)
        }}
        onNext={(pageIndex) => {
          loadNotice(pageIndex + 1)
        }}
      ></PaginationComponent>
    </div >
  )
}

export default AdminNoticePage