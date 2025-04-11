let data = [
    {
        "movieName": "The Shawshank Redemption",
        "actors": ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
        "rating": 4.8,
        "bestScenes": [
            {
                "title": "Andy Dufresne escapes from prison",
                "duration": "15 mins"
            },
            {
                "title": "Brooks was here",
                "duration": "10 mins"
            }
        ]
    },
    {
        "movieName": "The Godfather",
        "actors": ["Marlon Brando", "Al Pacino", "James Caan"],
        "rating": 4.9,
        "bestScenes": [
            {
                "title": "Horse head in bed",
                "duration": "5 mins"
            },
            {
                "title": "Cannoli scene",
                "duration": "3 mins"
            }
        ]
    },
    {
        "movieName": "The Dark Knight",
        "actors": ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        "rating": 4.8,
        "bestScenes": [
            {
                "title": "Opening bank robbery",
                "duration": "12 mins"
            },
            {
                "title": "Why So Serious interrogation",
                "duration": "8 mins"
            }
        ]
    },
    {
        "movieName": "The Lord of the Rings: The Return of the King",
        "actors": ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
        "rating": 4.9,
        "bestScenes": [
            {
                "title": "Ride of the Rohirrim",
                "duration": "10 mins"
            },
            {
                "title": "Frodo destroys the One Ring",
                "duration": "7 mins"
            }
        ]
    }
];

function getLongestScenes(movies) {
    return movies.map(movie => {
        let maxDuration = 0;

        movie.bestScenes.forEach(scene => {
            const minutes = parseInt(scene.duration);
            if (minutes > maxDuration) {
                maxDuration = minutes;
            }
        });

        return {
            movieName: movie.movieName,
            longestSceneDuration: maxDuration
        };
    });
}

console.log(" Longest Scene Durations:");
console.log(getLongestScenes(data));

function getAverageRating(movies) {
    const total = movies.reduce((sum, movie) => sum + movie.rating, 0);
    const avg = total / movies.length;
    return avg.toFixed(2);
}

console.log("\n Average Movie Rating:");
console.log(getAverageRating(data));

function sortMovies(movies) {
    return [...movies].sort((a, b) => {
        if (b.rating !== a.rating) {
            return b.rating - a.rating;
        } else {
            return a.movieName.localeCompare(b.movieName);
        }
    });
}

console.log("\n Sorted Movie List:");
console.log(sortMovies(data));
