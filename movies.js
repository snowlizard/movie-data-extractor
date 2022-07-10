const titles = require('./titles');
const fs = require('fs');

// First line of CSV file indicating Standards
let movieData = 'Title,Year,Rated,Released,Actors,Director(s),Plot,Metascore,Poster,Genre\n';

let fData = [];

titles.forEach(title => fData.push(
    fetch(`https://www.omdbapi.com/?t=${title}&apikey=5edc894&plot=full`)
));

Promise.all(fData)
    .then( response => Promise.all(response.map(r => r.json())) )
    .then( d => {
        d.forEach( m => movieData += `"${m.Title}",${m.Year},${m.Rated},${m.Released},"${m.Actors}","${m.Director}","${m.Plot}",${m.Metascore},"${m.Poster}","${m.Genre}"\n`);
        
        fs.writeFile('data.csv', movieData, "utf-8", (error) => {
            if(error) console.log(error);
            else console.log('data saved');
        });
    });
