import React, { forwardRef, useState, useEffect } from 'react'
import './employee-index.page.scss'
import {
  Radio,
  RadioGroup,
  Stack,
  Button,
  // NumberInput,
  // NumberInputField,
  // NumberInputStepper,
  // NumberIncrementStepper,
  // NumberDecrementStepper,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import DatePicker from "react-datepicker";
import EmployeeModifyPage from './employee-modify.page';
import { useDisclosure } from '@chakra-ui/react'
import { attendanceCreate } from '../../service/attendance.service'
import { format, compareAsc } from 'date-fns'
import axios from 'axios';
import { sessionVerify } from '../../service/auth.service';
import { authState } from '../../atom/auth.atom';
import { useRecoilState } from 'recoil';


const EmployeeIndexPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [startDate, setStartDate] = useState(new Date());
  const [today, setToday] = useState(format(new Date(), 'yyyy/MM/dd'))
  const [currtime, setCurrtime] = useState(format(new Date(), 'hh:mm:ss'))
  const [dateRecord, setDateRecord] = useState([])
  const [auth, setAuth] = useRecoilState(authState)

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
    console.log('auth: ', auth);
    roadDate()
  }, [])




  async function Check(e) {

    const res = await attendanceCreate({
      datetime: Date.now(),
      state: auth.state.state === '출근' ? '퇴근' : '출근'
    })
    console.log('res.data: ', res.data);
    setAuth({ ...auth, state: res.data })

  }

  const roadDate = async function () {
    const getDate = await axios.get('http://localhost:3000/attendance')
    const datetime = getDate.data
    setDateRecord(datetime)
  }

  return (
    <>
      <EmployeeModifyPage isOpen={isOpen} onClose={onClose}></EmployeeModifyPage>
      <main className='commute'>
        <div className='commute__check'>
          <div className='check-top'>
            <p>{today}</p>
            <p onClick={onOpen}>정보 수정</p>
          </div>
          <div className='commte-time'>{currtime}</div>


          <Button className='check-btn' colorScheme='teal' onClick={Check}>{auth.state.state === '출근' ? '퇴근' : '출근'} 체크👆</Button>


        </div>

        <section className='commute__list'>
          <h2>출결현황</h2>
          <div className='filter'>
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
                  <Radio value='4'>
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
                  onChange={date => setStartDate(date)}
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
                {/* <Tr>
                  <Td>퇴근</Td>
                  <Td>2022-05-31</Td>
                  <Td>화</Td>
                  <Td>18:02</Td>
                </Tr>
                <Tr>
                  <Td>출근</Td>
                  <Td>2022-05-31</Td>
                  <Td>화</Td>
                  <Td>08:50</Td>
                </Tr>
                <Tr>
                  <Td>퇴근</Td>
                  <Td>2022-05-30</Td>
                  <Td>월</Td>
                  <Td>18:30</Td>
                </Tr>
                <Tr>
                  <Td>출근</Td>
                  <Td>2022-05-30</Td>
                  <Td>월</Td>
                  <Td>08:55</Td>
                </Tr> */}
              </Tbody>
            </Table>
          </TableContainer>

        </section>
      </main>
    </>
  )
}

export default EmployeeIndexPage