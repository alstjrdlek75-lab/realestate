# 🏠 수도권 부동산 전략 매트릭스 (Real Estate Strategy Matrix)

> **"살기 좋은 집(Living)과 사야 하는 집(Buying)은 다릅니다. 당신에게 맞는 최적의 부동산 교집합을 찾아보세요."**

사용자의 재정 상태, 실거주 편의성(Living), 미래 자산 투자 가치(Buying) 및 생애주기를 진단하여 **2x2 매트릭스 시각화, 맞춤형 3대 매수 전략, 점수 산출 세부 근거, 구체적인 추천 아파트 단지별 실거래가/도보거리 비교, 네이버 부동산 실매물 직통 연결, DSR 40% 자금 시뮬레이터**를 제공하는 인터랙티브 핀테크 웹 애플리케이션입니다.

---

## ✨ 주요 기능 (Key Features)

### 1. 🧭 4단계 스마트 부동산 포지션 진단
- **Step 1. 재정 역량**: 보유 순현금, 가구 연소득, 기존 대출, 월 감당 가능 원리금 직접 입력 & 퀵 프리셋
- **Step 2. 실거주 편의 (Living)**: 통근 한계 시간, 신축/대단지 선호도, 숲세권/공원 선호도, 슬세권 상권 선호도
- **Step 3. 자산 투자 가치 (Buying)**: GBD/주요 업무지구 직결 철도망(신분당선·8호선·GTX 등), 명문 학군/학원가, 시세차익, 환금성
- **Step 4. 생애주기 & 관심 지역 한정**: 사회초년생 / 신혼부부 / 학령기 자녀 가구 / 갈아타기 / 은퇴 및 경기도/서울 29개 주요 지역 선택

### 2. 📊 2x2 전략 매트릭스 시각화 & Top 3 매칭
- 내 포지션을 X축(실거주 만족도)과 Y축(자산 투자 가치) 4분면 위에 실시간 매핑
- 점수를 클릭하면 **AI 팩터별 가중치 및 세부 판단 근거 모달** 오픈
- 내 진단 포지션과 가장 가까운 수도권 지역 Top 3 랭킹 추천

### 3. 🎯 3대 맞춤형 부동산 실행 전략 (Strategy Dossiers)
- **거주·투자 분리형 (Rent-and-Invest)**: 강남/핵심지 갭투자 + 직주일치 가성비 전월세
- **황금 교집합 실거주 (Golden Intersection)**: 똘똘한 1채 실거주 + 신축/대단지 + 직주근접
- **스마트 징검다리 (Stepping Stone)**: 8호선/신분당선/GTX 연장선 1단계 매수 후 3~5년 주기 상급지 점프

### 4. 🏢 구체적인 추천 아파트 단지별 실전 비교 (네이버 부동산 연동)
- 각 권역별 **초역세권 대장주(도보 1~3분) vs 가성비 실속형(도보 8~12분) vs 초품아 학군형** 단지 프로필
- 84㎡ 네이버 실거래가 기준 시세 밴드, 전세가율, 예상 갭투자 금액, 매수 판단 팁
- **네이버 부동산 실매물 직통 연결(`m.land.naver.com`) 및 통합검색 연동**

### 5. 💰 DSR 40% 기반 안전 자금 시뮬레이터
- 가구 소득 대비 DSR 40% 안전 주담대 한도 자동 산출
- 월 상환 원리금 시뮬레이션 및 보유 현금 기반 추천 매매가 밴드 계산

---

## 🚀 빠른 시작 (Getting Started)

### 설치 및 로컬 실행
```bash
# 1. 저장소 복제
git clone <your-github-repo-url>
cd real-estate-strategy-matrix

# 2. 의존성 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

### 프로덕션 빌드
```bash
npm run build
```

---

## 🌐 깃허브 배포 가이드 (Deployment Guide)

### 방법 A. Vercel 배포 (가장 간편하고 추천)
1. [Vercel](https://vercel.com/)에 GitHub 계정으로 로그인합니다.
2. `Add New Project`를 누르고 본 저장소를 Import합니다.
3. Framework Preset: `Vite` 선택 후 `Deploy`를 클릭합니다. (1분 내 무료 배포 완료)

### 방법 B. GitHub Pages 배포 (GitHub Actions 활용)
1. 저장소 `Settings` > `Pages` 이동
2. `Build and deployment` > `Source`를 **GitHub Actions**로 설정
3. `vite.config.ts`의 `base` 경로를 저장소 이름으로 설정:
   ```ts
   // vite.config.ts
   export default defineConfig({
     base: '/<repository-name>/',
     // ...
   })
   ```

---

## 🛠️ 기술 스택 (Tech Stack)
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Lucide React (네이버 부동산 톤앤매너 디자인 시스템)
- **Data Visualization**: Recharts (Scatter Plot, Radar Chart)
- **Architecture**: Modular Component-Driven Architecture
