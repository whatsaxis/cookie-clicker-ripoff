var points = 0;  // Some variable declerations..
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

function updatePoints() {  // Function to update the point counter
    let display_tag = document.getElementById("btn-num-display");

    display_tag.innerHTML = "Points: " + points;
}

function updatePps() {  // Function to update the PPS counter
    points_per_second = 0;
    for (const [key, value] of Object.entries(workers)) {
        points_per_second += value * shop_list[key][2];
    }

    let pps_display_tag = document.getElementById("pps-display");
    pps_display_tag.innerHTML = "Points Per Second: " + points_per_second;
}

function upscalePrice(price) {  // Function to upscale n (with no decimals, because we know what happened there)
    return Math.ceil(price * 1.1);
}

function updateWorkerPrices() {  // Function to update the prices of the store
    let worker_children = document.getElementById("workers").children;

    for (const x of worker_children) {
        if (x.tagName === "P") {
            let text = x.innerHTML;
            let splt = text.split(": ");
            splt[0] = splt[0].split(" - ");
            splt[1] = `${shop_list[splt[0][0]][1]} points`;
            splt[0] = splt[0].join(" - ");
            splt = splt.join(": ");
            x.innerHTML = splt;
        }
    }
}

updateWorkerPrices()  // Function call so that the numbers appear on the store when the page is first loaded

function buy_worker(item) {  // Function that allows the user to purchase workers
    let item_name = item[0];
    let item_price = item[1];

    console.log(`Worker with name ${item_name} and price ${item_price} points purchased!`)

    if (points >= item_price) {
        points -= item_price;
        workers[item_name] += 1;

        item[1] = upscalePrice(item[1]);
        updateWorkerPrices();
    }

    updatePoints();
    updatePps();
}

function buy_upgrade(item) {  // Function that allows upgrades to be bought
    let item_name = item[0];
    let item_price = item[3];

    if (points >= item_price && upgrades_list[item_name][2] == false) {
        points -= item_price;
        upgrades_list[item_name][2] = true;
        points_per_manual_click = upgrades_list[item_name][4];

        let button_element = document.getElementById(upgrades_list[item_name][1]);
        button_element.innerHTML = "Already Bought!";

        let dict_keys = Object.keys(upgrades_list);

        for (const x of dict_keys.slice(0, dict_keys.indexOf(item_name))) {   
            upgrades_list[x][2] = true;
            let button_element = document.getElementById(upgrades_list[x][1]);
            button_element.innerHTML = "Already Bought!";
        }
    }
}

function manualClick() {  // Function that updates the point counter when clicked. Manually.
    points += points_per_manual_click;
    updatePoints();
}
