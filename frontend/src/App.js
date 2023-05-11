import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/SpotList";
import SpotDetail from "./components/SpotDetail";
import NewSpotForm from "./components/NewSpotForm";
import ManageSpots from "./components/ManageSpots";
import UpdateSpotForm from "./components/UpdateSpotForm";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded
      &&
      <Switch>
        <Route exact path="/spots/current" component={ManageSpots} />
        <Route exact path="/spots/new" component={NewSpotForm} />
        <Route path="/spots/:spotId/edit" component={UpdateSpotForm} />
        <Route path="/spots/:spotId" component={SpotDetail} />
        <Route exact path="/" component={SpotList} />
      </Switch>}
    </>
  );
}

export default App;
