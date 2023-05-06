import { Button, FormControl, Input, Textarea } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './admin-notice-regist.scss'
import { useNavigate } from 'react-router-dom';
import { noticeRegist } from '../../../service/notice.service';

const AdminNoticeRegistPage = () => {
  const [inputData, setInputData] = useState({
    title: '',
    content: '',
    date: new Date(),
  })
  const navigate = useNavigate();


  const handleTitleChange = e => {
    setInputData({
      ...inputData,
      title: e.target.value
    })
  }

  const handleSubmit = async () => {
    if(inputData.title.length && inputData.content.length) {
      const res = await noticeRegist(inputData)
      navigate('/admin/notice')
    } else {
      alert('내용을 작성해주세요.')
      return;
    }
  }

  return (
    <>
      <FormControl>
        <Input 
          name='title'
          placeholder='제목을 입력하세요.'
          onChange={handleTitleChange}
        />
        <CKEditor
          editor={ ClassicEditor }
          config={{
            placeholder: "내용을 입력하세요.",
          }}
          data=""
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              setInputData({
                ...inputData,
                content: data,
              })
          } }
      />      
        <Button onClick={() => navigate(-1)}>뒤로</Button>
        <Button onClick={handleSubmit}>제출</Button>
      </FormControl>
    </>
  )
}

export default AdminNoticeRegistPage