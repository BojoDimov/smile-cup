import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { RedirectAction } from '../components';
import * as UserService from '../services/user';

import Queries from '../services/queries';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: UserService.getUser(),
      editions: []
    }
  }

  componentDidMount() {
    const e = new CustomEvent('react-load', null);

    document.addEventListener('login', ({ detail }) => {
      this.setState({ user: detail.user });
    });
    document.addEventListener('logout', () => this.setState({ user: null }));

    Queries.Editions.get()
      .then(editions => {
        this.setState({ editions: editions });
        document.dispatchEvent(new CustomEvent('react-load'));
      });
  }

  getEditionLink(edition, i) {
    return (
      <li key={i}>
        <Link to={`/editions/${edition.id}`}>{edition.name}</Link>
        {edition.schemes.length > 0 ?
          <ul>
            {edition.schemes.map((s, j) => {
              return (
                <li key={j}><Link to={`/schemes/${s.id}`}>{s.name}</Link></li>
              );
            })}
          </ul> : null}
      </li>
    );
  }

  render() {
    return (
      <div id="header-wrapper">
        <div id="header" className="container">
          <h1 id="logo"><Link to="/home">Smile Cup</Link></h1>
          <nav id="nav">
            <ul>
              <li><Link to="/news">Новини</Link></li>
              <li>
                <Link to="/editions">Турнири</Link>
                <ul>
                  {this.state.editions.map(this.getEditionLink)}
                </ul>
              </li>
              <li className={this.state.user ? "" : "break"}><Link to="/ranking">Ранглиста</Link></li>
              <li className={this.state.user ? "break" : ""}><Link to="/partners">Партньори</Link></li>
              <li></li>
              {this.state.user ? <li>
                <Link to={`/users/${this.state.user.id}`}><i className="fas fa-user"></i> <span>{this.state.user.name}</span></Link>
                <ul>
                  <li><Link to={`/users/${this.state.user.id}`}>Профил</Link></li>
                  <li><Link to="/logout">Изход</Link></li>
                </ul>
              </li> : null}
            </ul>
          </nav>
        </div>

        <Switch>
          <Route path="/home" render={() => <HeroComponent isLogged={this.state.user} />} />
        </Switch>
      </div>
    );
  }
}

export class HeroComponent extends React.Component {
  render() {
    return (
      <section id="hero" className="container" style={{ marginTop: '2rem' }}>
        <header>
          <h2>Албена 2018</h2>
        </header>
        <p>Плажът няма да е единственото горещо място</p>
        {!this.props.isLogged ? <ul className="actions">
          <li><Link to="/login" className="button">Включи се!</Link></li>
        </ul> : null}
      </section>
    );
  }
}