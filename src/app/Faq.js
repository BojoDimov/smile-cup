import React from 'react';

export default class Faq extends React.Component {
  render() {
    return (
      <div class="wrapper">
        <section class="container">
          <section style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
              <h2 style={{ marginBottom: '1rem' }}>Регламент на турнира</h2>
              Място за провеждане на турнира: КК „Албена“;
              <br />
              Дата: 21.09-24.09 септември;
              <br />
              Такси за участие: 25 лв сингъл формат и 30 лв на отбор;
              <br />
              Записване за участие: онлайн на уебсайта на Smile CUP;
            </div>
          </section>

        </section>
      </div>
    );
  }
}