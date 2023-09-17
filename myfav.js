// this is the api , base url and image url
const APIKEY = 'api_key=96c05c6f53c2f9b20b3e42af4887dc76';
const BASEURL = 'https://api.themoviedb.org/3';
const IMAGEURL = 'https://image.tmdb.org/t/p/w500';

// getting the fav movies stored in the local storage 
var storageData = localStorage.getItem('MovieArray');
var favMovieArray = JSON.parse(storageData);

// looping over the fav movie array 
favMovieArray.forEach(async id =>{
    let link = `/movie/${id}?language=en-US&`;
    let url = BASEURL+link+APIKEY;
    await apiCall(url, id);
});

// calling function to request api 
function apiCall(url, id){
    const x = new XMLHttpRequest();
    x.open('get',url);
    x.send();
    x.onload = function(){
        var resp = x.response;
        var movie = JSON.parse(resp);
        favMovieData(movie, id);
    }
}

// displaying the fav movies here 
function favMovieData(movie, id){
    var eachListItem = document.createElement('div');
    eachListItem.classList.add('list-item');
    
    eachListItem.innerHTML = `
    <div class="movie-poster">
            <a href="moviePage.html?id=${movie.id}"><img src= ${IMAGEURL+movie.poster_path} alt="Movie Poster"></a>
        </div>
        <div class="movie-title">${movie.title}</div>
        <div class="movie-element-tags">
            <div class="movie-rating">
            <i class="fas fa-star"></i> ${movie.vote_average} 
            </div>
            <div class="remove-movie" id='${id}' onclick="deleteMovie(${id})">
                <i id="removeicon" class="fa fa-minus-circle"></i>
            </div>
        </div>
    `
    document.getElementById('list-container').appendChild(eachListItem);
}

// removing all the movies from the fav list 
// clearing the local storage.
document.getElementById('clear-whole-list').addEventListener('click', function(){
    localStorage.clear();
    window.location.reload();
});

// deleting single movie from fav array 
async function deleteMovie(id){
    var temp = await JSON.parse(localStorage.getItem('MovieArray'));
    var i = await temp.indexOf(id.toString());
    await temp.splice(i, 1);
    await localStorage.setItem('MovieArray', JSON.stringify(temp));
    await window.location.reload();    
}
