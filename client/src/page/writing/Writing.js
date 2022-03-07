import React, { useState,Component, useRef, useEffect } from 'react'
import Select from 'react-select'
import Navbar from '../../component/navbar/Navbar';
import "./Writing.css"
import languageList from './LanguageList';
import axios from 'axios';
import { useHistory } from "react-router";

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';



function Writing(props) {
  const [type, setType] = useState('') // 글의 타입 지정, 클릭시 변경, 1번 2번으로 구분
  const [title, setTitle] = useState(''); // 제목
  const [stack, setStack] = useState({languageList}) // 기본 스택 목록
  const [content, setContent] = useState(""); // 에디터에 적혀진 글로 변경
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();


  const handleType = (event) => {
    setType((event.target.value))
  }

  const handleChangeTitle= (event) => {
    setTitle(event.target.value)
  }
  
  // 스택 선택시 선택 된것만 출력 - 하나도 선택 안 할 시 에러 처리 필수
  const handleChangeStack = e => {
    // console.log('e',e)
    let stackLanguageList = []
    e.map((v,i)=>{stackLanguageList.push(v.value)})
    setStack(stackLanguageList)
  }

  let editorRef = useRef();
  const handleChangeEditor = e => {
    const editorInstance = editorRef.current.getInstance()
    const getContentMarkDown = editorInstance.getMarkdown() // 마크다운으로 에디터에 쓰여진 글 받아옴
    setContent(getContentMarkDown)
  }
  // 이미지 추가 
  // useEffect(() => {
  //   if (editorRef.current) {
  //     // 기존에 Image 를 Import 하는 Hook 을 제거한다.
  //     editorRef.current.getInstance().removeHook("addImageBlobHook");

  //     // 새롭게 Image 를 Import 하는 Hook 을 생성한다.
  //     editorRef.current
  //       .getInstance()
  //       .addHook("addImageBlobHook", (blob, callback) => {
  //         (async () => {
  //           let formData = new FormData();
  //           formData.append("file", blob);

  //           console.log("이미지가 업로드 됐습니다.");

  //           const { data: filename } = await axios.post(
  //             "/file/upload",
  //             formData,
  //             {
  //               header: { "content-type": "multipart/formdata" },
  //             }
  //           );
  //           // .then((response) => {
  //           //   console.log(response);
  //           // });

  //           const imageUrl = "http://localhost:8080/file/upload/" + filename;

  //           // Image 를 가져올 수 있는 URL 을 callback 메서드에 넣어주면 자동으로 이미지를 가져온다.
  //           callback(imageUrl, "iamge");
  //         })();

  //         return false;
  //       });
  //   }

  //   return () => {};
  // }, [editorRef]);

  
  // 글 등록 버튼 클릭 
  const handleButtonClick = (event) => {
    const data = {
      type: type,
      title: title,
      content: content,
      stack: stack
    }
    console.log('data====',data)  

    if(!type || !title || !content || !stack){
      setErrorMessage('모든 항목은 필수입니다')
    }else{
      axios.post('https://localhost:4000/board/writing', {data:data})
      .then(res=> {
        alert('글쓰기 성공')
        history.push("/");
      })
    }
  }

  return (
    
    <div>
      <Navbar />

    <div className="writingSection">
      {/* 프로젝트 포트폴리오 선택 */}
      <div className="categoryName">
        <div className="types">
          <input type="radio" name="type" value="모집글" 
          className="typeBtn"
          // checked="checked"
          onChange={handleType}/><label className="type" >프로젝트 모집</label>
          <input type="radio" name="type" value="포트폴리오" className="typeBtn"
          onChange={handleType}/><label className="type">포트폴리오</label>
        </div>
      </div>
      {/* 제목 */}
      <div className="writingTitleMainDiv">
        <div className="mediumSizeFont writingTitleDiv ">제목</div>
        <input onChange={handleChangeTitle} className="writingTitle"></input>
      </div>
      {/* 기술 스택 */}
        <div className="selectLanguage">
          <label className ="mediumSizeFont categorySelectLanguage">기술스택</label>
          <Select
          isMulti
          name="colors"
          options={languageList}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder={"프로젝트 기술 스택 선택"}
          onChange={(e) => handleChangeStack(e)} 
        > </Select>
        </div>
    </div>
      {/* 글쓰기 */}
      <Editor
        initialValue={
        `프로젝트 설명: \n프로젝트 진행 방식: \n모집 인원:
        
        `}
        previewStyle="vertical"
        height="1000px"
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={editorRef}
        onChange={handleChangeEditor}
      />
      <div className="writingBtnDiv">
        <div className='alertBox'>{errorMessage}</div>  
        <button onClick={()=>{handleChangeEditor(); handleButtonClick()}} className="miniBtn saveBtn smallSizeFont">글 등록</button>
        <button className="miniBtn writingCancelBtn smallSizeFont" >취소</button>
        </div>
    </div>
  );
}

export default Writing;