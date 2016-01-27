var S7App = React.createClass({
  render: function() {
    return (
      <div>
      <nav class="navbar navbar-default">
      <div class="container-fluid">
        /* Brand and toggle get grouped for better mobile display */
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed"
            data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false">
            <span class="sr-only">Toggle navigation</span> <span
              class="icon-bar"></span> <span class="icon-bar"></span> <span
              class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Savet7</a>
        </div>

        /* Collect the nav links, forms, and other content for toggling */
        <div class="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1" ng-controller="userCtrl">
          <ul class="nav navbar-nav navbar-right">
            <li ng-if="!loggedIn"><a href="" ng-click="login()"
              id="loginLink">Login</a></li>
            <li ng-if="loggedIn"><a href="" ng-click="logout()"
              id="logoutLink">Logout</a></li>


          <p class="navbar-text navbar-right" ng-if="loggedIn">
            Logged in as <b id="usernameInNav">username</b>
          </p>
          <ul class="nav navbar-nav navbar-right" ng-controller="langCtrl">
            
            <li class="dropdown"><a class="dropdown-toggle"
              data-toggle="dropdown" role="button" aria-haspopup="true"
              aria-expanded="false" id="langSelectLink">English<span class="caret"></span>
            </a>
              <ul class="dropdown-menu">
                <li ng-class="{active : langData.langCd == 'en'}"><a
                  ng-click="useLang('en')">English</a></li>
                <li ng-class="{active : langData.langCd == 'rs'}"><a
                  ng-click="useLang('rs')">Serbian</a></li>
              </ul></li>
          </ul>
				</ul>
        </div>
      </div>
    </nav>


    <div class="container" ng-view></div>
    </div>
    );
  }
});


ReactDOM.render(
    <S7App />,
    document.getElementById('s7Container')
  );


