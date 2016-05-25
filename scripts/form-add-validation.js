/**
 * Created by Администратор on 5/16/2016.
 */
var validation = {};

function checkLengthOfTitle(){ //check the length of the title
    validation.title = document.getElementById("title-of-book").value;
    if (validation.title.length > 50){
        document.getElementById("title-max-length").style.display = "block";
    } else {
        document.getElementById("title-max-length").style.display = "none";
    }
}

function checkTheFirstLetterOfTitle(){ //check the first letter of the title
    //var title = document.getElementById("title-of-book");
    var titleArray = validation.title.split("");
    if (titleArray[0].toLowerCase() == titleArray[0] && validation.title){
        document.getElementById("title-uppercase-letter").style.display = "block";
    } else {
        document.getElementById("title-uppercase-letter").style.display = "none";
    }
}

function checkTheValidityOfInput(){ //check the data type of the pages input
    validation.pages = document.getElementById("pages-of-book");
    var errorPages = document.getElementById("pages-data-type");
    //console.log(parseInt(pages.value));
    //console.log(pages.value);
    if (validation.pages && parseInt(validation.pages) != validation.pages){
        errorPages.style.display = "block";
    } else {
        errorPages.style.display = "none";
    }
}

function checkTheMaxLengthOfPagesInput(){ //check the max length of pages input
    //var pages = document.getElementById("pages-of-book");
    var errorPages = document.getElementById("pages-max-length");
    if (validation.pages > 10000){
        errorPages.style.display = "block";
    } else {
        errorPages.style.display = "none";
    }
}

function checkTheMinLengthOfPagesInput(){ //check the min length of pages input
    //var pages = document.getElementById("pages-of-book");
    var errorPages = document.getElementById("pages-min-length");
    if (validation.pages <= 0 && validation.pages){
        errorPages.style.display = "block";
    } else {
        errorPages.style.display = "none";
    }
}

function checkTheYearOfPublication(){ //check the year of publication
    validation.year = document.getElementById("publication-year-of-book");
    var errorYear = document.getElementById("publication-year-min-year");
    if(validation.year < 1800){
        errorYear.style.display = "block";
    } else {
        errorYear.style.display = "none";
    }
}

/**
 * Set the data of new book to the localStorage
 * @param object
 */
function setToStorage(object){
    //console.log(object);
    localStorage.setItem("add-new-book-to-list", JSON.stringify(object));
}

/**
 * Return the data of the chosen book
 */
function getStorage(){
    var item = localStorage.getItem("add-new-book-to-list");
    return JSON.parse(item);
}

/**
 * Add new book to the list and redirection to the main page
 * @param e
 */
function addNewBook(e){
    e.preventDefault();
    setToStorage(validation);
    redirectTo("index.html");
}

/**
 * redirect to the home page
 * @param page{string}
 */
function redirectTo(page){
    window.location.href = page;
}

/**
 * detect the index.html page
 */
function detectThePageListItems(){
    if($("#list-view-index-html").length){
        //console.log("Page is here");
        var infoAboutNewBook = getStorage();
        //console.log(infoAboutNewBook);
        insertDataToNewListItem(infoAboutNewBook);
    } else {
        console.log("123");
    }
}

function insertDataToNewListItem(object){
    var element = '<li class="list-item"> <a href="https://en.wikipedia.org/wiki/War_and_Peace"> <img src="images/WarAndPeace.jpg" alt=""> <ul class="list-item-description"> <li> <p class="desc">Title: </p> <p class="title">'+object.title+'</p> </li> <li> <p class="desc">Authors: </p> <p class="authors">Not Ready</p> </li> <li><p class="desc">Pages: </p> <p class="pages">'+object.pages+'</p> </li> <li> <p class="desc">Publication Company:</p> <p class="publication">Not Ready</p> </li> <li> <p class="desc">Year of Publication:</p> <p class="year">'+object.year+'</p> </li> <li> <p class="desc">Date of Edition: </p> <p class="edition">Not Ready</p> </li> <li> <p class="desc">ISBN: </p> <p class="isbn">Not Ready</p> </li> <li class="list-item-description-buttons"> <div class="manage"> <a href="#"><button class="edit">Edit</button></a> <a href="#"><button class="remove">Delete</button></a> </div> </li> </ul> </a> </li>';
   $(".list-view").append(element);
}

detectThePageListItems();

function setUpPage(){
    document.getElementById("title-of-book").addEventListener("change", checkLengthOfTitle, false);
    document.getElementById("title-of-book").addEventListener("change", checkTheFirstLetterOfTitle, false);
    document.getElementById("pages-of-book").addEventListener("change", checkTheValidityOfInput, false);
    document.getElementById("pages-of-book").addEventListener("change", checkTheMaxLengthOfPagesInput, false);
    document.getElementById("pages-of-book").addEventListener("change", checkTheMinLengthOfPagesInput, false);
    document.getElementById("publication-year-of-book").addEventListener("change", checkTheYearOfPublication, false);
    $(".add-book").on("submit", addNewBook);
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