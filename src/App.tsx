import './App.css';
import { Route, Switch } from 'react-router-dom';
import { RockScissorPaperContainer } from './containers/RockScissorPaperContainer/RockScissorPaperContainer';
import { ModesContainer } from './containers/ModesContainer/ModesContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/play" component={ModesContainer} />
          <Route path="/" component={RockScissorPaperContainer} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
