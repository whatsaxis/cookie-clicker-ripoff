var points = 5000;  // TODO Change
var points_per_second = 0;
var points_per_manual_click = 1;

var workers = {}

var shop_list = {
    "Pointer": ["Pointer", 25, 1],
    "Group of Pointers": ["Group of Pointers", 100, 5],
    "Autoclicker": ["Autoclicker", 250, 15],
}

var upgrades_list = {
    "Stronger Fingers": ["Stronger Fingers", "1", false, 150, 3],
    "Iron Fingers": ["Iron Fingers", "2", false, 450, 5],
    "Steel Fist": ["Steel Fist", "3", false, 1000, 10],
}

for (const [key, value] of Object.entries(shop_list)) {
    workers[key] = 0;
}

function updatePoints() {
    let display_tag = document.getElementById("btn-num-display");

    display_tag.innerHTML = "Points: " + points;
}

function updatePps() {
    for (const [key, value] of Object.entries(workers)) {
        points_per_second = value * shop_list[key][2];
        console.table([points_per_second, points]);
    }

    let pps_display_tag = document.getElementById("pps-display");
    pps_display_tag.innerHTML = "Points Per Second: " + points_per_second;
}

function buy_worker(item) {
    let item_name = item[0];
    let item_price = item[1];

    if (points >= item_price) {
        points -= item_price;
        workers[item_name] += 1;
    }

    updatePoints();
    updatePps();
}

function buy_upgrade(item) {
    let item_name = item[0];
    let item_price = item[3];

    if (points >= item_price && upgrades_list[item_name][2] == false) {
        points -= item_price;
        upgrades_list[item_name][2] = true;
        points_per_manual_click = upgrades_list[item_name][4];

        let button_element = document.getElementById(upgrades_list[item_name][1]);
        button_element.innerHTML = "Already Bought!";

        for (const x of Object.keys(upgrades_list)) {   
            upgrades_list[x][2] = true;
            let button_element = document.getElementById(upgrades_list[x][1]);
            button_element.innerHTML = "Already Bought!";
        }

        console.log(upgrades_list[item_name][2]);
    }
}

function manualClick() {
    let display_tag = document.getElementById("btn-num-display");
    let update_button = document.getElementById("btn-update");

    points += points_per_manual_click;
    updatePoints();

    console.log(points);
}