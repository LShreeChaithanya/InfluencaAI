import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ContentStudio from './pages/ContentStudio';
import AnalyticsCenter from './pages/AnalyticsCenter';
import BrandPartnerships from './pages/BrandPartnerships';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <div className="main-container">
            <Sidebar />
            <main>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/content-studio" component={ContentStudio} />
                <Route path="/analytics" component={AnalyticsCenter} />
                <Route path="/partnerships" component={BrandPartnerships} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
              </Switch>
            </main>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;