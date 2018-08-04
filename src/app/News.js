import React from 'react';

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    }
  }
  render() {
    return (
      <div class="wrapper">
        <section class="container">
          <header class="major">
            <h2>Новини</h2>
          </header>

          <div class="row features">
            <section class="col-4 col-12-narrower feature">
              <div class="image-wrapper first">
                <a href="#" class="image featured first"><img style={{ maxHeight: '15rem', width: 'auto' }} src="images/6.png" alt="" /></a>
              </div>
              <header>
                <h2>Форматът „двойки жени“ също ще е част от турнира Smile CUP</h2>
              </header>
              <p>Така форматите на състезание стават цели пет – сингъл мъже, сингъл 45+, двойки мъже, двойки микс и добавеният нов двойки жени. </p>
            </section>

            <section class="col-4 col-12-narrower feature">
              <div class="image-wrapper">
                <a href="#" class="image featured"><img style={{ maxHeight: '15rem', width: 'auto', margin: 'auto' }} src="images/00731427.jpg" alt="" /></a>
              </div>
              <header>
                <h2>Любителският тенис с грандиозен турнир в края на лятото</h2>
              </header>
              <p>Любителският тенис сезон е в началото си. Всички сме готови за прекрасни месеци, в които ще се насладим на любимия спорт и ще участваме в различни турнири.</p>
            </section>
          </div>
        </section>
      </div>
    );
  }
}