import React, { useState, useEffect } from 'react'
import { 
  FormControl, 
  Input, 
  Textarea, 
} from '@chakra-ui/react'
import { Button } from '../../../component/Button';
import { useNavigate, useParams } from 'react-router-dom';
import ReactHtmlParser from "react-html-parser";
import { commentGet, commentRegist, noticeGet } from '../../../service/notice.service';
import { useRecoilState } from 'recoil';
import { authState } from '../../../atom/auth.atom';
import { format } from 'date-fns';
import { styled } from '@stitches/react';
import { ButtonsWrap } from '../../../component/ButtonsWrap';
import { DetailPageStyled } from '../../../style/DetailPageStyled';

const AdminNoticeDetailPage = () => {
  const [auth, setAuth] = useRecoilState(authState)
  const navigate = useNavigate();
  const params = useParams();
  const [contents, setContents] = useState({
    title: '',
    content: '',
    date: '',
  })
  const [comment, setComment] = useState({
    content: '',
    date: new Date(),
    noticeId: params.id 
  })
  const [commentList, setCommentList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  
  
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

  useEffect(() => {
    getNotice()
    getComment()
  }, [])

  const list = commentList?.filter( comment => {
    return comment.noticeId === params.id
  })

  

  return (
    <DetailPageStyled>
      <div className='title-wrap'>
        <h3 className='title'>{contents.title}</h3>
        {/* <p className='write-date'>{format(new Date(contents.date), 'yyyy-MM-dd hh:mm:ss')}</p> */}
        {/* <p>{contents.userId.name}</p> */}
      </div>
      <div className='content'>{ReactHtmlParser(contents.content)}</div>
      <div className='comment'>
        <p>댓글 <span className='comment-length'>{list?.length}</span>개</p>
        <FormControl>
          <Textarea 
            onChange={handleCommentChange}
            placeholder='댓글을 입력하세요.'
            value={comment.content}
          ></Textarea>
          <Button 
            className='comment-submit-btn'
            color="primary" 
            size="md" 
            onClick={handleCommentSubmit}
          >댓글 쓰기</Button>
        </FormControl>
        <div className='comment-list'>
          { list?.map(comment => {
            return (
              <div key={comment._id}>
                <div className='comment-list-wrap'>
                {isEdit ? (
                  <>
                    <Input></Input>
                    <ButtonsWrap>
                      <Button color="primary" size="sm">수정</Button>
                      <Button color="outline" size="sm">취소</Button>
                    </ButtonsWrap>
                  </>
                ) : (
                  <>
                    <div className='comment-list-info'>
                      {comment.userId.name}
                      <span className='write-date'>{format(new Date(comment.date), 'yyyy-MM-dd hh:mm:ss')}</span>
                    </div>
                    <div className='comment-list-content'>
                      <p>{comment.content}</p>
                      <Button color="outline" size="sm">수정</Button>
                    </div>
                  </>
                )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </DetailPageStyled>
  )
}

export default AdminNoticeDetailPage