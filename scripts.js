document.addEventListener("DOMContentLoaded", function () 
{
    var hamburgerBtn = document.querySelector(".hamburger");
    var navList = document.querySelector(".nav-list");
    hamburgerBtn.addEventListener("click", function ()
    {
        navList.classList.toggle("active");
    });
});

let contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function() 
{
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    if (name === "" || email === "") 
    {
        alert("Please fill out all fields");
    } 
    else 
    {
        alert("Form submitted!");
    }
});
