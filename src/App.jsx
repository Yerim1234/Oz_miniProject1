// src/App.jsx
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route path="/details/:id" component={MovieDetail} />
        <Route path="/" component={MovieCard} />
      </Switch>
    </div>
  );
};

export default App;
