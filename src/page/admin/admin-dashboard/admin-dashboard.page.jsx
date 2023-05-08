import { Badge, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { Button } from '../../../component/Button';
import { StatsCard } from '../../../component/StatsCard';
import { styled } from '../../../config/stitches.config';
import { noticeGetList } from '../../../service/notice.service';
import { adminAttendanceGetList } from '../../../service/admin-attendance.service';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { BarChart } from '../../../component/BarChart';

const AdminDashboardPage = () => {
  const [statsTitle, setStatsTitle] = useState([
    {title: '출근 미체크', count: 0}, 
    {title: '퇴근 미체크', count: 1}, 
    {title: "늦은 출근", count: 3}, 
    {title: "이른 퇴근", count: 0}
  ])
  const [noticeList, setNoticeList] = useState({})
  const [attendanceList, setAttendanceList] = useState({})

  const StatsWrap = styled('div', {
    width: "99%",
    display: "flex",
    flexDirection: "row",
    "@md": {
      flexWrap: "wrap",
    }
  })


  return (
    <>
      <h2>전사 근태 통계</h2>
      <section className='stats'>
        <div>
          <div>
            <p>직원 평균 근로 시간</p>
            <p>단위: 주</p>
          </div>
          <BarChart/>
        </div>
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
          <Table variant='striped' size="sm" maxWidth="100%">
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
              // attendanceList?.map((ele) => {
              //   return (
              //     <Tr key={ele._id}>
              //       <Td>{ele.userId.name}</Td>
              //       <Td><Badge>{ele.userId.department.department}</Badge></Td>
              //       <Td>{format(new Date(+ele.datetime), 'yyyy-MM-dd')}</Td>
              //       <Td>{format(new Date(+ele.datetime), 'EEEE', { locale: ko })}</Td>
              //       <Td>{format(new Date(+ele.datetime), 'hh:mm:ss')}</Td>
              //       <Td>{ele?.leave?.datetime ? format(new Date(+ele?.leave?.datetime), 'hh:mm:ss') : 'NOT_FOUND'}</Td>
              //       <Td>{ele?.diffFormat}</Td>
              //     </Tr>
              //   )
              // })
            }
            </Tbody>
          </Table>
        </TableContainer>
      </section>
      <section className='notice-table'>
        <TableContainer>
          <Table variant='striped' size="sm" maxWidth="100%">
            <Thead>
              <Tr>
                <Th>제목</Th>
                <Th>조회수</Th>
                <Th>좋아요</Th>
                <Th>관리</Th>
              </Tr>
            </Thead>
            <Tbody>

              
            </Tbody>
          </Table>
        </TableContainer>
      </section>
    </>
  )
}

export default AdminDashboardPage