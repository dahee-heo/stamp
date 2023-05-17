import { FormControl, Input, Textarea } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button } from '../../../component/Button'
import { useNavigate } from 'react-router-dom';
import { noticeRegist } from '../../../service/notice.service';
import { RegistEditPageStyled } from '../../../style/RegistEditPageStyled';
import { ButtonsWrap } from '../../../component/ButtonsWrap';
import axios from 'axios';
import { getHostUrl } from '../../../util/http.util';
import { authState } from '../../../atom/auth.atom';
import { useRecoilState } from 'recoil';

const AdminNoticeRegistPage = () => {
  const [auth, setAuth] = useRecoilState(authState)
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

  const hostUrl = getHostUrl()

  function uploadAdapter(loader) {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const data = new FormData();
          loader.file.then((file) => {
            data.append("files", file);
            axios
              .post(`${hostUrl}/notice/file`, data)
              .then((res) => {
                resolve({
                  default: `${hostUrl}/${res.data.filename}`,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      }
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <RegistEditPageStyled>
      <FormControl>
        <Input 
          className='title'
          name='title'
          placeholder='제목을 입력하세요.'
          onChange={handleTitleChange}
        />
        <CKEditor
          editor={ ClassicEditor }
          config={{
            placeholder: "내용을 입력하세요.",
            extraPlugins: [uploadPlugin],
            simpleUpload: {
              uploadUrl: `${hostUrl}/notice/file`,
              withCredentials: false,
              'Authorization': 'Bearer ' + auth?.token
            }
          }}
          data=""
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              setInputData({
                ...inputData,
                content: data,
              })
          }}
          
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