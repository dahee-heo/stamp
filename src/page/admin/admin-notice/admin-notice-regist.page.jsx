import { FormControl, Input, Textarea } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { Button } from '../../../component/Button'
import { useNavigate } from 'react-router-dom';
import { noticeRegist } from '../../../service/notice.service';
import { RegistEditPageStyled } from '../../../style/RegistEditPageStyled';
import { ButtonsWrap } from '../../../component/ButtonsWrap';
import axios from 'axios';
import { getHostUrl } from '../../../util/http.util';
import { authState } from '../../../atom/auth.atom';
import { useRecoilState } from 'recoil';
import { DraftWysiwygEditor } from '../../../component/DraftWysiwygEditor';
import { EditorState, convertToRaw } from 'draft-js';

const AdminNoticeRegistPage = () => {
  const [auth, setAuth] = useRecoilState(authState)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [title, setTitle] = useState('')
  const navigate = useNavigate();

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handleSubmit = async () => {
    const convertEditorState = convertToRaw(editorState.getCurrentContent())
    if(title.length && convertEditorState) {
      const data = {
        title,
        content: JSON.stringify(convertEditorState),
        date: new Date(),
      }
      const res = await noticeRegist(data)
      navigate('/admin/notice')
    } else {
      alert('내용을 작성해주세요.')
      return;
    }
  }

  const hostUrl = getHostUrl()

  // function uploadAdapter(loader) {
  //   return {
  //     upload() {
  //       return new Promise((resolve, reject) => {
  //         const data = new FormData();
  //         loader.file.then((file) => {
  //           data.append("files", file);
  //           axios
  //             .post(`${hostUrl}/notice/file`, data)
  //             .then((res) => {
  //               resolve({
  //                 default: `${hostUrl}/${res.data.filename}`,
  //               });
  //             })
  //             .catch((err) => {
  //               reject(err);
  //             });
  //         });
  //       });
  //     }
  //   };
  // }

  // function uploadPlugin(editor) {
  //   editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
  //     return uploadAdapter(loader);
  //   };
  // }

  return (
    <RegistEditPageStyled>
      <FormControl>
        <Input 
          className='title'
          name='title'
          placeholder='제목을 입력하세요.'
          onChange={handleTitleChange}
        />
        <DraftWysiwygEditor 
          // inputData={inputData} 
          // setInputData={setInputData}
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

export default AdminNoticeRegistPage