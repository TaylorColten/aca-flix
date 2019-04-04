export function loadMyMovieList() {
    return function (dispatch) {
      dispatch({
        type: "LOAD_MY_MOVIE_LIST"
      });
      fetch("/movies")
        .then((response) => {
          return response.json();
        }).then((movies) => {
          dispatch(myMovieListLoaded(movies));
        });
    };
  }
  
  export function myMovieListLoaded(movies) {
    return {
      type: "MY_MOVIE_LIST_LOADED",
      value: movies
    };
  }
  

  export function loadSearch(searchTerm) {
    return function (dispatch) {
      dispatch({
        type: "LOAD_SEARCH"
      });
      fetch('https://api.themoviedb.org/3/movie/550?api_key=06a606498ee019f416a4f2a91d601268')
      .then((response) => {
        return response.json();
      }).then((movies) => {
        dispatch(searchLoaded(movies));
      });
    };
  }
    
  export function searchLoaded(movies) {
    return {
      type: "SEARCH_RESULTS_LOADED",
      value: movies.results
    };
  }
  
  
  
  
  export function saveMyMovie(movie) {
    return function (dispatch) {
      fetch("/movies", {
        method: "post", 
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (res) {
        return res.json();
      }).then(function (movies) {
        dispatch(loadMyMovieList(movies));
      });
    };
  }
  

  export function removeMyMovie(_id) {
    return function (dispatch) {
      fetch(`./movies/${_id}`,
      {method: "DELETE"},
    ).then(() => dispatch(loadMyMovieList()));
      
    };
  }