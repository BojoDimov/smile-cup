import React from 'react'
import { Link } from 'react-router-dom';

import { get, imgUrl } from '../services/fetch';
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../clientConfig.js')[env];

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    }
  }

  componentDidMount() {
    console.log('baba');
    get(`/gallery?tournamentId=${config.tournamentId}`)
      .then(e => this.setState({ images: e }));
  }

  render() {
    const { images } = this.state;

    return (
      <div class="wrapper">
        <section class="container">
          <header class="major">
            <h2>Галерия</h2>
          </header>

          {images
            .map((_, i) => i % 3 == 0 ? images.slice(i, i + 3) : [])
            .filter(e => e.length)
            .map(arr => (
              <div className="row features">
                {arr.map((n, i) => (
                  <section className="col-4 col-12-narrower feature">
                    <div className={"image-wrapper" + (i == 0 ? " first" : "")}>
                      <span className="image featured" >
                        <img style={{ maxHeight: '12rem', width: 'auto', margin: 'auto' }} src={imgUrl(n.imageId)} />
                      </span>
                    </div>
                  </section>
                ))}
              </div>
            ))}
        </section>
      </div>
    );
  }
}