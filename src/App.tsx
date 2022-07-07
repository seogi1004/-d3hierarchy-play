import React from 'react';
import Partition from './components/Partition';
import Treemap from './components/Treemap';
import Tree from './components/Tree';
import './App.css';

function App() {
  return (
    <div className="App">
      <Partition></Partition>
      <Treemap></Treemap>
      <Tree></Tree>
    </div>
  );
}

export default App;
