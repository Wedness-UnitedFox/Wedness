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
import Approval from './pages/Approval'

function App() {
  return (
    <Router>
      { localStorage.access_token ? <Navbar /> : ''}
        <Switch>
          {/* { localStorage.access_token ? 
            <> */}
            <Route exact path="/edit/:service_type/:id" component={EditItem} />
            <Route exact path="/vendor/:service_type/:id" component={DetailItem} />
            <Route exact path="/approve" component={Approval} />
            <Route path="/chat" component={ChatConversation} />
            <Route exact path="/add" component={AddNew} />
            <Route exact path="/home" component={Home} />
            {/* </>
            :
            <> */}
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            {/* </>
          } */}
        </Switch>
    </Router>
  );
}


export default App;
