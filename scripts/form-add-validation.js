/**
 * Created by Администратор on 5/16/2016.
 */
var validation = {};
var checkCounter = [];
var count = 0;
for (var i = 0; i <= 11; i++) {
    checkCounter[i] = false;
}

function checkLengthOfTitle() { //check the length of the title
    validation.title = document.getElementById("title-of-book");
    if (validation.title.value.length) {
        if (validation.title.value.length > 50) {
            document.getElementById("title-max-length").style.display = "block";
            checkCounter[0] = false;
        } else {
            document.getElementById("title-max-length").style.display = "none";
            checkCounter[0] = true;
        }
    }
}

function checkAuthors() {
    validation.authors = document.getElementById("authors");
    var count = 0;
    var authorsArr = [];
    authorsArr = validation.authors.value.split(',');
    console.log(authorsArr);
    authorsArr.forEach(function (element, index) {
        if (element.indexOf(" ") == -1) {
            count++;
        }
    });
    if (count > 0) {
        document.getElementById("authors-full-name").style.display = "block";
        checkCounter[1] = false;
    } else {
        document.getElementById("authors-full-name").style.display = "none";
        checkCounter[1] = true;
    }
}

function checkTheFirstLetterOfTitle() { //check the first letter of the title
    //var title = document.getElementById("title-of-book");
    var titleArray = validation.title.value.split("");
    if (titleArray[0].toLowerCase() == titleArray[0] && validation.title) {
        document.getElementById("title-uppercase-letter").style.display = "block";
        checkCounter[2] = false;
    } else {
        document.getElementById("title-uppercase-letter").style.display = "none";
        checkCounter[2] = true;
    }
}

function checkTheValidityOfInput() { //check the data type of the pages input
    validation.pages = document.getElementById("pages-of-book");
    var errorPages = document.getElementById("pages-data-type");
    //console.log(parseInt(pages.value));
    console.log(validation.pages.value);
    if (validation.pages && (parseInt(validation.pages.value) != validation.pages.value)) {
        errorPages.style.display = "block";
        checkCounter[3] = false;
    } else {
        errorPages.style.display = "none";
        checkCounter[3] = true;
    }
}

function checkTheMaxLengthOfPagesInput() { //check the max length of pages input
    //var pages = document.getElementById("pages-of-book");
    var errorPages = document.getElementById("pages-max-length");
    if (validation.pages.value > 10000) {
        errorPages.style.display = "block";
        checkCounter[4] = false;
    } else {
        errorPages.style.display = "none";
        checkCounter[4] = true;
    }
}

function checkTheMinLengthOfPagesInput() { //check the min length of pages input
    //var pages = document.getElementById("pages-of-book");
    var errorPages = document.getElementById("pages-min-length");
    if (validation.pages.value <= 0 && validation.pages) {
        errorPages.style.display = "block";
        checkCounter[5] = false;
    } else {
        errorPages.style.display = "none";
        checkCounter[5] = true;
    }
}

function checkPublicationCompany() {
    validation.publication = document.getElementById("publication-company-of-book");
    if (validation.publication.value.length > 30) {
        document.getElementById("publication-company-max-length").style.display = "block";
        checkCounter[6] = false;
    } else {
        document.getElementById("publication-company-max-length").style.display = "none";
        checkCounter[6] = true;
    }
}

function checkTheYearOfPublication() { //check the year of publication
    validation.year = document.getElementById("publication-year-of-book");
    var errorYear = document.getElementById("publication-year-min-year");
    if (validation.year.value < 1800) {
        errorYear.style.display = "block";
        checkCounter[7] = false;
    } else {
        errorYear.style.display = "none";
        checkCounter[7] = true;
    }
}

function checkTheValidityOfYearInput() {
    if (!parseInt(validation.year.value)) {
        document.getElementById("integer-year-input").style.display = "block";
        checkCounter[8] = false;
    } else {
        document.getElementById("integer-year-input").style.display = "none";
        checkCounter[8] = true;
    }
}

function checkDateEditionFormat() {
    validation.edition = document.getElementById("date-of-edition");
    if (!validation.edition.value.match(/^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)) {
        document.getElementById("date-format").style.display = "block";
        checkCounter[9] = false;
    } else {
        document.getElementById("date-format").style.display = "none";
        checkCounter[9] = true;
    }
}

