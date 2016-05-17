/**
 * Created by Администратор on 5/16/2016.
 */

function checkLengthOfTitle(){ //check the length of the title
    var title = document.getElementById("title-of-book");
    if (title.value.length > 50){
        document.getElementById("title-max-length").style.display = "block";
    } else {
        document.getElementById("title-max-length").style.display = "none";
    }
}

function checkTheFirstLetterOfTitle(){ //check the first letter of the title
    var title = document.getElementById("title-of-book");
    var titleArray = title.value.split("");
    if (titleArray[0].toLowerCase() == titleArray[0] && title.value){
        document.getElementById("title-uppercase-letter").style.display = "block";
    } else {
        document.getElementById("title-uppercase-letter").style.display = "none";
    }
}

function checkTheValidityOfInput(){ //check the data type of the pages input
    var pages = document.getElementById("pages-of-book");
    var errorPages = document.getElementById("pages-data-type");
    //console.log(parseInt(pages.value));
    //console.log(pages.value);
    if (parseInt(pages.value) != pages.value){
        errorPages.style.display = "block";
    } else {
        errorPages.style.display = "none";
    }
}

function checkTheMaxLengthOfPagesInput(){ //check the max length of pages input
    var pages = document.getElementById("pages-of-book");
    var errorPages = document.getElementById("pages-max-length");
    if (pages.value > 10000){
        errorPages.style.display = "block";
    } else {
        errorPages.style.display = "none";
    }
}

function checkTheMinLengthOfPagesInput(){ //check the min length of pages input
    var pages = document.getElementById("pages-of-book");
    var errorPages = document.getElementById("pages-min-length");
    if (pages.value <= 0){
        errorPages.style.display = "block";
    } else {
        errorPages.style.display = "none";
    }
}

function checkTheYearOfPublication(){ //check the year of publication
    var year = document.getElementById("publication-year-of-book");
    var errorYear = document.getElementById("publication-year-min-year");
    if(year.value < 1800){
        errorYear.style.display = "block";
    } else {
        errorYear.style.display = "none";
    }
}

function setUpPage(){
    document.getElementById("title-of-book").addEventListener("change", checkLengthOfTitle, false);
    document.getElementById("title-of-book").addEventListener("change", checkTheFirstLetterOfTitle, false);
    document.getElementById("pages-of-book").addEventListener("change", checkTheValidityOfInput, false);
    document.getElementById("pages-of-book").addEventListener("change", checkTheMaxLengthOfPagesInput, false);
    document.getElementById("pages-of-book").addEventListener("change", checkTheMinLengthOfPagesInput, false);
    document.getElementById("publication-year-of-book").addEventListener("change", checkTheYearOfPublication, false);
}

window.addEventListener("load", setUpPage, false);



