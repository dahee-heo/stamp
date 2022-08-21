import React, { forwardRef, useState, useEffect } from 'react'
import './employee-index.page.scss'
import {
  Radio,
  RadioGroup,
  Stack,
  Button,

  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import DatePicker from "react-datepicker";
import EmployeeInfoUpdatePage from './employee-info-update.page';
import { useDisclosure } from '@chakra-ui/react'
import { attendanceCreate, attendanceGetList } from '../../service/attendance.service'
import { format, compareAsc } from 'date-fns'
import axios from 'axios';
import { sessionVerify } from '../../service/auth.service';
import { authState, initialAuthState } from '../../atom/auth.atom';
import { useRecoilState } from 'recoil';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PaginationComponent from '../../component/pagination.component';


const EmployeeIndexPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: updateOpen, onOpen: updateOnOpen, onClose: updateOnClose } = useDisclosure()

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const [today, setToday] = useState(format(new Date(), 'yyyy/MM/dd'))
  const [currtime, setCurrtime] = useState(format(new Date(), 'hh:mm:ss'))
  const [dateRecord, setDateRecord] = useState([])
  const [auth, setAuth] = useRecoilState(authState)
  const [updateData, setUpdateData] = useState({})
  const [searchParams, setSearchParams] = useSearchParams()
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


  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </Button>
  ));

  useEffect(() => {
    let timeInterval = setInterval(() => {
      setCurrtime(format(new Date(), 'hh:mm:ss'))
    }, 1000)
    return () => {
      clearInterval(timeInterval)
    }
  }, [])

  useEffect(() => {
    // console.log('auth: ', auth);
    let page = searchParams.get('page')
    loadDate(page)
  }, [])



  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    console.log('start: ', start);
    console.log('end: ', end);

  };

  async function Check(e) {

    const res = await attendanceCreate({
      datetime: Date.now(),
      state: auth?.state?.state === '출근' ? '퇴근' : '출근'
    })
    console.log('res.data: ', res.data);
    setAuth({ ...auth, state: res.data })
  }

  const loadDate = async function (page = 1, dateRange) {
    const paginationMeta = { page: page ?? 1, limit: 6, dateRange }

    const getAttendanceData = await attendanceGetList(paginationMeta)
    console.log('getAttendanceData: ', getAttendanceData);
    // const getDate = await axios.get('http://localhost:3000/attendance')
    const { docs, ...option } = getAttendanceData.data
    // const datetime = getAttendanceData.data

    setSearchParams(paginationMeta, { replace: true })
    setDateRecord(docs)
    console.log('docs: ', docs);
    setPaginateOption(option)
  }

  const nav = useNavigate()

  async function logout() {
    await axios.get('http://localhost:3000/auth/logout')
    setAuth(initialAuthState)
    nav('/')
  }

  return (
    <>
      <EmployeeInfoUpdatePage
        isOpen={updateOpen}
        onClose={updateOnClose}
        updateMyInfo={auth}
      ></EmployeeInfoUpdatePage>
      <main className='commute'>
        <div className='commute__check'>
          <div className='check-top'>
            <p>{today}</p>
            <p onClick={() => {
              updateOnOpen()
            }}>정보 수정</p>
            <p onClick={logout}>로그아웃</p>
          </div>
          <div className='commte-time'>{currtime}</div>


          <Button className='check-btn' colorScheme='teal' onClick={Check}>{auth?.state?.state === '출근' ? '퇴근' : '출근'} 체크👆</Button>


        </div>

        <section className='commute__list'>
          <h2>출결현황</h2>
          <div className='filter'>
            <div className='filter-type'>
              <label className='filter-label'>분류</label>
              <RadioGroup defaultValue='1'>
                <Stack spacing={5} direction='row'>
                  <Radio value='전체' >
                    전체
                  </Radio>
                  <Radio value='출근' >
                    출근
                  </Radio>
                  <Radio value='퇴근' >
                    퇴근
                  </Radio>
                </Stack>
              </RadioGroup>
            </div>
            <div className='filter-date'>
              <label className='filter-label'>날짜</label>
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
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  customInput={<ExampleCustomInput />}
                />
              </Stack>
              <p className='date-reset'>초기화</p>
            </div>
          </div>
          <TableContainer>
            <Table variant='striped'>
              <Thead>
                <Tr>
                  <Th>유형</Th>
                  <Th>일자</Th>
                  <Th>요일</Th>
                  <Th>시간</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  dateRecord.map((date) => {
                    return (
                      <Tr key={date._id}>
                        <Td>{date.state}</Td>
                        <Td>{format(new Date(+date.datetime), 'yyyy-MM-dd')}</Td>
                        <Td>{format(new Date(+date.datetime), 'EEEE')}</Td>
                        <Td>{format(new Date(+date.datetime), 'hh:mm:ss')}</Td>
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
              loadDate(pageIndex - 1)
            }}
            loadPage={(pageIndex) => {
              loadDate(pageIndex)
            }}
            onNext={(pageIndex) => {
              loadDate(pageIndex + 1)
            }}
          ></PaginationComponent>

        </section>
      </main>
    </>
  )
}

export default EmployeeIndexPage