function checkYearEditionDate() {
    var date = validation.edition.value;
    var checkYear = date.substr(date.length - 4);
    console.log(checkYear);
    if (checkYear < 1800) {
        document.getElementById("date-early").style.display = "block";
        checkCounter[10] = false;
    } else {
        document.getElementById("date-early").style.display = "none";
        checkCounter[10] = true;
    }
}

function checkISBN() {
    validation.isbn = document.getElementById("isbn");
    if (!validation.isbn.value.match(/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/)) {
        document.getElementById("isbn-format").style.display = "block";
        checkCounter[11] = false;
    } else {
        document.getElementById("isbn-format").style.display = "none";
        checkCounter[11] = true;
    }
}

function checkEverything(e) {
    var cnt = 0;
    checkCounter.forEach(function (element, index) {
        if (element == false) {
            cnt++;
        }
    });
    if (!localStorage.getItem("DBId") && cnt == 0) {
        $(".add-book").on("submit", addNewBook);
    } else {
        e.preventDefault();

        console.log(123123123123);
        console.log(cnt);
    }
}

/**
 * Set the data of new book to the localStorage
 * @param object
 */
function setToStorage(object) {
    //console.log(object);
    var listBooks = getStorage() || [];
    listBooks.push(object);
    localStorage.setItem("list-books", JSON.stringify(listBooks));
}

/**
 * Return the data of the chosen book
 */
function getStorage() {
    var listBooks = localStorage.getItem("list-books");
    return JSON.parse(listBooks) || [];
}

function rewriteStorage(arr) {
    localStorage.setItem("list-books", JSON.stringify(arr));
}

/**
 * Add new book to the list and redirection to the main page
 * @param e
 */
function addNewBook(e) {
    e.preventDefault();
    //console.log(validation);
    var newObject = {};
    for (key in validation) {
        newObject[key] = validation[key].value;
        //console.log(validation[key].value);
    }
    newObject.uniqId = Date.now();
    //console.log(newObject);
    setToStorage(newObject);
    count++;
    redirectTo("index.html");
}

/**
 * redirect to the home page
 * @param page{string}
 */
function redirectTo(page) {
    window.location.href = page;
}

/**
 * detect the index.html page
 */
function detectThePageListItems() {
    if ($("#list-container").length) {
        console.log('fdgdf');
        //console.log("Page is here");
        var listBooks = getStorage();
        console.log(listBooks);
        if (listBooks) {
            listBooks.forEach(function (item, i) {
                insertDataToNewListItem(item);
            });
        }
    } else {
        console.log("123");
    }
}

/*
 * sort books by the year of publication
 * */
function sortBooksByYearPublication(e) {
    e.preventDefault();
    var storage = getStorage();
    var tempSortedObject = _.sortBy(storage, function (item) {
        return item.year;
    });
    var liArr = document.querySelectorAll("li.list-item");
    liArr.forEach(function (element, index) {
        element.remove();
    });
    tempSortedObject.forEach(function (element, index) {
        insertDataToNewListItem(element);
    });
    var newLiArr = document.querySelectorAll("li.list-item");
    newLiArr.forEach(function (element, index) {
        $(element).addClass("animated fadeInLeft");
    });
}

function sortBooksByTitle(e) {
    e.preventDefault();
    var storage = getStorage();
    var tempSortedObject = _.sortBy(storage, function (item) {
        return item.title;
    });
    var liArr = document.querySelectorAll("li.list-item");
    liArr.forEach(function (element, index) {
        element.remove();
    });
    tempSortedObject.forEach(function (element, index) {
        insertDataToNewListItem(element);
    });
    var newLiArr = document.querySelectorAll("li.list-item");
    newLiArr.forEach(function (element, index) {
        $(element).addClass("animated fadeInRight");
    });
}

