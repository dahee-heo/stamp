import { FormControl, Input, Textarea } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate, useParams } from 'react-router-dom';
import { noticeGet, noticeUpdate } from '../../../service/notice.service';
import { Button } from '../../../component/Button';
import { ButtonsWrap } from '../../../component/ButtonsWrap';
import { RegistEditPageStyled } from '../../../component/RegistEditPageStyled';

const AdminNoticeEditPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [contents, setContents] = useState({
    title: '',
    content: '',
    _id: params.id,
  })

  useEffect(() => {
    getNotice()
  }, [])

  const handleTitleChange = e => {
    setContents({
      ...contents,
      title: e.target.value
    })
  }

  const getNotice = async () => {
    const { data } = await noticeGet(params.id);
    setContents({
      ...contents,
      title: data.title,
      content: data.content,
    })
  }

  const handleSubmit = async () => {
    await noticeUpdate(contents)
    navigate('/admin/notice')
  }

  return (
    <RegistEditPageStyled>
      <FormControl>
        <Input 
          name='title'
          placeholder='제목을 입력하세요.'
          defaultValue={contents.title}
          onChange={handleTitleChange}
        />
        <CKEditor
          editor={ ClassicEditor }
          data={contents.content}
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              setContents({
                ...contents,
                content: data,
              })
          } }
      />     
      <ButtonsWrap>
          <Button 
            color="outline"
            size="md"
            onClick={() => navigate(-1)}
          >뒤로</Button>
          <Button 
            color="primary"
            size="md"
            onClick={handleSubmit}
          >제출</Button>
        </ButtonsWrap>       
      </FormControl>
    </RegistEditPageStyled>
  )
}

export default AdminNoticeEditPage