
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
let allBooks = []
let activePage = 1;
let itemsPerPage = 5;

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
                    <i onclick="getFav('${id}')" class="fa fa-heart fs-5 text-danger"></i>
                    <i onclick="getArc('${id}')" class="fa fa-archive fs-5 text-warning"></i>
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

const getArc = (id) => {
    const favIcon = allBooks.find((book) => book.id == id );
    console.log(favIcon)
}

const getFav = (id) => {
    const arcIcon = allBooks.find((book) => book.id == id );
    console.log(arcIcon);
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
        prevBtnBtn.ariaDisabled = true;
    } else {
        activePage--;
    }
    renderData(allBooks);
});

favBooks.addEventListener("click", displayFavorites);
archived.addEventListener("click", displayArchived);
allTheBooks.addEventListener("click", displayAllTheBooks);

