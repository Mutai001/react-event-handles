// src/JokeFetcher.tsx

import React, { useContext, useState } from 'react';
import { JokeContext } from './JokeContext';
import { Joke } from './JokeReducer';

const JokeFetcher = () => {
  const context = useContext(JokeContext);

  if (!context) {
    throw new Error('JokeFetcher must be used within a JokeProvider');
  }

  const { state, dispatch } = context;
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(1);

  const fetchJoke = async () => {
    dispatch({ type: 'FETCH_JOKE_REQUEST' });
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const data = await response.json();
      const joke: Joke = {
        id: data.id,
        description: `${data.setup} - ${data.punchline}`,
        rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
      };
      dispatch({ type: 'FETCH_JOKE_SUCCESS', payload: joke });
    } catch (error: any) {
      dispatch({ type: 'FETCH_JOKE_FAILURE', payload: error.message });
    }
  };

  const addUserJoke = (e: React.FormEvent) => {
    e.preventDefault();
    const newJoke: Joke = {
      id: Date.now(), // Unique ID based on timestamp
      description,
      rating,
    };
    dispatch({ type: 'ADD_USER_JOKE', payload: newJoke });
    setDescription('');
    setRating(1);
  };

  const increaseRating = (id: number) => {
    dispatch({ type: 'INCREASE_RATING', payload: id });
  };

  const decreaseRating = (id: number) => {
    dispatch({ type: 'DECREASE_RATING', payload: id });
  };

  return (
    <div>
      <button onClick={fetchJoke}>Fetch a Joke</button>
      {state.loading && <p className="loading">Loading...</p>}
      {state.error && <p className="error">Error: {state.error}</p>}
      <ul>
        {state.jokes.map((joke) => (
          <li key={joke.id}>
            <p>{joke.description}</p>
            <p>
              <em>Rating: {joke.rating}/5</em>
              <button onClick={() => increaseRating(joke.id)}>👍</button>
              <button onClick={() => decreaseRating(joke.id)}>👎</button>
            </p>
          </li>
        ))}
      </ul>
      <form onSubmit={addUserJoke}>
        <h2>Add Your Own Joke</h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter your joke here"
          required
        />
        <br />
        <label>
          Rating:
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Add Joke</button>
      </form>
    </div>
  );
};

export default JokeFetcher;
