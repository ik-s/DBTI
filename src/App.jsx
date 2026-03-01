import { useState } from 'react';
import './App.css';
import QuizStartPage from './components/QuizStartPage';

import QuizQuestionPage from './components/QuizQuestionPage';

function App() {
  // 현재 퀴즈 단계를 관리하는 상태값 ('start', 'quiz', 'result')
  const [step, setStep] = useState('start');

  // 퀴즈를 시작하는 함수: 데이터를 초기화하고(나중에 추가) 단계를 변경한다
  const handleStartQuiz = () => {
    // 퀴즈 데이터 초기화 작업이 여기에 들어갑니다 (다음 단계 개발 시)
    setStep('quiz');
  };

  // 퀴즈 답변 선택 시 다음으로 넘어가거나 결과로 넘어가는 임시 함수
  const handleAnswerClick = (answer) => {
    // 지금은 테스트를 위해 클릭 시 'start'로 넘어가도록 설정 (추후 정답 수집 로직 추가 예정)
    console.log('선택된 답변:', answer);
  };

  return (
    <>
      {step === 'start' && <QuizStartPage onStart={handleStartQuiz} />}
      
      {/* 퀴즈 진행 단계 */}
      {step === 'quiz' && (
        <QuizQuestionPage onAnswer={handleAnswerClick} />
      )}

      {/* 결과 단계 */}
      {step === 'result' && (
        <div style={{ color: 'white', padding: '20px' }}>
          <h1>결과 화면 (준비중...)</h1>
          <button onClick={() => setStep('start')}>다음 사람 시작</button>
        </div>
      )}
    </>
  );
}

export default App;
