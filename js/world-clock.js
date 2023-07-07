// https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

// Asia/Jerusalem
// Asia/Istanbul
// Asia/Kolkata
// Asia/Taipei
// Asia/Tokyo
// Australia/Melbourne
// America/Mexico_City

function inner_menu_add_parm(parm) {
    var name = document.createElement("div");
    name.innerHTML = parm.name;
    name.classList.add("uk-text-bold");

    var date = document.createElement("div");
    date.classList.add("date");

    var time = document.createElement("div");
    time.classList.add("time", "uk-text-large");

    var zone = document.createElement("div");
    zone.classList.add("zone");
    zone.setAttribute("time-zone", parm.timezone);
    zone.appendChild(date);
    zone.appendChild(time);

    var img = document.createElement("img");
    img.src = parm.logo;
    img.classList.add("uk-width-4-5");
    
    var g_item = document.createElement("div")
    g_item.setAttribute("id", parm.id);
    g_item.classList.add("uk-card","uk-card-default", "uk-card-body", "uk-padding-small", "uk-flex-center", "uk-border-circle", "uk-box-shadow-large");
    g_item.appendChild(img);
    g_item.appendChild(name);
    g_item.appendChild(zone);

    var l_item = document.createElement("div")
    l_item.classList.add("uk-width-1-5");
    l_item.appendChild(g_item);

    document.getElementById("city_list").appendChild(l_item);
}

function world_clock_list_init() {
    $.ajax({
        url: '/assets-be/world-clock.json',
        dataType: 'json',
        success: function (data) {
            for (var parm of data["data"]) {
                inner_menu_add_parm(parm);
            }
        },
    });
}

function getTimeByZone(timeZone) {
    let now = new Date(Date.now());
    optionDate = { timeZone, weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'};
    optionTime = { timeZone, hour12: true, hour: '2-digit', minute: '2-digit' };
    let date = now.toLocaleDateString('en-US', optionDate);
    let time = now.toLocaleTimeString('en-US', optionTime);
    return { date, time }
}

function updateTime() {
    let zones = document.querySelectorAll('.zone');
    zones.forEach(zone => {
        let time_zone = zone.getAttribute('time-zone')
        let localTime = getTimeByZone(time_zone)
        zone.querySelector('.date').innerText = localTime.date
        zone.querySelector('.time').innerText = localTime.time
    })
}

setInterval(updateTime, 1000);