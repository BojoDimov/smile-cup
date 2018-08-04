import React from 'react';
import { Link } from 'react-router-dom';
import { get, imgUrl } from '../services/fetch';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    }
  }

  componentDidMount() {
    get('/news/featured')
      .then(e => this.setState({ news: e }));
  }

  render() {
    return (
      <div class="wrapper">
        <div class="container">
          <div class="row">
            {this.state.news.map(e => (
              <section class="col-6 col-12-narrower feature">
                <div class="image-wrapper first">
                  <Link to={`/news/${e.id}`} class="image featured first">
                    {e.fileId ? <img style={{ maxHeight: '25rem', width: 'auto', margin: 'auto' }} src={imgUrl(e.fileId)} alt="" /> : null}
                  </Link>
                </div>
                <header>
                  <h2>{e.heading}</h2>
                </header>
                <p>{e.subject}</p>
                <ul class="actions">
                  <li><Link to={`/news/${e.id}`} class="button">Преглед</Link></li>
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    );
  }
}