function inner_menu_add_parm(parm) {
    var title = document.createElement("span");
    title.innerHTML = parm.title;
    title.classList.add("uk-text-bold");
    title.classList.add("list")

    var subtitle = document.createElement("p");
    subtitle.classList.add("sub-list")
    subtitle.innerHTML = parm.subtitle;


    var logo = document.createElement("img");
    logo.classList.add("icon")
    logo.src = parm.logo;


    var div = document.createElement("div")
    div.appendChild(logo);
    div.appendChild(title);
    div.appendChild(subtitle);
    div.setAttribute("id", parm.id);
    div.classList.add("text")

    div.classList.add("rcbutton");

    document.getElementById("inner_menu").appendChild(div);

}

function inner_menu_init() {
    $.ajax({
        url: '../assets-be/inner_services.json',
        dataType: 'json',
        success: function (data) {
            for (var parm of data["data"]) {
                inner_menu_add_parm(parm);
            }
        },
    });
}
