import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import AddView from './views/AddView';
import ListView from './views/ListView';
import UpdateView from './views/UpdateView';

function App() {
  return <BrowserRouter>
          <Navbar />
            <Switch>
              <Route exact path="/" component={ListView} />
              <Route path="/add" component={AddView}/>
              <Route exact path="/update/:id" component={UpdateView} />
            </Switch>
        </BrowserRouter>;
}

export default App;