import './index.css';

import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { socket, SocketContext } from './contexts/Socket';
import FaceRouter from './Face/Router';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path="/face" element={<FaceRouter run={'face'} />} />
          <Route path="/face/settings" element={<FaceRouter run={'settings'} />} />
        </Routes>
      </SocketContext.Provider>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
