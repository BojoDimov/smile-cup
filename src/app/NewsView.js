import React from 'react';
import { get } from '../services/fetch';

export default class NewsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: null
    }
  }

  componentDidMount() {
    get(`/news/${this.props.match.params.id}`)
      .then(e => this.setState({ news: e }));
  }

  render() {
    return (
      <div class="wrapper">
        <div class="container" id="main">
          {this.state.news ?
            <React.Fragment>
              <article id="content">
                {/* <div style={{ display: 'flex', marginBottom: '1rem' }}> */}
                {/* <a href="#" class="image"><img style={{ maxHeight: '25rem', width: 'auto' }} src="../images/00731427.jpg" alt="" /></a> */}
                <header style={{ alignSelf: 'flex-end' }}>
                  <h2>{this.state.news.heading}</h2>
                </header>
                {this.state.news.body.split('\n\n').map(p => (
                  <p>{p.split('\n').map(l => <React.Fragment>{l}<br /></React.Fragment>)}</p>
                ))}
              </article>
              {this.state.news.subsections.map(sub => (
                <article id="content">
                  <header>
                    <h3>{sub.heading}</h3>
                  </header>
                  <p>{sub.body.split('\n').slice(0, -1).map(l => <React.Fragment>{l}<br /></React.Fragment>)}</p>
                </article>
              ))}
            </React.Fragment> : null}
        </div>
      </div>
    );
  }
}