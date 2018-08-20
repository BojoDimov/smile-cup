import React from 'react';

export default class Partners extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="container" id="main">
          <h2 style={{ textAlign: 'center', marginBottom: '1em' }}>Партньори</h2>
          <div className="row">
            <section className="col-6 col-12-narrower feature">
              <div className="image-wrapper first">
                <a class="image featured first"><img style={{ maxHeight: '25rem', width: 'auto', margin: 'auto' }} src="../partners/bft.png" alt="" /></a>
              </div>
            </section>

            <section className="col-6 col-12-narrower feature">
              <div className="image-wrapper">
                <a class="image featured"><img style={{ maxHeight: '25rem', width: 'auto', margin: 'auto' }} src="../partners/albena.png" alt="" /></a>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}