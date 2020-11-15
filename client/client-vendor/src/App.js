import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar'
import Login from './pages/Login';
import Register from './pages/Register';
import ChatConversation from './pages/ChatConversation';

function App() {
  return (
    <Router>
      <Navbar />
        <Switch>
          <Route path="/chat" component={ChatConversation} />
          <Route path="/" component={Home} />
          <Route exact path="/vendor/login" component={Login} />
          <Route exact path="/vendor/register" component={Register} />
        </Switch>
    </Router>
  );
}


export default App;
