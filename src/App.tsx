import React from 'react';
import Partition from './components/Partition';
import Treemap from './components/Treemap';
import Tree from './components/Tree';
import LinkHorizontal from './components/shape/LinkHorizontal';
import './App.css';

function App() {
  return (
    <div className="App">
      <LinkHorizontal></LinkHorizontal>
      <br />
      <Tree></Tree>
      <br />
      <Partition></Partition>
      <Treemap></Treemap>
    </div>
  );
}

export default App;
