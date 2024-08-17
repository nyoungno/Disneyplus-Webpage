const API_KEY = `e00547fc94aa7e12a23d470d3d86281d`;
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
let movieList = [];
const menus = document.querySelectorAll(".menus button");

// 각 메뉴 버튼에 클릭 이벤트 추가
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getMovieByCategory(event))
);
let url = new URL(
  `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`
);

let totalResult = 0;
let page = 1;
const pageSize = 20; // TMDB API는 페이지 크기를 지정할 수 없으며, 기본값은 20입니다
let groupSize = 10;

var input = document.getElementById("search-input");

// 검색 입력창에서 Enter 키 입력 시 검색 버튼 클릭 이벤트 발생
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("search-button").click();
  }
});

// 영화 목록을 가져오는 비동기 함수
const getMovies = async () => {
  try {
    url.searchParams.set("page", page);
    // url.searchParams.set("pageSize", pageSize); // 이 줄은 필요 없음

    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 200) {
      if (data.results.length === 0) {
        throw new Error("검색 결과가 없습니다.");
      }
      movieList = data.results;
      totalResult = data.total_results;
      render(); // 영화 목록을 화면에 렌더링
      paginationRender(); // 페이지네이션 렌더링
    } else {
      throw new Error(data.status_message);
    }
  } catch (error) {
    errorRender(error.message); // 에러 메시지 렌더링
    document.querySelector(".pagination").innerHTML = ""; // 검색 결과가 없을 시 페이지네이션이 사라짐
  }
};

// 가장 최신 영화 목록을 가져오는 함수
const getLatestMovie = async () => {
  url = new URL(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`
  );
  page = 1;
  getMovies();
};

// 선택된 카테고리에 따라 영화를 가져오는 함수
const getMovieByCategory = async (event) => {
  const category = event.target.innerText; // 여기에 장르 이름을 ID로 변환하는 로직이 필요합니다.
  const genreMap = {
    액션: 28,
    모험: 12,
    애니메이션: 16,
    코미디: 35,
    범죄: 80,
    다큐멘터리: 99,
    드라마: 18,
    가족: 10751,
    판타지: 14,
    역사: 36,
    공포: 27,
    음악: 10402,
    미스터리: 9648,
    로맨스: 10749,
    SF: 878,
    TV영화: 10770,
    스릴러: 53,
    전쟁: 10752,
    서부: 37,
    // 필요한 장르 추가
  };
  const genreId = genreMap[category];
  url = new URL(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`
  );
  page = 1;
  document.getElementById("selected-category").innerText = category; // 선택된 카테고리 제목 업데이트
  getMovies();
};

// 키워드로 영화를 검색하는 함수
const getMovieByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${keyword}`
  );
  page = 1;
  document.getElementById("selected-category").innerText =
    `'` + keyword + `'` + "으로 검색한 결과"; // 카테고리 제목 또는 검색결과를 보여줌
  getMovies();
};

// 영화 목록을 화면에 렌더링하는 함수
const render = () => {
  const movieHTML = movieList
    .map(
      (movie) => `<div class="movie">
                    <img src="${IMG_URL}${movie.poster_path}"
                        class="movie-img" alt="image" onerror="this.onerror=null; this.src='https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg';">

                    <div class="movie-info">
                        <h4>${movie.title}</h4>
                        <span class="${getColor(
                          movie.vote_average
                        )}">${movie.vote_average.toFixed(1)}</span>
                    </div>

                    <div class="overview">
                        ${movie.overview || "내용없음"}
                    </div>
                </div>` // 여기서 onerror는 출처가 없는 이미지를 대처함
    )
    .join("");

  document.getElementById("movie-board").innerHTML = movieHTML;
};

// 에러 메시지를 화면에 렌더링하는 함수
const errorRender = (errorMessage) => {
  const errorHTML = `<div>
  ${errorMessage}
</div>`;
  document.getElementById("movie-board").innerHTML = errorHTML;
};

// 페이지네이션을 화면에 렌더링하는 함수
const paginationRender = () => {
  const totalPages = Math.ceil(totalResult / 20);
  const pageGroup = Math.ceil(page / groupSize);
  let lastPage = pageGroup * groupSize;
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = "";

  if (page > 1) {
    paginationHTML = `<li class="page-item" onclick="moveToPage(1)">
                        <a class="page-link" href='#js-bottom'>&lt;&lt;</a>
                      </li><li class="page-item" onclick="moveToPage(${
                        page - 1
                      })"><a class="page-link" href="#">&lt;</a></li>`;
  }

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item  ${
      i === page ? "active" : ""
    }"onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
  }

  if (page < 500) {
    paginationHTML += `<li class="page-item" onclick="moveToPage(${
      page + 1
    })"><a class="page-link" href="#">&gt;</a></li>
    <li class="page-item" onclick="moveToPage(500)">
                          <a class="page-link" href='#js-bottom'>&gt;&gt;</a>
                         </li>`;
  }

  document.querySelector(".pagination").innerHTML = paginationHTML;
};

// 페이지 이동 함수
const moveToPage = (pageNum) => {
  page = pageNum;
  getMovies();
};

// 검색창 토글 함수
const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

// 평점에 따른 색상 반환 함수
function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

// 정렬 메뉴에 클릭 이벤트 추가
const sortMovies = document.querySelectorAll(".sortMovies button");

sortMovies.forEach((sortMovie) =>
  sortMovie.addEventListener("click", (event) => getMoviesBySort(event))
);

// 정렬 기준에 따라 영화를 가져오는 함수
// const getMoviesBySort = (event) => {
//   const sortMenu = event.target.innerText.trim();
//   let sortBy;

//   switch (sortMenu) {
//     case "인기도":
//       sortBy = "popularity.desc";
//       break;
//     case "평점":
//       sortBy = "vote_average.desc";
//       break;
//     case "개봉일":
//       sortBy = "release_date.desc";
//       break;
//     default:
//       sortBy = "popularity.desc"; // 기본값은 인기도로 설정
//       break;
//   }

//   // 현재 선택된 장르 아이디 가져오기
//   const selectedGenreId = url.searchParams.get("with_genres");

//   // URL 업데이트: 선택된 장르와 정렬 기준을 모두 반영
//   url = new URL(
//     `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=${sortBy}&include_adult=false&include_video=false&page=1&with_genres=${selectedGenreId}`
//   );

//   // 영화 목록을 가져오기
//   getMovies();
// };

// 정렬 기준에 따라 영화를 가져오는 함수
const getMoviesBySort = (event) => {
  const sortMenu = event.target.innerText.trim();
  let sortBy;

  switch (sortMenu) {
    case "인기도":
      sortBy = "popularity.desc";
      break;
    case "평점":
      sortBy = "vote_average.desc";
      break;
    case "개봉일":
      sortBy = "release_date.desc";
      break;
    default:
      sortBy = "popularity.desc"; // 기본값은 인기도로 설정
      break;
  }

  // 현재 URL을 유지하고 정렬 기준만 업데이트
  const urlParams = new URLSearchParams(url.search);
  urlParams.set("sort_by", sortBy);

  url = new URL(`${url.origin}${url.pathname}?${urlParams.toString()}`);

  // 영화 목록을 가져오기
  getMovies();
};

// 초기 영화 목록 가져오기
getLatestMovie();
