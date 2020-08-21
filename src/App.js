import React from "react";

import "./styles.css";
import {useState, useEffect} from 'react';
import api from './services/api';
import { wait } from "@testing-library/react";

function App() {

  const [repositories, setrepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {setrepositories(response.data);})}, []);

  async function handleAddRepository() {
    const newRepositories = await api.post('repositories',{
    title:'AlexAlvesDias',
    url: 'http://github.com/AlexAlvesDias',
    techs: 'Reactjs',} );

    setrepositories([...repositories, newRepositories.data ])
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`);

    setrepositories(repositories.filter(newRepositories => newRepositories.id !== id));

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(newRepositories => 
        <li key={newRepositories.id}>
          <ul>
        <li> <a href={ newRepositories.url } target="_blank">{newRepositories.title}</a> </li>
            <li> Likes: {newRepositories.likes} </li>
          </ul>

          <button onClick={() => handleRemoveRepository(newRepositories.id)}>
            Remover 
          </button>
        </li>  )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

