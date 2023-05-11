import { Badge, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { StatsCard } from '../../../component/StatsCard';
import { styled } from '../../../config/stitches.config';
import { BarChart } from '../../../component/BarChart';
import { getData } from '../../../util/function.util'
import { Link, useSearchParams } from 'react-router-dom';
import { noticeGetList } from '../../../service/notice.service';
import { format } from 'date-fns';
import { Button } from '../../../component/Button';
import { ButtonsWrap } from '../../../component/ButtonsWrap';
import { adminAttendanceGetList } from '../../../service/admin-attendance.service';
import { ko } from 'date-fns/locale';

const StatsWrap = styled('div', {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  "@md": {
    flexWrap: "wrap",
  }
})

const ChartWrap = styled('div', {
  ".chart-title": {
    display: "flex", 
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "10px",
    ":last-child": {
      fontSize: "14px", 
      color: "$gray500",
    }
  },
})

const AdminDashboardPage = () => {
  const [statsTitle, setStatsTitle] = useState([
    {title: '출근 미체크', count: 0}, 
    {title: '퇴근 미체크', count: 0}, 
    {title: "늦은 출근", count: 0}, 
    {title: "이른 퇴근", count: 0}
  ])
  const [searchParams, setSearchParams] = useSearchParams()
  const [noticeData, setNoticeData] = useState([])
  const [attendanceData, setAttendanceData] = useState([])
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

  let page = searchParams.get('page')

  const getNotice = () => {
    getData(page, noticeGetList, setSearchParams, setNoticeData, setPaginateOption)
  }

  const getAttendance = () => {
    getData(page, adminAttendanceGetList, setSearchParams, setAttendanceData, setPaginateOption)
  }

  useEffect(()=>{
    getAttendance()
    getNotice()
  }, [])

  return (
    <>
      <h2>전사 근태 통계</h2>
      <section className='stats'>
        <ChartWrap>
          <div className='chart-title'>
            <p>직원 평균 근로 시간</p>
            <p>단위: 주</p>
          </div>
          <BarChart/>
        </ChartWrap>
        <StatsWrap>
          { statsTitle?.map((stats, idx) => {
            return (
              <StatsCard stats={stats} key={idx}/>
            )
          }) }
        </StatsWrap>
      </section>
      <section className='attendance-table'>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>이름</Th>
                <Th>부서</Th>
                <Th>일자</Th>
                <Th>요일</Th>
                <Th>출근시간</Th>
                <Th>퇴근시간</Th>
                <Th>총 근무 시간</Th>
              </Tr>
            </Thead>
            <Tbody>
            {
              attendanceData?.map((ele) => {
                return (
                  <Tr key={ele._id}>
                    <Td>{ele.userId.name}</Td>
                    <Td><Badge>{ele.userId.department.department}</Badge></Td>
                    <Td>{format(new Date(+ele.datetime), 'yyyy-MM-dd')}</Td>
                    <Td>{format(new Date(+ele.datetime), 'EEEE', { locale: ko })}</Td>
                    <Td>{format(new Date(+ele.datetime), 'hh:mm:ss')}</Td>
                    <Td>{ele?.leave?.datetime ? format(new Date(+ele?.leave?.datetime), 'hh:mm:ss') : 'NOT_FOUND'}</Td>
                    <Td>{ele?.diffFormat}</Td>
                  </Tr>
                )
              })
            }
            </Tbody>
          </Table>
        </TableContainer>
      </section>
      <section className='notice-table'>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>제목</Th>
                <Th>게시일</Th>
                <Th>작성자</Th>
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
                  </Tr>
                )
              })
            }
            </Tbody>
          </Table>
        </TableContainer>
      </section>
    </>
  )
}

export default AdminDashboardPage