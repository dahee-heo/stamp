import { format } from 'date-fns'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { attendanceCreate } from '../service/attendance.service'
import { useRecoilState } from 'recoil'
import { authState, initialAuthState } from '../atom/auth.atom'
import { useDisclosure } from '@chakra-ui/react'
import { authLogout } from '../service/auth.service'
import EmployeeInfoUpdatePage from '../page/employee/employee-info-update.page'
import { Button } from './Button';
import { styled } from '../config/stitches.config'
import { useInterval } from '../hook/useInterval'

const AttendanceCheckStyled = styled('div', {
  padding: "45px 36px",
  width: "360px",
  height: "100%",
  borderRight: "1px solid $gray300",
  "@md": {
    width: "100vw",
    borderRight: "none",
    borderBottom: "1px solid $gray300",
  },

  ".commute__check": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginRight: "20px",
    backgroundColor: "$white",

    ".check-top": {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",

      ":nth-child(1)": {
        fontSize: "16px",
        flex: "4",
      },

      ":nth-child(2), :nth-child(3)": {
        fontSize: "12px",
        textDecorationLine: "underline",
        marginLeft: "10px",
        cursor: "pointer",
      },
    },

    ".commte-time": {
      fontSize: "30px",
      fontWeight: "600",
      marginBottom: "18px",
    }
  }
})

export const AttendanceCheck = ({ page, loadDate }) => {
  const { isOpen: updateOpen, onOpen: updateOnOpen, onClose: updateOnClose } = useDisclosure()
  const [today, setToday] = useState(format(new Date(), 'yyyy/MM/dd'))
  const [currtime, setCurrtime] = useState(format(new Date(), 'hh:mm:ss'))
  const [auth, setAuth] = useRecoilState(authState)
  const nav = useNavigate()

  useInterval(()=>{
    setCurrtime(format(new Date(), 'hh:mm:ss'))
  }, 1000)

  async function Check(e) {
    const res = await attendanceCreate({
      datetime: Date.now(),
      state: auth?.state?.state === '출근' ? '퇴근' : '출근'
    })
    setAuth({ ...auth, state: res.data })
    loadDate({ page })
  }

  return (
    <>
      <EmployeeInfoUpdatePage
      isOpen={updateOpen}
      onClose={updateOnClose}
      updateMyInfo={auth}
      ></EmployeeInfoUpdatePage>
      <AttendanceCheckStyled>
        <div className='commute__check'>
          <div className='check-top'>
            <p>{today}</p>
            <p onClick={() => {
              updateOnOpen()
            }}>정보 수정</p>
          </div>
          <div className='commte-time'>{currtime}</div>
          <Button
            color="primary"
            size="md"
            onClick={Check}
          >
            {auth?.state?.state === '출근' ? '퇴근' : '출근'} 체크👆
          </Button>
        </div>
      </AttendanceCheckStyled>
    </>
  )
}
