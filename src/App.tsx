import './App.scss'
import React from 'react';
import { JokeProvider } from './components/JokeContext';
import JokeFetcher from './components/JokeFetcher';

const App: React.FC = () => {
  return (
    <JokeProvider>
      <div className="App">
        <h1>Random Joke Fetcher</h1>
        <JokeFetcher />
      </div>
    </JokeProvider>
  );
};

export default App;
