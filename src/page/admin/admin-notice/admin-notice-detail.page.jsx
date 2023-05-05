import { Button, FormControl, Input, Textarea } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './admin-notice-regist.scss'
import { useNavigate, useParams } from 'react-router-dom';
import ReactHtmlParser from "react-html-parser";
import { noticeGet } from '../../../service/notice.service';

const AdminNoticeDetailPage = () => {
  const [contents, setContents] = useState({
    title: '',
    content: '',
  })
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getNotice()
  }, [])

  const getNotice = async () => {
    const { data } = await noticeGet(params.id)
    setContents(data)
  }

  const handleTitleChange = e => {
    setContents({
      ...contents,
      title: e.target.value
    })
  }

  return (
    <>
      <h2>{contents.title}</h2>
      
      <div>{ReactHtmlParser(contents.content)}</div>

      <div>
        댓글
        <FormControl>
          <Textarea></Textarea>
          <Button>작성</Button>
        </FormControl>
      </div>
    </>
  )
}

export default AdminNoticeDetailPage