import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => 
      tour.id !== id
    );
    setTours(newTours);
  }
  const fetchTours = () => {
    fetch(url)
    .then((response) => {
      if(response.status >= 200 && response.status < 300){
        setIsLoading(false);
        return response.json();
      }
      setIsError(true);
      throw new Error(response.statusText);
    })
    .then((tours) => {
      setTours(tours);
    })
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchTours();
  }, []);

  if(isLoading){
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  if(isError){
    return (
      <div>
        <h1>Error...</h1>
      </div>
    )
  }

  if(!tours.length){
    return (
      <main>
        <article>
          <h2>No tours Left</h2>
          <button className='btn' onClick={() => fetchTours()}>Refresh</button>
        </article>
      </main>
    )
  }

  return (
    <main>
      <Tours tours = {tours} removeTour={removeTour}></Tours>
    </main>
  )
}

export default App
