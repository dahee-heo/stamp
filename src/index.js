import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginIndexPage from './page/login/login-index.page';
import EmployeeIndexPage from './page/employee/employee-index.page';
import AdminAttendancePage from './page/admin/admin-attendance.page';
import AdminIndexPage from './page/admin/admin-index.page';
import AdminEmployeePage from './page/admin/admin-employee/admin-employee.page';
import AdminSettingDepartmentPage from './page/admin/admine-setting-department/admin-setting-department.page'
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import axios from 'axios';

//axios default setting 
axios.defaults.withCredentials = true

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RecoilRoot>
        <BrowserRouter>
          {/* <App /> */}
          <Routes>
            <Route path='/' element={<LoginIndexPage></LoginIndexPage>}></Route>
            <Route path='employee' element={<EmployeeIndexPage></EmployeeIndexPage>}></Route>
            <Route path='admin' element={<AdminIndexPage></AdminIndexPage>}>
              <Route path='' element={<Navigate to='attendance' replace />}></Route>
              <Route path='attendance' element={<AdminAttendancePage></AdminAttendancePage>}></Route>
              <Route path='employee' element={<AdminEmployeePage></AdminEmployeePage>}></Route>
              <Route path='department' element={<AdminSettingDepartmentPage></AdminSettingDepartmentPage>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
