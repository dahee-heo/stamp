import React, { forwardRef, useEffect, useState } from 'react'
import { Stack, Button, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Badge } from '@chakra-ui/react'
import DatePicker from "react-datepicker";
import { useSearchParams } from 'react-router-dom'
import { adminAttendanceGetList } from '../../../service/admin-attendance.service';
import { format, differenceInSeconds } from 'date-fns'
import { ko } from 'date-fns/locale'
import { RepeatIcon } from '@chakra-ui/icons';
import { timeFormat } from '../../../util/function.util';
import Pagination from '../../../component/Pagination';


const AdminAttendancePage = () => {
  const [adminAttendanceData, setAdminAttendanceData] = useState([])
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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams()


  useEffect(() => {
    let page = searchParams.get('page')
    loadAdminAttendance({ page })
  }, [])

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </Button>
  ));

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      const params = {
        page: paginateOption?.page ?? 1,
        start,
        end
      }
      loadAdminAttendance(params)
    }
  };
  const loadAdminAttendance = async function ({ page, start, end, type }) {
    const paginationMeta = {
      page: page ?? 1,
      limit: 10,
      start,
      end,
      type
    }

    const getAdminAttendanceData = await adminAttendanceGetList(paginationMeta)
    const { docs, ...option } = getAdminAttendanceData.data

    docs.map((attendance) => {
      if (!attendance?.leave?.datetime || !attendance?.datetime) return
      timeFormat(attendance)
    })
    
    setSearchParams(paginationMeta, { replace: true })
    setAdminAttendanceData(docs)
    setPaginateOption(option)
  }

  const total = adminAttendanceData.reduce((acc, current) => {
    return acc + current.totalSeconds
  }, 0)
  // console.log('total: ', total, total/(60*60));
  
  return (
    <div className='admin-section-wrap'>
      <div className='admin-section-wrap'>
        <h2>출결현황</h2>
        <div className='filter-wrap'>
          <label className='date-label filter-label'>날짜</label>
          <Stack spacing={4} direction='row' align='center'>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              customInput={<ExampleCustomInput />}
            />
          </Stack>
          <p className='date-reset'
            onClick={() => loadAdminAttendance({ start: null, end: null })}
          ><RepeatIcon /> 초기화</p>
        </div>

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
                adminAttendanceData.map((ele) => {
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

        <Pagination
          paginateOption={paginateOption}
          onPrev={(pageIndex) => {
            loadAdminAttendance({ page: pageIndex - 1 })
          }}
          loadPage={(pageIndex) => {
            loadAdminAttendance({ page: pageIndex })
          }}
          onNext={(pageIndex) => {
            loadAdminAttendance({ page: pageIndex + 1 })
          }}
        />
      </div>
    </div>
  )
}

export default AdminAttendancePage