import React from 'react';
import './QuizStartPage.css';
import titleImage from '../assets/title.png';

// 퀴즈 시작 페이지 컴포넌트
// 부모 컨테이너(App.jsx)로부터 퀴즈를 시작하는 onStart 함수를 props로 전달받는다.
export default function QuizStartPage({ onStart }) {
  // 시작 버튼 클릭 핸들러
  const handleStart = () => {
    // 퀴즈 데이터 초기화 및 검사 시작을 위해 부모의 onStart 콜백 호출
    if (onStart) {
      onStart();
    }
  };

  return (
    <div className="quiz-start-container">
      {/* 둥둥 떠다니는 타이틀 로고 이미지 */}
      <img 
        src={titleImage} 
        alt="나랑 찰떡인 직업은?! 그래서 나... 뭐해먹고 살지?" 
        className="quiz-title-image" 
      />
      
      {/* 퀴즈 시작 액션을 트리거하는 버튼 */}
      <button 
        className="quiz-start-button" 
        onClick={handleStart}
      >
        READY TO START!
      </button>
    </div>
  );
}
