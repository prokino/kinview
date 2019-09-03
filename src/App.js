import React from 'react';
import './App.css';
import MuiTreeView from 'material-ui-treeview';

const tree = [
  {
    value: 'Parent A',
    nodes: [{ value: 'Child A' }, { value: 'Child B' }],
  },
  {
    value: 'Parent B',
    nodes: [
      {
        value: 'Child C',
      },
      {
        value: 'Parent C',
        nodes: [
          { value: 'Child D' },
          { value: 'Child E' },
          { value: 'Child F' },
        ],
      },
    ],
  },
];

function App() {
  return (<MuiTreeView tree={tree} onLeafClick={node => alert(`${node} clicked`)} />);
}

export default App;
