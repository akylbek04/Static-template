
const spinner = document.querySelector("#spinner");
const table = document.querySelector("table");
const tBody = document.querySelector("tbody");
const prevBtn = document.querySelector("#previous");
const nextBtn = document.querySelector("#next");
const url = "https://649ab9c2bf7c145d02396134.mockapi.io/my-books";
const pageStatus = document.querySelector("#page-status");
const allTheBooks = document.querySelector("#allBooks");
const favBooks = document.querySelector("#favoriteBooks");
const archived = document.querySelector("#archivedBooks");
const searchInput = document.querySelector("#searchInput")
const searchBtn = document.querySelector("#button-addon2");
const closeButton = document.querySelector("#input-group");
let allBooks = []
let activePage = 1;
let itemsPerPage = 5;
let filteredData = [];






(async () => {
    const res = await axios.get(url);
    allBooks = res.data;
    setTimeout(() => {
        spinner.style.display = "none";
        renderData(allBooks);
    }, 1000)
})()

const displayFavorites = () => {
    const filterFav = allBooks.filter(el => el.favorite === true);
    console.log(filterFav)
    renderData(filterFav);

    
}

const displayArchived = () => {
    const filterArc = allBooks.filter(el => el.archived === true);
    console.log(filterArc)
    renderData(filterArc);
}

const displayAllTheBooks = () => {
    renderData(allBooks);
}

const renderData = (books) => {
    const totalPage = books.length / itemsPerPage
    pageStatus.innerText = activePage + ' / ' + totalPage;
    
    const endIndex = activePage * itemsPerPage;
    const startIndex = (activePage - 1) * itemsPerPage;
    const sliced = books.slice(startIndex, endIndex);
    tBody.innerHTML = "";
    // books = []
    if(sliced.length){
        sliced.forEach((book, index) => {
            const {img, author, title, year, id} = book
            const row = `
            
            <tr>
            <td>${index + 1}</td>
            <td>
            <img
            src="${img}"
            width="50"
            height="50"
            alt=""
            />
            </td>
            <td>${title}</td>
            <td>${author.length ? author : 'N/A' }</td>
            <td>${year}</td>
            <td class="d-flex align-items-center justify-content-around">
            <i onclick="getFav('${id}', event)" class="fa fa-heart fs-5 text-secondary"></i>
            <i onclick="getArc('${id}', event)" class="fa fa-archive fs-5 text-secondary"></i>
            </td>
            </tr>
            `
            
            
            tBody.innerHTML += row;
            
        });
    } else {
        tBody.innerHTML = `
        <tr>
        <td colspan="6" class="text-center">No Data Found</td>
        </tr>
        `
    }
}

const getFav = (id, event) => {
    const favIcon = allBooks.find((book) => book.id == id );
   
    
    const editUrl = url +"/"+ favIcon.id.toString();
    if(favIcon.favorite === false && event.target.className.includes("text-secondary")){
        event.target.classList.remove("text-secondary");
        event.target.classList.add("text-danger");
        fetch(editUrl, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                favorite: true
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err))

    } else {
        event.target.classList.remove("text-secondary");
        event.target.classList.add("text-success");
        fetch(editUrl, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                favorite: false
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err))
    }
}

const getArc = (id, event) => {
    const arcIcon = allBooks.find((book) => book.id == id );
    console.log(arcIcon);

    const editUrl = url +"/"+ arcIcon.id.toString();
    if(arcIcon.archived === false && event.target.className.includes("text-secondary")){
        event.target.classList.remove("text-secondary");
        event.target.classList.add("text-warning");
        fetch(editUrl, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                archived: true
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err));
        
    } else {

        event.target.classList.remove("text-secondary");
        event.target.classList.add("text-success");

        fetch(editUrl, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                archived: false
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err))
        
        arcColor = "text-secondary";
    }

}


nextBtn.addEventListener("click", () => {
    if(activePage >= (allBooks.length / itemsPerPage)){
        nextBtn.ariaDisabled = true;
    } else {
        activePage++;
    }
    
    renderData(allBooks);
});

prevBtn.addEventListener("click", () => {
    if(activePage < 2){
        prevBtn.ariaDisabled = true;
    } else {
        activePage--;
    }
    renderData(allBooks);
});

const searchBook = () => {
    const res = []
    allBooks.forEach(book => {
        if(book.title.toLowerCase().includes(searchInput.value)){
            res.push(book)
        }
    })
    renderData(res);
}

const closeBtn = () => {
    const btn = document.createElement("div");
    btn.className = "btn btn-outline-danger";
    btn.type = button;
    btn.id = "button-addon1"
    btn.innerText = "X";
    closeButton.appendChild(btn);
}

searchInput.addEventListener('keyup', closeBtn)
searchBtn.addEventListener('click', searchBook)
favBooks.addEventListener("click", displayFavorites);
archived.addEventListener("click", displayArchived);
allTheBooks.addEventListener("click", displayAllTheBooks);

