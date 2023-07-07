function inner_menu_add_parm(parm) {
    var title = document.createElement("div");
    title.innerHTML = parm.title;
    title.classList.add("uk-text-left", "uk-text-bold");
    title.classList.add("df-text-color-black");

    var subtitle = document.createElement("div");
    subtitle.classList.add("uk-text-left");
    subtitle.classList.add("df-text-color-black");
    subtitle.innerHTML = parm.subtitle;

    var label = document.createElement("div");
    label.classList.add("uk-width-expand");
    label.classList.add("uk-padding-small");
    label.appendChild(title);
    label.appendChild(subtitle);

    var img = document.createElement("img");
    img.classList.add("icon");
    img.src = parm.logo;

    var logo = document.createElement("div");
    logo.classList.add("uk-width-auto");
    logo.classList.add("uk-padding-small");
    logo.appendChild(img);


    var div = document.createElement("div")
    div.setAttribute("id", parm.id);
    div.classList.add("rcbutton");
    div.classList.add("uk-card-default", "uk-flex-middle", "uk-text-middle", "uk-grid-match");
    div.setAttribute("uk-grid","");
    div.appendChild(logo);
    div.appendChild(label);
    
    var anchor = document.createElement("a");
    anchor.href = parm.page;
    anchor.appendChild(div);

    var m_item = document.createElement("div")
    m_item.appendChild(anchor);
    m_item.classList.add("uk-card-default", "uk-margin-small");

    document.getElementById("inner_menu").appendChild(m_item);
}

function services_menu_init() {
    $.ajax({
        url: '/assets-be/inner_services.json',
        dataType: 'json',
        success: function (data) {
            for (var parm of data["data"]) {
                inner_menu_add_parm(parm);
            }
        },
    });
}
