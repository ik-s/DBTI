import { useState } from 'react';
import './App.css';
import QuizStartPage from './components/QuizStartPage';
import QuizQuestionPage from './components/QuizQuestionPage';
import QuizResultPage from './components/QuizResultPage';

// 캐릭터 이미지 임포트
import contractImg from './assets/contract.png';
import researchImg from './assets/research.png';
import pmImg from './assets/pm.png';
import marketerImg from './assets/marketer.png';

// 점수표 정의 (매핑 규칙)
// 1 = A, 2 = B (버튼 클릭 값)
const SCORING_RULES = {
  contract: [{ q: 1, a: 2 }, { q: 3, a: 2 }, { q: 4, a: 1 }, { q: 9, a: 2 }, { q: 10, a: 2 }, { q: 12, a: 1 }],
  researcher: [{ q: 2, a: 2 }, { q: 3, a: 1 }, { q: 4, a: 2 }, { q: 5, a: 2 }, { q: 8, a: 2 }, { q: 11, a: 2 }],
  pm: [{ q: 1, a: 1 }, { q: 6, a: 2 }, { q: 7, a: 1 }, { q: 9, a: 1 }, { q: 10, a: 1 }, { q: 11, a: 1 }],
  marketer: [{ q: 2, a: 1 }, { q: 5, a: 1 }, { q: 6, a: 1 }, { q: 7, a: 2 }, { q: 8, a: 1 }, { q: 12, a: 2 }]
};

// 화면에 보여줄 결과 메타데이터
const RESULT_META = {
  contract: { title: "스마트 컨트랙트 개발자", image: contractImg },
  researcher: { title: "보안/감사 리서처", image: researchImg },
  pm: { title: "Web3 PM", image: pmImg },
  marketer: { title: "Web3 마케터", image: marketerImg }
};

function App() {
  const [step, setStep] = useState('start');
  const [answers, setAnswers] = useState([]); // 각 질문에 대한 응답 저장 배열
  const [finalResult, setFinalResult] = useState(RESULT_META.contract);

  const handleStartQuiz = () => {
    setAnswers([]); // 퀴즈 시작 시 응답 초기화
    setStep('quiz');
  };

  const handleAnswerClick = (answer) => {
    setAnswers(prev => [...prev, answer]);
  };

  const handleQuizFinish = () => {
    // 퀴즈 종료, 점수 계산 시작
    // answers 배열에는 0번 인덱스부터 q1, q2... 의 응답값(1 또는 2)이 저장되어 있음.
    
    // 각 직군별 점수 초기화
    const scores = { contract: 0, researcher: 0, pm: 0, marketer: 0 };

    // 점수 합산
    for (const [job, rules] of Object.entries(SCORING_RULES)) {
      rules.forEach(rule => {
        // 문항 번호(q)와 배열 인덱스 매핑 (q-1)
        if (answers[rule.q - 1] === rule.a) {
          scores[job]++;
        }
      });
    }

    // 결과 산출 로직
    let maxScore = -1;
    let topJobs = [];

    for (const [job, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        topJobs = [job];
      } else if (score === maxScore) {
        topJobs.push(job);
      }
    }

    let resultJob = topJobs[0]; // 기본 1순위

    // 동점자 발생 처리 로직
    if (topJobs.length > 1) {
      // 1순위 동점 무승부 기준: Q3(매뉴얼=1 vs 감=2)
      // Q3의 인덱스는 2
      const q3Answer = answers[2]; 

      // Q3으로 걸러낼 수 있는 직업 필터링 (각 직군별 Q3 득점 여부 확인)
      const q3TieBreaker = topJobs.filter(job => {
        const hasRule = SCORING_RULES[job].find(r => r.q === 3);
        return hasRule && hasRule.a === q3Answer;
      });

      if (q3TieBreaker.length === 1) {
        resultJob = q3TieBreaker[0];
      } else {
        // 2순위 동점 무승부 기준: Q1(팀=1 vs 혼자=2)
        const q1Answer = answers[0];
        
        // 걸러진 애들(또는 기존 topJobs 전부) 중에서 Q1으로 필터링
        const pool = q3TieBreaker.length > 1 ? q3TieBreaker : topJobs; 
        const q1TieBreaker = pool.filter(job => {
          const hasRule = SCORING_RULES[job].find(r => r.q === 1);
          return hasRule && hasRule.a === q1Answer;
        });

        if (q1TieBreaker.length > 0) {
          resultJob = q1TieBreaker[0];
        } else {
          // 그래도 동점이면 임의로 첫 번째 선택
          resultJob = pool[0];
        }
      }
    }

    setFinalResult(RESULT_META[resultJob]);
    setStep('result');
  }

  const handleRestartQuiz = () => {
    setAnswers([]);
    setStep('start');
  };

  return (
    <>
      {/* 1. 퀴즈 시작 단계 */}
      {step === 'start' && <QuizStartPage onStart={handleStartQuiz} />}
      
      {/* 2. 퀴즈 진행 단계 */}
      {step === 'quiz' && (
        <QuizQuestionPage 
          onAnswer={handleAnswerClick} 
          onFinish={handleQuizFinish} 
        />
      )}

      {/* 3. 결과 렌더링 단계 */}
      {step === 'result' && (
        <QuizResultPage 
          resultData={finalResult} 
          onRestart={handleRestartQuiz} 
        />
      )}
    </>
  );
}

export default App;
