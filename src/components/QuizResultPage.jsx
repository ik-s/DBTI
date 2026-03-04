import React, { useState, useEffect } from 'react';
import './QuizResultPage.css';
import './QuizStartPage.css'; // 버튼 디자인 재사용
import './QuizQuestionPage.css'; // 질문 페이지 타이틀 이미지 디자인 재사용
import titleImage from '../assets/title.png'; // 타이틀 이미지 임포트 추가

// 퀴즈 결과 페이지 컴포넌트
// 부모로부터 결과 텍스트와 이미지 위치, 재시작 함수를 props로 전달받아 렌더링
export default function QuizResultPage({ resultData, onRestart }) {
  // 로딩 상태 관리 (초기값은 true로 설정하여 입장 시 바로 로딩 화면 노출)
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트가 마운트되면 2초 뒤에 로딩 상태 해제
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 여기서 로딩 시간을 조절할 수 있습니다 (현재 2초)
    return () => clearTimeout(timer);
  }, []);

  // 결과 데이터가 없을 경우 기본값으로 렌더링 (하드코딩된 fallback)
  const defaultData = {
    title: "결과 처리 중 오류",
    image: null
  };
  
  const data = resultData || defaultData;

  // 로딩 중일 경우 로딩 화면 렌더링
  if (isLoading) {
    return (
      <div className="quiz-result-container loading-container">
        <h2 className="loading-text">검사 결과 확인 중 ...</h2>
      </div>
    );
  }

  return (
    <div className="quiz-result-container">
      {/* 질문 화면과 동일한 크기와 위치의 타이틀 이미지 */}
      <img 
        src={titleImage} 
        alt="나랑 찰떡인 직업은?!" 
        className="quiz-question-title" 
      />

      {/* 서브 타이틀 */}
      <p className="quiz-result-subtitle">당신에게 찰떡인 직업은...</p>
      
      {/* 메인 결과 타이틀 (예: 스마트 컨트랙트 개발자) */}
      <h1 className="quiz-result-title">{data.title}</h1>
      
      {/* 캐릭터 이미지 (애니메이션 적용) */}
      {data.image && (
        <img 
          src={data.image} 
          alt={data.title} 
          className={data.title === "스마트 컨트랙트 개발자" ? "quiz-result-image-contract" : "quiz-result-image"} 
        />
      )}
      
      {/* 처음으로 돌아가기 버튼 (상태 초기화용) */}
      <button 
        className="quiz-start-button quiz-restart-button"
        onClick={onRestart}
      >
        처음으로 돌아가기
      </button>
    </div>
  );
}
