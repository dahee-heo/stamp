import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginIndexPage from './page/login/login-index.page';
import EmployeeIndexPage from './page/employee/employee-index.page';
import AdminAttendancePage from './page/admin/admin-attendance.page';
import AdminIndexPage from './page/admin/admin-index.page';
import AdminEmployeePage from './page/admin/admin-employee/admin-employee.page';
import AdminSettingDepartmentPage from './page/admin/admine-setting-department/admin-setting-department.page'
import { useRecoilCallback, useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { sessionVerify } from './service/auth.service';
import { authState } from './atom/auth.atom'
import AuthGuard from './guard/auth.guard';
import { setInterceptor } from './util/http.util';

function App() {
  const [auth, setAuth] = useRecoilState(authState)
  const [isInitialized, setIsInitialized] = useState(false)

  const logAuth = useRecoilCallback(({ snapshot }) => async () => {
    const snapshotAuth = await snapshot.getPromise(authState)

    if (snapshotAuth?._id || typeof snapshotAuth._id === 'boolean') {
      setInterceptor(snapshotAuth?.token)
      setIsInitialized(true)
    }
  })

  useEffect(() => {
    sessionCheck()
  }, [])

  useEffect(() => {
    logAuth()
  }, [auth])


  const sessionCheck = async () => {
    try {
      const res = await sessionVerify()

      if (res?.data?._id) {
        setAuth(() => res.data)
      }
    } catch (error) {
      setAuth(() => ({ _id: false }))
    }
  }


  return (
    <>
      {isInitialized
        ? (
          <Routes>
            <Route path='/' element={<LoginIndexPage></LoginIndexPage>}></Route>
            <Route path='employee' element={
              <AuthGuard>
                <EmployeeIndexPage></EmployeeIndexPage>
              </AuthGuard>
            }></Route>
            <Route path='admin' element={
              <AuthGuard>
                <AdminIndexPage></AdminIndexPage>
              </AuthGuard>
            }>
              <Route path='' element={<Navigate to='attendance' replace />}></Route>
              <Route path='attendance' element={<AdminAttendancePage></AdminAttendancePage>}></Route>
              <Route path='employee' element={<AdminEmployeePage></AdminEmployeePage>}></Route>
              <Route path='department' element={<AdminSettingDepartmentPage></AdminSettingDepartmentPage>}></Route>
            </Route>
          </Routes>
        )
        : (<div>Loading...</div>)
      }
    </>
  );
}

export default App;
