
let lis = document.querySelectorAll("ul li"); //  toDelete input_Fild

if (window.localStorage.getItem("color")) {
        lis.forEach((e) => {
        e.classList.remove("active");
    });
    document.querySelector(`[data-color="${window.localStorage.getItem("color")}"]`).classList.add("active");
}

lis.forEach((li) => {
    li.addEventListener("click", (e) => {
    console.log(e.currentTarget.dataset.color);
    // Remove Active Class From all Lis
    lis.forEach((li) => {
        li.classList.remove("active");
    });
    // Add Active Class To Current Element
    e.currentTarget.classList.add("active");
    // Add Current Color To Local Storage
    window.localStorage.setItem("color", e.currentTarget.dataset.color);
    location.reload();
    });
});







