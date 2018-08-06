import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <div id="footer-wrapper">
        <div id="footer" className="container">
          <header className="major" style={{ display: 'flex', alignItems: 'center' }}>
            <ul className="menu" style={{ flex: 1 }}>
              <li>&copy; SmileEventS. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
            </ul>
            <a href="#" title="+359 883 326 235"><img src="images/phone-call.svg" /></a>
            <a href="mailto:tournaments@smilevent.net" title="tournaments@smilevent.net">
              <img src="images/envelope.svg" />
            </a>
            <a href="https://web.facebook.com/pg/smileeventsbg/" title="https://web.facebook.com/pg/smileeventsbg/">
              <img src="images/facebook.svg" />
            </a>
            <a href="https://www.instagram.com/?hl=en" title="https://www.instagram.com/?hl=en">
              <img src="images/instagram.svg" />
            </a>
            <a href="https://www.youtube.com/watch?v=co4YpHTqmfQ" title="https://www.youtube.com/watch?v=co4YpHTqmfQ">
              <img src="images/youtube.svg" />
            </a>
          </header>
        </div>
      </div>
    )
  }
}