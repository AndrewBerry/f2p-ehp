import { HashRouter, Switch, Route } from "react-router-dom";

import { PlayersListView } from "./views/PlayersListView/PlayersListView";
import { RoutedPlayerView } from "./views/PlayerView/PlayerView";
import { NotFoundView } from "./views/NotFoundView/NotFoundView";

export function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={PlayersListView} />
        <Route exact path="/player/:ign" component={RoutedPlayerView} />

        <Route component={NotFoundView} />
      </Switch>
    </HashRouter>
  );
}
