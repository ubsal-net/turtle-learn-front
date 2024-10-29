# **Turtlearn (터틀런)**

---

## **프로젝트 개요**  
Turtlearn은 **경계선 지능인**을 위한 평생 교육 프로그램을 **전국적으로 확산**하기 위해 개발된 앱입니다.  
이 프로그램은 반복적인 학습과 훈련을 통해 **소통 능력과 자립을 지원**하며, 서울시에 한정된 교육 프로그램을 디지털화하여 **언제 어디서나 학습 기회를 제공**하는 것을 목표로 합니다.

---

### **📺 YouTube 시연 영상**  
[![Turtlrun Project Video](https://img.youtube.com/vi/nIzAK50_qOs/0.jpg)](https://www.youtube.com/watch?v=nIzAK50_qOs)  
**[YouTube에서 보기](https://www.youtube.com/watch?v=nIzAK50_qOs)**

---

## **Skills**
* React Native(expo) 
* JavaScript  
* Recoil  
* Axios  

---

## **History**
- 2024 SW중심대학 디지털 경진대회 - **SW 부문 학교 대표 출전**

---

## **주요 기여 및 역할**

1. **JWT 기반 인증 시스템 구현**  
   - **Axios**를 활용해 **JWT 로그인 및 회원가입 기능**을 구현하고, 사용자 인증 시스템을 구축했습니다.

2. **Recoil을 이용한 상태 관리 최적화**  
   - Recoil로 사용자 정보와 상태를 관리하며, **데이터 흐름을 효율적으로 최적화**했습니다.

3. **AI 서버와의 실시간 통신 구현**  
   - 사용자 진로 탐색 시 **커스텀 훅을 사용해 Recoil에 저장된 데이터를 AI 서버에 매개변수로 전송**했습니다. 

4. AI 진로탐색 채팅에서 **FlatList와 scrollToEnd로 자연스러운 메시지 렌더링 구현**  
   - 채팅 메시지를 FlatList로 렌더링하고 **scrollToEnd 기능**을 활용해 **유연한 사용자 인터페이스**를 구현했습니다.

5. **반응형 디자인 구현**  
   - **Dimensions API**를 적용해 다양한 기기에서 UI가 **일관되게 동작**하도록 설계했습니다.

---

## **주요 이슈 및 해결 방법**

### **1. Recoil과 React 훅 사용 시 발생한 오류**  
- **문제**:  
  Recoil로 관리하던 사용자 정보를 AI 서버로 전송하는 과정에서 **`useRecoilValue` 훅을 컴포넌트 외부에서 호출**해 오류가 발생했습니다.  
  이는 React 훅이 반드시 **컴포넌트 내부에서 호출되어야 하는 규칙**을 어겨 데이터 전송이 중단되고 일부 기능이 작동하지 않는 문제를 초래했습니다.

- **해결 방법**:  
  - **커스텀 훅**을 도입해 데이터 페칭 로직을 컴포넌트와 분리하고, 코드의 **재사용성과 유지보수성을 개선**했습니다.  
  - 이로써 컴포넌트가 비대해지는 것을 방지하고, 사용자 정보를 **안전하게 전송**할 수 있었습니다.

---

### **2. 반응형 디자인 호환성 문제**  
- **문제**:  
  다양한 모바일 기기에서 **화면 크기와 해상도 차이**로 인해 UI가 특정 기기에서 잘리거나 비율이 어긋나는 문제가 발생했습니다.

- **해결 방법**:  
  - **Dimensions API**를 활용해 **화면 크기에 맞게 UI 요소가 동적으로 조정**되도록 설계했습니다.  
  - 여러 기기에서 테스트를 거쳐 반응형 디자인이 **일관되게 동작**하도록 검증했습니다. 이로써 모든 기기에서 **일관된 사용자 경험**을 제공하는 데 성공했습니다.
