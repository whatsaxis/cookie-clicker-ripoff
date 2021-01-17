function updatePointsFromPps() {
    if (points_per_second !== 0) {
        // points += points_per_second.toPrecision(2);
        console.log(points_per_second);
        points = ((points * 10) + (points_per_second * 10)) / 100;  // Again, to fix floating point errors, we multiply by x10 to transfer to Integers
    }

    updatePoints();
}

setInterval(updatePointsFromPps, 1000);