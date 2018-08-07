import React from 'react';

export default class Contacts extends React.Component {
  render() {
    return (
      <div class="wrapper">
        <section class="container">
          <section style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
              <h2 style={{ marginBottom: '1rem' }}>Контакти</h2>
              Ивайло Коев
              <br />
              tournaments@smilevent.net
              <br />
              +359 883 326 235
              </div>
          </section>

        </section>
      </div>
    );
  }
}