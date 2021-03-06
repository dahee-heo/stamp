import React, { useState } from 'react'
import './employee-index.page.scss'
import {
  Radio,
  RadioGroup,
  Stack,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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
import Moment from 'react-moment';
import moment from 'moment';
import { attendanceCreate } from '../../service/attendance.service'



const EmployeeIndexPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}>
      {value}
    </button>
  );


  const [today, setToday] = useState(moment().format('YYYY-MM-DD'))
  const [currtime, setCurrtime] = useState(moment().format('hh:mm:ss'))

  // const MomentDate = () => {
  //   const now = Date.now()
  //   return <Moment>{now}</Moment>
  // }

  // startTimer()
  // MomentDate()
  setInterval(() => {
    setCurrtime(currtime)
  }, 1000)
  const [checkData, setCheckData] = useState({
    time: null,
  })
  async function Check(e) {
    const res = await attendanceCreate(checkData)
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
          <Button className='check-btn' colorScheme='teal'>출석체크👆</Button>
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
                <Tr>
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
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

        </section>
      </main>
    </>
  )
}

export default EmployeeIndexPage