// app.js : 영화 배열을 다루는 함수 6개 / 이재석(26) / 10주차
// average : 영화 배열 ⇒ 평균 평점(숫자)
function average(list) {
 let sum = 0;
 for (const m of list) {
 sum += m.rating;
 }
 return sum / list.length;
}


const best = (list) => {
    let top =  list[0];
    for (const m of list) {
        if (m.rating > top.rating) {
            top = m;
        }
    } 
    return top;
}

const filterByRating = (list, min) => {
    return list.filter(m => m.rating >= min);
}

const sortByRating = (list) => {
     return [...list].sort((a, b) => b.rating - a.rating);
}

const sorted = sortByRating(movies);

const yearsSince = (dateStr) => {
    return new Date().getFullYear() - new Date(dateStr).getFullYear();
}

 const posterUrl = (path, size) => {
    return "https://image.tmdb.org/t/p/" + size + path;
 }


// renderCards : 영화 배열 ⇒ 보드에 카드 생성(반환값 없음)
function renderCards(list) {
 const board = document.querySelector(".board");
 board.innerHTML = "";
 for (const m of list) {
 const card = document.createElement("article");
 card.className = "card";
 if (m.rating >= 8) { card.classList.add("hot"); }

 card.innerHTML = `
 <img class="poster" src="${posterUrl(m.poster, "w342")}" alt="${m.title} 포스터">
 <span class="badge">${m.rating}</span>
 <div class="info">
 <h2>${m.title}</h2>
 <p class="year">${m.year}</p>
 <button class="like" type="button">♥</button>
 </div>`;
 board.appendChild(card);
 }
 document.getElementById("count").textContent = list.length + "편";
 updateLikeCount();
 if (list.length === 0) { board.classList.add("is-empty"); } else { board.classList.remove("is-empty"); }

}

// sortBy : 영화 배열, 키 이름, 내림차순 여부 ⇒ 정렬한 새 배열(원본은 그대로)
function sortBy(list, key, desc) {
 const copy = [...list];
 copy.sort((a, b) => {
 if (typeof a[key] === "string") return a[key].localeCompare(b[key]);
 return a[key] - b[key];
 });
 if (desc) copy.reverse();
 return copy;
}
// applySort : 선택 상자 값으로 정렬해서 다시 그리기(반환값 없음)
function applySort() {
 renderCards(getView()); 
}

applySort(movies);




// 검색창 : 글자를 칠 때마다 제목으로 걸러서 다시 그리기(12.6절)
document.getElementById("q").addEventListener("input", (e) => {
 renderCards(getView());
});

document.getElementById("sort").addEventListener("change", applySort);

// getView : 없음 ⇒ 검색어로 거른 뒤 선택 상자 기준으로 정렬한 새 배열
function getView() {
 const keyword = document.getElementById("q").value.trim().toLowerCase();
 const found = movies.filter(m => m.title.toLowerCase().includes(keyword));
 const key = document.getElementById("sort").value;
 return sortBy(found, key, key !== "title");
}

//(e) => 를 function (e)로 바꿨음. 결과는 별 차이 없는 것 같음
document.querySelector(".board").addEventListener("click", function (e) { if (e.target.classList.contains("like")) { e.target.classList.toggle("liked"); updateLikeCount(); } });
function updateLikeCount() { document.getElementById("likeCount").textContent = document.querySelectorAll(".liked").length; }
document.getElementById("q").addEventListener("keydown", (e) => { if (e.key === "Escape") { e.target.value = ""; renderCards(getView()); } });

