import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const toolbar = {
  options: ['inline', 'textAlign', 'list', 'link', 'blockType', 'fontSize', 'fontFamily'],
  inline: {
    inDropdown: false,
    options: ['bold', 'italic', 'underline', 'strikethrough'],
  },
  list: {
    inDropdown: true,
    options: ['unordered'],
  },
  textAlign: {
    inDropdown: false,
    options: ['left', 'center', 'right'],
  },
  link: {
    inDropdown: false,
    showOpenOptionOnHover: true,
    defaultTargetOption: '_self',
    options: ['link', 'unlink'],
  },
  blockType: {
    inDropdown: true,
    options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6", "Blockquote", "Code"]
  }, 
  fontSize: {
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96], 
  },
  fontFamily: {
    options: [
      "Arial",
      "Georgia",
      "Impact",
      "Tahoma",
      "Times New Roman",
      "Verdana"
    ]
  },
}

export const DraftWysiwygEditor = ({ editorState, setEditorState }) => {
  // const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  }

  return (
    <div>
      <Editor
        wrapperClassName='wrapper-class'
        editorClassName='editor'
        toolbarClassName='toolbar-class'
        toolbar={toolbar}
        placeholder='내용을 작성해주세요.'
        localization={{
          locale: 'ko',
        }}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  )
}
