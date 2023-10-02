import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AddView from './views/AddView';
import ListView from './views/ListView';
import UpdateView from './views/UpdateView';

function App() {
  return <BrowserRouter>
            <Switch>
              <Route exact path="/" component={ListView} />
              <Route path="/add" component={AddView}/>
              <Route exact path="/update/:id" component={UpdateView} />
            </Switch>
        </BrowserRouter>;
}

export default App;
