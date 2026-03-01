import React, { useState } from 'react';
import './QuizQuestionPage.css';
import './QuizStartPage.css'; // 버튼 디자인 재사용을 위해 임포트
import titleImage from '../assets/title.png';

// 예시 질문 데이터
const QUESTIONS = [
  {
    id: 1,
    textLines: ["과제를 진행하기 전 혼자해도 되고", "팀을 짜서 해도 된다고 한다."],
    answers: [
      { id: 1, text: "기왕이면 여럿이서 아이디어 내는게 낫지." },
      { id: 2, text: "역시 혼자가 작업하기 편하지." }
    ]
  },
  {
    id: 2,
    textLines: ["결국 조별과제로 진행하게 되어", "조원들이 모두 함께 자리에 앉았다"],
    answers: [
      { id: 1, text: "뻘줌하니 옆사람에게 말을 한 번 걸어본다." },
      { id: 2, text: "먼저 말걸지 않는 이상 가만히 있는다." }
    ]
  },
  {
    id: 3,
    textLines: ["과제 안내와 함께 교수님께서", "작년 예시와 메뉴얼을 같이 주신다"],
    answers: [
      { id: 1, text: "메뉴얼을 참고해서 한치의 오차도 없이 준비하자." },
      { id: 2, text: "느낌대로 가자~ 난 감이 좋은 편이니까!" }
    ]
  },
  {
    id: 4,
    textLines: ["수업이 끝난 후 동아리 회식 장소로", "이동하는데 길을 잃어버린 것 같다"],
    answers: [
      { id: 1, text: "저쪽이 지름길 같은데? 나를 믿고 새로운 길로 간다." },
      { id: 2, text: "아까 왔던 길로 빠르게 이동한다." }
    ]
  },
  {
    id: 5,
    textLines: ["동아리 회식 자리에서 선배가", "말도 안되는 개그를 시전한다"],
    answers: [
      { id: 1, text: "분위기상 일단 대충 웃고 본다." },
      { id: 2, text: "받아줘야 하는지 고민하다 보니 이미 정색하고 있다." }
    ]
  },
  {
    id: 6,
    textLines: ["회식자리를 함께하지 못한 친구가 후기를 물어본다.", "나의 대답은?"],
    answers: [
      { id: 1, text: "대충 붕뉘기만 설명하고 넘어간다." },
      { id: 2, text: "대화 주제, 먹은 음식, 음식의 맛까지 자세히 말해준다." }
    ]
  },
  {
    id: 7,
    textLines: ["팀 모임이 오늘 진행 예정이었으나,", "사정상 내일로 미뤄지게 되었다"],
    answers: [
      { id: 1, text: "아.. 다음 일정에 차질 생기는데." },
      { id: 2, text: "아싸 번개 모집해야지." }
    ]
  },
  {
    id: 8,
    textLines: ["동기가 과제를 잘 못했는지 교수님께 혼나고 왔다.", "나의 반응은?"],
    answers: [
      { id: 1, text: "속상하겠다.. 다음에 잘 될거야." },
      { id: 2, text: "왜? 뭐가 잘못된건데?" }
    ]
  },
  {
    id: 9,
    textLines: ["수차례 조원들과 논의하여 방향성을 정했으나,", "한 명이 또 다른 아이디어를 제시한다."],
    answers: [
      { id: 1, text: "이미 다 정해졌는데, 이제와서?" },
      { id: 2, text: "오, 일단 한 번 들어볼까?" }
    ]
  },
  {
    id: 10,
    textLines: ["작업 결과물에 대한 발표를 진행해야한다.", ""],
    answers: [
      { id: 1, text: "미리 대본과 예상 질문지를 준비한다." },
      { id: 2, text: "해야할 말만 정리하고 말하면서 말을 만들어간다." }
    ]
  },
  {
    id: 11,
    textLines: ["발표를 진행하고 있는데 앞에 앉은", "동기가 핸드폰만 보고 있다"],
    answers: [
      { id: 1, text: "내 발표가 별론가.. 신경쓰인다." },
      { id: 2, text: "재밌는거 보나? 이따 물어봐야지 신경쓰지 않는다." }
    ]
  },
  {
    id: 12,
    textLines: ["동기가 “대충하는 것 같더니 결과가 좋네? 좀 한다?”", "라고 말한다. 나의 생각은?"],
    answers: [
      { id: 1, text: "대충 한 거 아닌데?" },
      { id: 2, text: "맞아 내가 좀 하지." }
    ]
  }
  // 추가 질문은 위 양식과 똑같이 이 아래로 계속 추가해주세요.
];

// 퀴즈 질문 페이지 컴포넌트
export default function QuizQuestionPage({ onAnswer }) {
  // 현재 몇 번째 질문인지 추적하는 상태값 (배열 0번 인덱스부터 시작)
  const [currentIdx, setCurrentIdx] = useState(0);

  // 현재 화면에 보여줄 질문 데이터 한 세트
  const currentQuestion = QUESTIONS[currentIdx];

  // 답변 버튼 클릭 핸들러
  const handleAnswer = (answerIdx) => {
    // 1. 부모(App.jsx) 로 임시로 데이터를 보냄
    if (onAnswer) {
      onAnswer(answerIdx);
    }
    
    // 2. 숫자를 1씩 늘려 다음 질문으로 화면 업데이트
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // 마지막 질문일 경우 이곳에서 결과 페이지로 넘어가게 처리할 수 있습니다.
      alert('준비된 질문이 끝났습니다! 나중에 결과 페이지 연결 로직을 추가하세요.');
    }
  };

  return (
    <div className="quiz-question-container">
      {/* 애니메이션 없는 크기 줄어든 타이틀 이미지 */}
      <img 
        src={titleImage} 
        alt="나랑 찰떡인 직업은?!" 
        className="quiz-question-title" 
      />
      
      {/* 질문 진행도 (총 문항수는 12로 고정) */}
      <p className="quiz-step">{currentIdx + 1}/12</p>
      
      {/* 질문 내용 (배열의 텍스트를 한 줄씩 출력) */}
      <div className="quiz-question-text">
        {currentQuestion.textLines.map((line, idx) => (
          <p key={idx} style={{ margin: 0 }}>{line}</p>
        ))}
      </div>
      
      {/* 선택지 버튼들 (map을 이용해 데이터에서 설정한 답변들을 렌더링) */}
      <div className="quiz-answers-wrapper">
        {currentQuestion.answers.map((ans) => (
          <button 
            key={ans.id}
            className="quiz-start-button quiz-answer-button"
            onClick={() => handleAnswer(ans.id)}
          >
            {ans.text}
          </button>
        ))}
      </div>
    </div>
  );
}
