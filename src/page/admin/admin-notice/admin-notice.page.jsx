import React, { useState, useEffect } from 'react'
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react'
import { Button } from '../../../component/Button';
import { ButtonsWrap } from '../../../component/ButtonsWrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { noticeDelete, noticeGetList } from '../../../service/notice.service'
import { format } from 'date-fns'
import Pagination from '../../../component/Pagination';
import { getData } from '../../../util/function.util';

const AdminNoticePage = () => {
  const [noticeData, setNoticeData] = useState([])
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
    getNotice()
  }, [])

  const getNotice = () => {
    let page = searchParams.get('page')
    getData(page, noticeGetList, setSearchParams, setNoticeData, setPaginateOption )
  }

  async function handleDelete(id) {
    if(window.confirm('게시글을 삭제하시겠습니까?')) {
      const res = await noticeDelete(id)
      getNotice()
    } else {
      return;
    }
  }



  return (

    <div className='admin-employee-list'>
      <h2>공지사항</h2>
      <div className='add-btn'>
        <Link to='/admin/notice/regist'>
          <Button 
            color="primary"
            size="md"
          >+ 공지사항 등록</Button>
        </Link>
      </div>
      <TableContainer className='employee-table'>
        <Table>
          <Thead>
            <Tr>
              <Th>제목</Th>
              <Th>게시일</Th>
              <Th>작성자</Th>
              <Th isNumeric>관리</Th>
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
                      <ButtonsWrap>
                        <Link to={`/admin/notice/edit/${notice._id}`}>
                          <Button 
                            color="primary" 
                            size="sm"
                          >
                            수정
                          </Button>
                        </Link>
                        <Button
                          color="outline" 
                          size="sm"
                          onClick={() => { handleDelete(notice._id) }}
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
          getNotice(pageIndex - 1)
        }}
        loadPage={(pageIndex) => {
          getNotice(pageIndex)
        }}
        onNext={(pageIndex) => {
          getNotice(pageIndex + 1)
        }}
      ></Pagination>
    </div >
  )
}

export default AdminNoticePage