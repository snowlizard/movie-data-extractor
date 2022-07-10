const titles = require('./titles');
const fs = require('fs');

let movieData = 'Title,Year,Rated,Released,Actors,Director(s),Plot,Metascore,Poster,Genre\n';

fetch(`https://www.omdbapi.com/?t=${titles[1]}&apikey=5edc894&plot=full`)
    .then(response => response.json())
    .then( d => {
        movieData += `${d.Title},${d.Year},${d.Rated},${d.Released},"${d.Actors}","${d.Director}","${d.Plot}",${d.Metascore},"${d.Poster}","${d.Genre}"\n`;

        fs.writeFile('data.csv', movieData, "utf-8", (error) => {
            if(error) console.log(error);
            else console.log('data saved');
        });
    });