import React, { forwardRef, useState, useEffect } from 'react'
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
import { attendanceGetList } from '../../service/attendance.service'
import { format } from 'date-fns'
import { useSearchParams } from 'react-router-dom';
import { RepeatIcon } from '@chakra-ui/icons';
import Pagination from '../../component/Pagination';
import { styled } from '../../config/stitches.config';
import { AttendanceCheck } from '../../component/AttendanceCheck';
import { SectionStyled } from '../../style/SectionStyled';
import { Header } from '../../layout/Header';

const EmployeeIndexStyled = styled('div', {
  display: "flex",
  height: "100vh",
  "@md": {
    width: "100%",
  },
  ".commute": {
    display: "flex",
    overflow: "hidden",
    width: "100%",
    "@md": {
      flexWrap: "wrap",
    },
    "&__list": {
      flex: "1",
      backgroundColor: "$white",
      padding: "30px 60px",
  
      "h2": {
        fontSize: "20px",
        fontWeight: "700",
        marginBottom: "60px",
      },
  
    },
    
    ".filter": {
      ".filter-type": {
        marginBottom: "10px",
      },

      ".filter-date": {
        display: "flex",
        alignItems: "center",
        ".date-reset": {
          color: "#999",
          fontWeight: "800",
          marginLeft: "20px",
        },
      
        fontWeight: "700",
        marginRight: "40px",
      }
    },
  }
})

const EmployeeIndexPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [dateRecord, setDateRecord] = useState([])
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
  let page = searchParams.get('page')

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </Button>
  ));

  useEffect(() => {
    loadDate({ page })
  }, [])

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
      loadDate(params)
    }
  };

  const loadDate = async function ({ page, start, end, type }) {
    const paginationMeta = {
      page: page ?? 1,
      limit: 6,
      start,
      end,
      type,
    }

    const getAttendanceData = await attendanceGetList(paginationMeta)
    const { docs, ...option } = getAttendanceData.data
    setSearchParams(paginationMeta, { replace: true })
    setDateRecord(docs)
    setPaginateOption(option)
  }

  

  return (
    <>
      <Header/>
      <EmployeeIndexStyled>
      <main className='commute'>
        <section>
          <AttendanceCheck page={page} loadDate={loadDate}/>
        </section>
        <SectionStyled>
          <div className='employee-section-wrap'>
            <h2>출결현황</h2>
            <div className='filter'>
              <div className='filter-type filter-wrap'>
                <label className='filter-label'>분류</label>
                <RadioGroup
                  defaultValue='전체'
                  onChange={type => { loadDate({ type: type === '전체' ? null : type }) }}
                >
                  <Stack direction='row'>
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
              <div className='filter-date filter-wrap'>
                <label className='filter-label'>날짜</label>
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
                  onClick={() => loadDate({ start: null, end: null })}
                ><RepeatIcon /> 초기화</p>
              </div>
            </div>
            <TableContainer>
              <Table>
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

            <Pagination
              paginateOption={paginateOption}
              onPrev={(pageIndex) => {
                loadDate({ page: pageIndex - 1 })
              }}
              loadPage={(pageIndex) => {
                loadDate({ page: pageIndex })
              }}
              onNext={(pageIndex) => {
                loadDate({ page: pageIndex + 1 })
              }}
            ></Pagination>
          </div>

        </SectionStyled>
      </main>
      </EmployeeIndexStyled>
    </>
  )
}

export default EmployeeIndexPage