function insertDataToNewListItem(object) {
    var element = '<li class="list-item" data-id=' + object.uniqId + '> ' +
        '<a href="https://en.wikipedia.org/wiki/War_and_Peace"> ' +
        '<img src="" alt="" data-id='+ object.uniqId +'> ' +
        '<ul class="list-item-description">' +
        ' <li> <p class="desc">Title: </p> <p class="title">' + object.title + '</p> </li>' +
        ' <li> <p class="desc">Authors: </p> <p class="authors">' + object.authors + '</p> </li> ' +
        '<li><p class="desc">Pages: </p> <p class="pages">' + object.pages + '</p> </li> ' +
        '<li> <p class="desc">Publication Company:</p> <p class="publication">' + object.publication + '</p> </li> ' +
        '<li> <p class="desc">Year of Publication:</p> <p class="year">' + object.year + '</p> </li>' +
        ' <li> <p class="desc">Date of Edition: </p> <p class="edition">' + object.edition + '</p> </li>' +
        ' <li> <p class="desc">ISBN: </p> <p class="isbn">' + object.isbn + '</p> </li>' +
        ' <li class="list-item-description-buttons"> ' +
        '<div class="manage"> <a href="#"><button class="edit" data-id=' + object.uniqId + '>Edit</button></a> <a href="#"><button class="remove" data-id="' + object.uniqId + '">Delete</button></a> </div> ' +
        '</li> ' +
        '</ul>' +
        ' </a> ' +
        '</li>';
    $(".list-view").append(element);
}

function deleteBook(e) {
    e.preventDefault();
    var id = $(this).data("id");
    console.log(id);
    $(this).parents(".list-item").remove();
    var storage = getStorage();
    storage.forEach(function (element, index) {
        if (element.uniqId === id) {
            console.log(12334);
            storage.splice(index, 1);
        }
    });
    console.log(storage);
    rewriteStorage(storage);
    count--;
}

//function NumberOfBooks(){
//    $(".add-new-book").append(function(){
//       return "\<label\>Now there are" + count + "books. You can add new one. Just click this button\<\/label\>"
//    });
//}

/*
 * This function takes the info about the chosen to edit book and puts into the new localStorage called DBId
 * */
function editThisBook(e) {
    e.preventDefault();
    var id = $(this).data("id");
    console.log(id);
    var tempObject = {};
    var storage = getStorage();
    storage.forEach(function (element, index) {
        if (element.uniqId === id) {
            tempObject = element;
        }
    });
    console.log(tempObject);
    localStorage.setItem("DBId", tempObject.uniqId);
    redirectTo("add-new-book-to-list.html");
}

/*
 * This  function takes the info of the book which you re gonna edit and use "fillAllFields" function
 * */
function addEditInfo() {
    if ($("#add-book-check").length && localStorage.getItem("DBId")) {
        document.getElementById("add-but").innerHTML = "Save Changings";
        var editObject = localStorage.getItem("DBId");
        console.log(editObject);
        var storage = getStorage();
        storage.forEach(function (element, index) {
            if (element.uniqId == editObject) {
                fillAllFields(element);
            }
        });
    } else {
        console.log("nothing");
    }
}

/*
 *
 * */
function ChangeInfoInLocalStorage(e) {
    e.preventDefault();
    var storage = getStorage();
    var dbid = localStorage.getItem("DBId");
    storage.forEach(function (element, index) {
        if (element.uniqId == dbid) {
            element.title = document.getElementById("title-of-book").value;
            element.authors = document.getElementById("authors").value;
            element.pages = document.getElementById("pages-of-book").value;
            element.publication = document.getElementById("publication-company-of-book").value;
            element.year = document.getElementById("publication-year-of-book").value;
            element.edition = document.getElementById("date-of-edition").value;
            element.isbn = document.getElementById("isbn").value;
        }
    });
    rewriteStorage(storage);
    redirectTo('index.html');
}

/*
 * When you edit the existed book, this function adds values to the input fields
 * */
function fillAllFields(object) {
    if ($("#add-book-check").length && localStorage.getItem("DBId")) {
        document.getElementById("title-of-book").value = object.title;
        document.getElementById("authors").value = object.authors;
        document.getElementById("pages-of-book").value = object.pages;
        document.getElementById("publication-company-of-book").value = object.publication;
        document.getElementById("publication-year-of-book").value = object.year;
        document.getElementById("date-of-edition").value = object.edition;
        document.getElementById("isbn").value = object.isbn;
    }
}

/*
 * To clear the local storage (DBId)
 * */
