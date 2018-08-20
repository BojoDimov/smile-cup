import React from 'react';

export default class Faq extends React.Component {
  render() {
    return (
      <div class="wrapper">
        <section class="container">
          <section style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
              <h2 style={{ marginBottom: '1rem' }}>Регламент за организация и провеждане на тенис турнири за любители Smile Cup</h2>
              <h3>Формат</h3>
              <p>
                Сингъл до 45 г: до 24 групи по 4 участника, един сет до 6 гейма;
                <br />
                Сингъл 45+: до 8 групи по 4 участника, един сет до 6 гейма;
                <br />
                Двойки: Директна елиминация до 64 участника;
                <br />
                Микс: Групова фаза до 32 отбора;
                <br />
                Двойки жени: Групова фаза;
              </p>

              <h3>Записване</h3>
              <p>
                Онлайн на <a href="http://www.smilevent.net">www.smilevent.net</a>. След като даден играч попълни профилната форма и си създаде акаунт, може да пристъпи към записване за различните формати на турнира. В сингъл форматите играчът трябва да се запише и да плати таксата за участие онлайн през платформата на Epay.bg в smilevent.net или на каса на Easypay. При записването за двойки, участник кани партньор да играят в един отбор. Когато поканеният участник одобри заявката през своя профил, двамата играчи стават един отбор и биват автоматично записани за съответния двойков турнир, за който е подадена заявка. Плащането пак става по същия начин – през онлайн формата за плащане на smileevent.net или на каса в някои от офисите на Easypay.
              </p>

              <h3>Място за провеждане на турнира</h3>
              <p>Курортен комплекс „Албена“ с 19 открити тенис корта с червена настилка, разположени в близост до хотелите: „Ралица“, „Орхидея“, „Фламинго“, „Сенди Бийч“, „Калиопа“</p>

              <h3>Такса за участие</h3>
              <p>25 лв за сингъл схема и 30 лв на отбор</p>

              <h3>Начало на турнира </h3>
              <p>21.09.2018 г. 10:00 ч.</p>

              <h3>Критерии за участие</h3>
              <p>Могат да участват всички, които:
                <br />
                - не са участвали в състезания от календара на БФТ след навършване на 14-годишна възраст;
                <br />
                - не са участвали в състезания от календара на БФТ през последните десет години;
                <br />
                - не са действащи треньори, инструктори, учители или студенти по тенис;
                <br />

                *гореизброените критерии не важат за жени и мъже, навършили 45 години;
              </p>

              <h3>Настаняване</h3>
              <p>Официални хотели: Хотел Малибу (****), Хотел & Спа Фламинго Гранд (*****) </p>

              <h3>За възникнали въпроси</h3>
              <p>Ивайло Коев
                <br />
                <a href="mailto:tournaments@smilevent.net">tournaments@smilevent.net</a>
                <br />
                +359 883 326 235
              </p>
            </div>
          </section>

        </section>
      </div>
    );
  }
}