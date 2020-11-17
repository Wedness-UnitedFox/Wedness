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
import AddNew from './pages/AddNew';
import DetailItem from './pages/DetailItem';
import EditItem from './pages/EditItem';

function App() {
  return (
    <Router>
      { localStorage.access_token ? <Navbar /> : ''}
        <Switch>
          { localStorage.access_token ? 
            <>
            <Route path="/edit/:service_type/:id" component={EditItem} />
            <Route path="/vendor/:service_type/:id" component={DetailItem} />
            <Route path="/register" component={Register} />
            <Route path="/chat" component={ChatConversation} />
            <Route path="/add" component={AddNew} />
            <Route path="/" component={Home} />
            </>
            :
            <Route path="/" component={Login} />
          }
        </Switch>
    </Router>
  );
}


export default App;
