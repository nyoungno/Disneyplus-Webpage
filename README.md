# 🎬 디즈니+ 스타일 영화 정보 사이트

이 프로젝트는 TMDb API를 활용해 다양한 영화 정보를 제공하는 반응형 웹사이트입니다. Bootstrap 5와 Font Awesome을 기반으로 구성된 UI와 함께, JavaScript를 통해 동적인 사용자 경험을 제공합니다.

---

## 🚀 주요 기술 및 라이브러리

| 분류 | 라이브러리/기술 | 설명 |
|------|----------------|------|
| **CSS 프레임워크** | Bootstrap 5.3.3 | 반응형 그리드, 컴포넌트, 유틸리티 클래스 제공 |
| **아이콘 라이브러리** | Font Awesome | 다양한 아이콘 활용 (🔍 등) |
| **JS 라이브러리** | Popper.js 2.11.8 | 드롭다운 및 툴팁 위치 계산 |
| **API** | TMDb API | 영화 포스터, 제목, 평점, 개요 등 데이터 제공 |
| **프론트엔드 기술** | HTML5, CSS, JS | 시맨틱 마크업, 사용자 정의 스타일 및 이벤트 처리 |
| **CDN 사용** | Bootstrap, Popper.js, Font Awesome | 빠르고 간편한 외부 리소스 로딩 |

---

## 🧩 주요 기능 및 UI 구성

### 🧭 헤더
- 상단에 디즈니+ 로고 배치
- 🔍 **검색 기능**: 아이콘 클릭 시 검색창 토글

### 🎛️ 영화 카테고리 & 정렬
- **19개 장르 버튼** (액션, 코미디, 애니메이션 등)
- **정렬 기능**: 인기도, 평점, 개봉일 기준

### 🎞️ 메인 영화 카드
- **포스터 이미지**, **제목**, **평점** 표시
- **호버 시 개요(overview)** 표시

### 🔢 페이지네이션
- 이전 / 다음 페이지 버튼으로 영화 목록 탐색

### 📚 푸터
- **FAQ 섹션**: 아코디언 형태의 4가지 질문
- **하단 정보**: 디즈니+ 로고 및 정책 링크
- TMDb API 사용 관련 안내 포함

---

## 💡 반응형 디자인

- `viewport` 메타 태그로 모바일 친화적 설정
- Bootstrap 그리드 시스템 활용으로 다양한 해상도 대응

---

## 🌐 CDN 링크

```html
<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Font Awesome -->
<script src="https://kit.fontawesome.com/2c827c8cca.js" crossorigin="anonymous"></script>

<!-- Bootstrap JS + Popper -->
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"></script>
## 포트폴리오 웹사이트 링크 : <https://nyoungno-disneyplus.netlify.app/>
