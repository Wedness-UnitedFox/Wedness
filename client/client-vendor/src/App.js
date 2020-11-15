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
import AddNew from './pages/AddNew';
import DetailItem from './pages/DetailItem';

function App() {
  return (
    <Router>
      <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/vendor/login" component={Login} />
          <Route path="/vendor/register" component={Register} />
          <Route path="/vendor/venue/add" component={AddNew} />
          <Route path="/vendor/venue/:id" component={DetailItem} />
        </Switch>
    </Router>
  );
}


export default App;
