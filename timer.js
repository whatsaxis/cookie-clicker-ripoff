function updatePointsFromPps() {  // Function that periodically updates the point counter from the workers
    if (points_per_second !== 0) {
        console.log(points_per_second);
        points += points_per_second;
    }

    updatePoints();
}

setInterval(updatePointsFromPps, 1000);
