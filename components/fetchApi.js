import React from 'react';

const [data, setData] = useState([]);

useEffect(() => {
    fetchMovies();
}, []);

function fetchMovies() {
    fetch(
        //API_KEY
        //' '
    )
        .then((response) => response.json())
        .then((data) => setData(data.results));
}