function clearDBId() {
    localStorage.removeItem("DBId");
}

addEditInfo();
detectThePageListItems();

/*
 * Open popup to change a title of the page
 * */
function openPopUp() {
    setTimeout(function () {
        $("#background-gray-color").addClass("active");
        $("#pop-up").addClass("animated fadeInUp");
        $("#pop-up").addClass("active");
    }, 500)
}


/*
 * Close popup to change a title of the page
 * */
function clPopUp() {
    $("#pop-up").removeClass("animated fadeInUp");
    $("#pop-up").removeClass("active");
    $("#background-gray-color").removeClass("active");
    document.getElementById("if-title-exist").style.display = "none";
}


/*
* Creates all elements inside the popup and then took an old title from local storage
* */
function changeTitleOfThePage() {
    var oldTitle = {};
    if (!localStorage.getItem('title-name')) {
        oldTitle = 'My Book Collection - List of Books';
    } else {
        oldTitle = JSON.parse(localStorage.getItem("title-name"))
    }
    var popupInside = '<h1 class="old-title">' + oldTitle.title + '</h1> ' +
        '<p class="desc-of-this">This is old tile of the page</p>' +
        '<input type="text" id="new-title" class="new-title-input">' +
        '<p class="errorHere animated bounceIn" id="if-title-exist">Please, type the title of the page</p>' +
        '<p class="desc-of-this">Please, type here a new title of the page</p>' +
        '<button class="save-title" id="save-title">Save Title</button>';
    $("#pop-up").append(popupInside);
}

/*
* Change the title on the main page and then reloads a page
* */
function setNewTitle() {
    if (document.getElementById("new-title").value) {
        var titleObj = {
            title: document.getElementById("new-title").value,
            dateOfChange: Date.now()
        };
        localStorage.setItem("title-name", JSON.stringify(titleObj));
        redirectTo("index.html");
    } else {
        document.getElementById("if-title-exist").style.display = "block";
    }
}

/*
* Saves the new title permanently
* */
function appendNewTitle(){
    var title = JSON.parse(localStorage.getItem("title-name"));
    document.getElementById("the-highest-title").innerHTML = title.title;
}

function previewFile(){
    var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
    validation.picture = file;
}


function setUpPage() {
    if ($("#the-highest-title").length) {
        appendNewTitle();
        changeTitleOfThePage();
    }
    $("#title-of-book").on("change", checkLengthOfTitle);
    $("#title-of-book").on("change", checkTheFirstLetterOfTitle);
    $("#pages-of-book").on("change", checkTheValidityOfInput);
    $("#pages-of-book").on("change", checkTheMaxLengthOfPagesInput);
    $("#pages-of-book").on("change", checkTheMinLengthOfPagesInput);
    $("#authors").on("change", checkAuthors);
    $("#publication-company-of-book").on("change", checkPublicationCompany);
    $("#publication-year-of-book").on("change", checkTheYearOfPublication);
    $("#publication-year-of-book").on("change", checkTheValidityOfYearInput);
    $("#date-of-edition").on("change", checkDateEditionFormat);
    $("#date-of-edition").on("change", checkYearEditionDate);
    $("#isbn").on("change", checkISBN);
    $(document).on("click", ".remove", deleteBook);
    $(document).on("click", ".edit", editThisBook);
    $("#sort-by-publication-year").on("click", sortBooksByYearPublication);
    $("#sort-by-title").on("click", sortBooksByTitle);
    $("#book-adition").on("click", clearDBId);
    if ($("#add-book-check").length && localStorage.getItem("DBId")) {
        $("#add-but").on("click", ChangeInfoInLocalStorage);
    } else {
        $("#add-but").on("click", checkEverything);
    }
    $("#edit-title-of-page").on("click", openPopUp);
    //$("#edit-title-of-page").on("click", changeTitleOfThePage);
    $("#background-gray-color").on("click", clPopUp);
    $("#save-title").on("click", setNewTitle);
}

window.addEventListener("load", setUpPage, false);

////form validation rules
//$("#register-form").validate({
//    rules: {
//        task_of_book: "required"
//    },
//    messages: {
//        task_of_book: "Please enter your firstname"
//    },
//    submitHandler: function(form) {
//        form.submit();
//    }
//});