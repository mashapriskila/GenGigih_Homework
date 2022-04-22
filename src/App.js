import './App.css';
import CreatePlaylist from './pages/createPlaylist';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './pages/authentication';
import GuardRoute from './components/Guard/GuardRoute';
import NotFound from './pages/Error_notfound';

function App() {
  return (
    <Router>
      <Switch>
        <GuardRoute path="/create-playlist" type="private" exact>
          <CreatePlaylist />
        </GuardRoute>
        <GuardRoute path="/" type="guest" exact>
          <Auth />
        </GuardRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
