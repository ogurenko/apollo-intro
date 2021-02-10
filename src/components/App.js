import { Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo";
import Home from "../routes/Home";
import Detail from "../routes/Detail";
// import Suggestions from "../routes/Suggestions";


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:id" component={Detail} />
//           <Route path="/suggestions/:id" component={Suggestions} />
        </Switch>
      </div>
    </ApolloProvider>
  );
}

export default App;
