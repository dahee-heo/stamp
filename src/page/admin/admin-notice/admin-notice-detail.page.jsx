import { 
  Button, 
  FormControl, 
  Input, 
  Textarea, 
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import './admin-notice-regist.scss'
import { useNavigate, useParams } from 'react-router-dom';
import ReactHtmlParser from "react-html-parser";
import { commentGet, commentRegist, noticeGet } from '../../../service/notice.service';
import { useRecoilState } from 'recoil';
import { authState } from '../../../atom/auth.atom';

const AdminNoticeDetailPage = () => {
  const [auth, setAuth] = useRecoilState(authState)
  const navigate = useNavigate();
  const params = useParams();
  const [contents, setContents] = useState({
    title: '',
    content: '',
  })
  const [comment, setComment] = useState({
    content: '',
    date: new Date(),
    noticeId: params.id 
  })
  const [commentList, setCommentList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  
  useEffect(() => {
    getNotice()
    getComment()
  }, [])

  const getNotice = async () => {
    const { data } = await noticeGet(params.id)
    setContents(data)
  }

  const handleCommentChange = e => {
    setComment({
      ...comment,
      content: e.target.value
    })
  }

  const handleCommentSubmit = async () => {
    await commentRegist(comment)
    setComment({ content: '' })
    getComment()
  }

  const getComment = async () => {
    const { data } = await commentGet(params.id)
    setCommentList( data )
  }

  const list = commentList?.filter( comment => {
    return comment.noticeId === params.id
  })

  const handleCommentEdit = async (e) => {
    
  }

  

  return (
    <>
      <h2>{contents.title}</h2>
      
      <div>{ReactHtmlParser(contents.content)}</div>

      <div>
        댓글
        <FormControl>
          <Textarea 
            onChange={handleCommentChange}
            placeholder='댓글을 입력하세요.'
            value={comment.content}
          ></Textarea>
          <Button onClick={handleCommentSubmit}>작성</Button>
        </FormControl>

        
        { list?.map(comment => {
          return (
            <div key={comment._id}>
              {isEdit ? (
                <div>
                  <Input></Input>
                  <Button>수정</Button>
                  <Button>취소</Button>
                </div>
              ) : (
                <div>
                  {comment.userId.name}
                  {comment.date}
                  {comment.content}
                  <Button>수정</Button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default AdminNoticeDetailPage