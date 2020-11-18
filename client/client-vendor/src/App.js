import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from './store/actions/action';

function App() {

  // const [isLogin, setLogin] = useState(false)
  const { isLogin } = useSelector(state => state)
  // const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.access_token && localStorage.currentUser) dispatch(setLogin())
  }, [])

  return (
    <Router>
      { isLogin ? <Navbar /> : ''}
      <Switch>
        {/* { isLogin ? 
            <> */}
        <Route exact path="/edit/:service_type/:id" component={EditItem} />
        <Route exact path="/vendor/:service_type/:id" component={DetailItem} />
        <Route exact path="/approve" component={Approval} />
        <Route path="/chat" component={ChatConversation} />
        <Route exact path="/add" component={AddNew} />
        {/* </>
            :
          <> */}
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/invitation/:uid" component={Invitation} />
        
        <Route path="/" component={Home} />

        {/* </>
          } */}
      </Switch>
    </Router>
  );
}


export default App;

const Invitation = () => {
  let { uid } = useParams()
  return <h1>This is invitation {uid}</h1>
}