function home_menu_add_item(item) {
    var title = document.createElement("span");
    title.innerHTML = item.title;
    title.classList.add("head");
    title.classList.add("uk-text-bold");

    var logo = document.createElement("img");
    logo.src = item.logo;

    var div = document.createElement("div")
    div.appendChild(logo);
    div.appendChild(title);
    div.setAttribute("id", item.id);
    div.classList.add("rcbutton");

    var anchor = document.createElement("a");
    anchor.href = item.page;
    anchor.appendChild(div);

    var m_item = document.createElement("div")
    m_item.appendChild(anchor);
    document.getElementById("home_menu").appendChild(m_item);
}

function home_menu_init() {
    $.ajax({
        url: '/assets-be/home_menu.json',
        dataType: 'json',
        success: function (items) {
            for (var item of items["items"]) {
                home_menu_add_item(item);
            }
        },
    });
}

function hotel_info_init() {
    $.ajax({
        url: '/assets-be/hotel.json',
        dataType: 'json',
        success: function (hotel) {
            var logo = document.createElement("img");
            logo.src = hotel.logo;
            document.getElementById("hotel_logo").appendChild(logo);

            var home_page = document.getElementById("home_page");
            home_page.style.backgroundImage = "url(" + hotel.cover_image + ")";
        }
    });
}