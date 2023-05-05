import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

const AdminDashboardPage = () => {
  return (
    <main>
      <h2>전사 근태 통계</h2>
      <section>
        <div>
          <div>
            <p>직원 평균 근로 시간</p>
            <p>단위: 주</p>
          </div>
          <figure></figure>
        </div>
        <div>
          <div>
            <p>출근 미체크</p>
            <p>0</p>
          </div>
          <div>
            <p>퇴근 미체크</p>
            <p>10</p>
          </div>
          <div>
            <p>늦은 출근</p>
            <p>2</p>
          </div>
          <div>
            <p>이른 퇴근</p>
            <p>0</p>
          </div>
        </div>
      </section>
      <section>
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

              
            </Tbody>
          </Table>
        </TableContainer>
      </section>
      <section>
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
    </main>
  )
}

export default AdminDashboardPage