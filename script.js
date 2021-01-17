var points = 0;
var points_per_second = 0;
var workers = {}

var shop_list = {
    "Pointer": ["Pointer", 10, 0.1],
}

for (const [key, value] of Object.entries(shop_list)) {
    workers[key] = 0;
}

console.log(workers);

function getPoints() {
    let points = display_tag.innerHTML.replace("Points: ", "");
    return points;
}

function getPps() {
    let pps_display_tag = document.getElementById("pps-display").replace("Points Per Second: ");
    return pps_display_tag;
}

function updatePoints() {
    let display_tag = document.getElementById("btn-num-display");

    display_tag.innerHTML = "Points: " + points;
}

function updatePps() {
    for (const [key, value] of Object.entries(workers)) {
        points_per_second = ((value * 10) * (shop_list[key][2] * 10)) / 100;  // To fix floating point errors, we multiply by x10 to transfer to Integers
        console.table([points_per_second, points]);
    }

    let pps_display_tag = document.getElementById("pps-display");
    pps_display_tag.innerHTML = "Points Per Second: " + points_per_second;
}

function buy(item) {
    let item_name = item[0];
    let item_price = item[1];

    if (points >= item_price) {
        points -= item_price;
        workers[item_name] += 1;
    }

    updatePoints();
    updatePps();
}

function manualClick() {
    let display_tag = document.getElementById("btn-num-display");
    let update_button = document.getElementById("btn-update");

    points++;
    updatePoints();

    console.log(points);
}