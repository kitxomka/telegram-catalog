import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import NotFound from './components/NotFound';
import AddChannel from './components/AddChannel';

// todo: after channels list update, need to get new channels data - done
// todo: send only relevant data - done
// todo: If 24 hours have passed, the up button should be released
// todo: addChannelDetails - add loader before geting the res

const App = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/add-channel" element={<AddChannel />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;




