import { FormControl, Input, Textarea } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate, useParams } from 'react-router-dom';
import { noticeGet, noticeUpdate } from '../../../service/notice.service';
import { Button } from '../../../component/Button';
import { ButtonsWrap } from '../../../component/ButtonsWrap';
import { RegistEditPageStyled } from '../../../style/RegistEditPageStyled';
import { DraftWysiwygEditor } from '../../../component/DraftWysiwygEditor';
import { 
  EditorState, 
  convertToRaw,
  convertFromRaw,
  ContentState,
} from 'draft-js';
import draftjsToHtml from 'draftjs-to-html';

const AdminNoticeEditPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [contents, setContents] = useState({})
  const [title, setTitle] = useState('')

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
    const json =  JSON.parse(data.content);
    const contentRaw = convertFromRaw(json)
    // console.log('contentRaw: ', contentRaw);
    // setEditorState(contentRaw)
    setTitle(data.title)
    setEditorState(EditorState.createWithContent(contentRaw))
  }

  const handleSubmit = async () => {
    const convertEditorState = convertToRaw(editorState.getCurrentContent())
    if(title.length && convertEditorState) {
      const data = {
        title,
        _id: params.id,
        content: JSON.stringify(convertEditorState),
      }
      console.log('data: ', data);
      await noticeUpdate(data)
      navigate('/admin/notice')
    } else {
      alert('내용을 작성해주세요.')
      return;
    }
  }

  return (
    <RegistEditPageStyled>
      <FormControl>
        <Input 
          name='title'
          placeholder='제목을 입력하세요.'
          defaultValue={title}
          onChange={handleTitleChange}
        />
        <DraftWysiwygEditor
          editorState={editorState}
          setEditorState={setEditorState}
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