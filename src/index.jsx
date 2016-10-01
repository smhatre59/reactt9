import {render} from 'react-dom';
import React from 'react';

import T9 from "./t9.jsx"
class Main extends React.Component {
  render () {
    return (
      <div>
        <T9 />
      </div>
    )
  }
}

render(<Main/>, document.getElementById('app'));
