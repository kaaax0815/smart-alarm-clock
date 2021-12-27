import './index.css';

import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { socket, SocketContext } from './contexts/Socket';
import FaceRouter from './Face/Router';
import Start from './Start';

function App(): JSX.Element {
  return (
    <HashRouter basename="/">
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/face" element={<FaceRouter run={'face'} />} />
          <Route path="/face/settings" element={<FaceRouter run={'settings'} />} />
        </Routes>
      </SocketContext.Provider>
    </HashRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
