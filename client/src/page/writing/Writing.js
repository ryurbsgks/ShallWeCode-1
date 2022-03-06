import React, { useState,Component } from 'react'
import Select from 'react-select'
import Navbar from '../../component/navbar/Navbar';
import "./Writing.css"
import languageList from './LanguageList';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';


function Writing(props) {
  const [type, setType] = useState('') //전시타입

  const handleType = (event) => {
    setType(Number(event.target.value))
  }
  return (
    
    <div>
      <Navbar />


    <div className="writingSection">
      <div className="categoryName">
        
        <div className="types">
          <input type="radio" name="type" value="1" 
          className="typeBtn"
          checked="checked"
          onChange={handleType}/><label className="type" >프로젝트 모집</label>
          <input type="radio" name="type" value="2" className="typeBtn"
          onChange={handleType}/><label className="type">포트폴리오</label>
      </div>
      </div>
          
      <div className="writingTitlMainDiv">
        <div className="mediumSizeFont writingTitleDiv ">제목</div>
        <input  className="writingTitle"></input>
      </div>
  
        <div className="selectLanguage">
          <label className ="mediumSizeFont categorySelectLanguage">기술스택</label>
          <Select
          
          isMulti
          name="colors"
          options={languageList}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        </div>
    </div>

      <Editor
        initialValue={
        `프로젝트 모집
        포트폴리오
        `}
        previewStyle="vertical"
        height="1000px"
        initialEditType="markdown"
        useCommandShortcut={true}
      />
      <div className="writingBtnDiv">
        <button className="miniBtn">글 등록</button>
        <button className="miniBtn writingCancelBtn" >취소</button>
      </div>
      
    </div>
  );
}

export default Writing;