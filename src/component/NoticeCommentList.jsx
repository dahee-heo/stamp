import React, { useState } from 'react'
import { ButtonsWrap } from './ButtonsWrap';
import { Button } from './Button';
import { Input } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { styled } from '../config/stitches.config';
import { commentUpdate } from '../service/notice.service';

export const NoticeCommentList = ({ comment, params, getComment }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [inputData, setInputData] = useState({
    content: "",
    noticeId: "",
  })
  const navigate = useNavigate();

  const onChange = (e) => {
    setInputData({
      ...inputData,
      content: e.target.value
    })
  }

  const onSubmit = () => {
    const data = {
      ...inputData,
      commentId: comment._id,
      noticeId: params.id
    }
    commentUpdate(data)
    getComment()
    setIsEdit(false)
  }


  return (
    <>
      <div className='comment-list-wrap'>
      {isEdit ? (
        <div className='comment-edit-wrap'>
          <Input 
            placeholder='댓글을 입력하세요.'
            defaultValue={comment.content}
            onChange={onChange}
          ></Input>
          <ButtonsWrap>
            <Button 
              color="primary" 
              size="sm"
              onClick={onSubmit}
            >수정</Button>
            <Button 
              color="outline" 
              size="sm"
              onClick={()=>setIsEdit(false)}
            >취소</Button>
          </ButtonsWrap>
        </div>
      ) : (
        <div>
          <div className='comment-list-info'>
            {comment.userId.name}
            <span className='write-date'>{format(new Date(comment.date), 'yyyy-MM-dd hh:mm:ss')}</span>
          </div>
          <div className='comment-list-content'>
            <p>{comment.content}</p>
            <Button 
              color="outline" 
              size="sm"
              onClick={()=>setIsEdit(true)}
            >수정</Button>
          </div>
        </div>
      )}
      </div>
    </>
  )
}
