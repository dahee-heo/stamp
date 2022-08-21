import React, { forwardRef, useEffect, useState } from 'react'
import { Radio, RadioGroup, Stack, Select, Button, DataPicker, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Badge } from '@chakra-ui/react'
import DatePicker from "react-datepicker";
import { useSearchParams } from 'react-router-dom'
import { adminAttendanceGetList } from '../../service/admin-attendance.service';
import { format, compareAsc, differenceInMinutes, differenceInSeconds } from 'date-fns'

import { ko } from 'date-fns/locale'
import { differenceInHours } from 'date-fns/esm';
import PaginationComponent from '../../component/pagination.component';




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
  const [searchParams, setSearchParams] = useSearchParams()


  useEffect(() => {
    loadAdminAttendance()
  }, [])
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </Button>
  ));

  const loadAdminAttendance = async function (page = 1) {
    const paginationMeta = { page: page ?? 1, limit: 10 }

    const getAdminAttendanceData = await adminAttendanceGetList(paginationMeta)
    const { docs, ...option } = getAdminAttendanceData.data
    console.log('docs: ', docs);

    docs.map((ele) => {
      if (!ele?.leave?.datetime || !ele?.datetime) return

      const diffSeconds = differenceInSeconds(new Date(+ele?.leave?.datetime), new Date(+ele?.datetime))
      const hours = Math.floor(diffSeconds / (60 * 60))
      const hourRest = diffSeconds % (60 * 60)
      const minuites = Math.floor(hourRest / 60)
      const minuiteRest = hourRest % 60
      const seconds = minuiteRest
      ele.diffFormat = `${hours} 시간 ${minuites} 분 ${seconds} 초`
    })

    setSearchParams(paginationMeta, { replace: true })

    setAdminAttendanceData(docs)
    setPaginateOption(option)



  }

  return (
    <div className='admin-attendance-wrap'>
      <div className='admin-attendance-list'>
        <h2>출결현황</h2>
        <div className='filter-type'>
          <label className='filter-label'>분류</label>
          <RadioGroup defaultValue='1'>
            <Stack spacing={5} direction='row'>
              <Radio value='1'>
                전체
              </Radio>
              <Radio value='2'>
                출근
              </Radio>
              <Radio value='3'>
                퇴근
              </Radio>
            </Stack>
          </RadioGroup>
        </div>
        <div className='filter-dept'>
          <label className='dept-label'>부서</label>
          <Select placeholder='부서 선택'>
            <option value='option1'>경영지원</option>
            <option value='option2'>개발</option>
            <option value='option3'>영업</option>
          </Select>
        </div>
        <div className='filter-date'>
          <label className='date-label'>날짜</label>
          <Stack spacing={4} direction='row' align='center'>
            <Button variant='outline' size='md'>
              오늘
            </Button>
            <Button variant='outline' size='md'>
              주
            </Button>
            <Button variant='outline' size='md'>
              월
            </Button>

            <Button variant='outline' size='md'>
              날짜선택
            </Button>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              customInput={<ExampleCustomInput />}
            />
          </Stack>
          <p className='date-reset'>초기화</p>
        </div>

        <TableContainer>
          <Table variant='striped'>
            <Thead>
              <Tr>
                <Th>이름</Th>
                <Th>부서</Th>
                <Th>일자</Th>
                <Th>요일</Th>
                <Th>출근시간</Th>
                <Th>퇴근시간</Th>
                <Th>총 근무 시간</Th>
                <Th>상세</Th>
              </Tr>
            </Thead>
            <Tbody>

              {
                adminAttendanceData.map((ele) => {
                  return (
                    <Tr key={ele._id}>
                      <Td>{ele.userId.name}</Td>
                      <Td>{ele.userId.department.department}</Td>
                      <Td>{format(new Date(+ele.datetime), 'yyyy-MM-dd')}</Td>
                      <Td>{format(new Date(+ele.datetime), 'EEEE', { locale: ko })}</Td>
                      <Td>{format(new Date(+ele.datetime), 'hh:mm:ss')}</Td>
                      <Td>{ele?.leave?.datetime ? format(new Date(+ele?.leave?.datetime), 'hh:mm:ss') : 'NOT_FOUND'}</Td>
                      {/* <Td>{format(new Date(ele.leave.datetime - ele.datetime), 'hh:mm:ss')}</Td> */}
                      <Td>{ele?.diffFormat}</Td>
                      <Td>
                        <Button colorScheme='teal' size='xs'>
                          상세
                        </Button>
                      </Td>
                    </Tr>
                  )
                })
              }
              {/* <PaginationComponent></PaginationComponent> */}
            </Tbody>
          </Table>
        </TableContainer>
      </div>


    </div>
  )
}

export default AdminAttendancePage