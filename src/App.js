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
import AdminRegistPage from './page/admin-regist/admin-regist.page';
import AdminDashboardPage from './page/admin/admin-dashboard/admin-dashboard.page';
import AdminNoticePage from './page/admin/admin-notice/admin-notice.page';
import AdminNoticeRegistPage from './page/admin/admin-notice/admin-notice-regist.page';
import AdminNoticeDetailPage from './page/admin/admin-notice/admin-notice-detail.page';
import AdminNoticeEditPage from './page/admin/admin-notice/admin-notice-edit.page';

function App() {
  const [auth, setAuth] = useRecoilState(authState)
  const [isInitialized, setIsInitialized] = useState(false)

  const logAuth = useRecoilCallback(({ snapshot }) => async () => {
    const snapshotAuth = await snapshot.getPromise(authState)
    // console.log('snapshotAuth: ', snapshotAuth);

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
        // console.log('auth init res?.data: ', res?.data);
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
          <>
            <Routes>
              <Route path='/' element={<LoginIndexPage/>}></Route>
              <Route path='employee' element={
                <AuthGuard>
                  <EmployeeIndexPage/>
                </AuthGuard>
              }></Route>
              <Route path='admin' element={
                <AuthGuard role={'ADMIN'}>
                  <AdminIndexPage/>
                </AuthGuard>
              }>
                <Route path='' element={<Navigate to='home' replace />}></Route>
                <Route path='home' element={<AdminDashboardPage/>}></Route>
                <Route path='attendance' element={<AdminAttendancePage/>}></Route>
                <Route path='employee' element={<AdminEmployeePage/>}></Route>
                <Route path='department' element={<AdminSettingDepartmentPage/>}></Route>
                <Route path='notice' element={<AdminNoticePage/>}></Route>
                <Route path='notice/:id' element={<AdminNoticeDetailPage/>}></Route>
                <Route path='notice/regist' element={<AdminNoticeRegistPage/>}></Route>
                <Route path='notice/edit/:id' element={<AdminNoticeEditPage/>}></Route>
              </Route>
              <Route path='admin-regist' element={<AdminRegistPage/>}></Route>
            </Routes>
          </>
        )
        : (<div>Loading...</div>)
      }
    </>
  );
}

export default App;
