import React from 'react';
import { Link } from 'react-router-dom';
import Queries from '../services/queries';
import { BracketPreview } from './bracket/BracketPreview';
import './scheme-view-styles.css';

export default class SchemeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enrollments: [],
      queue: [],
      draw: {},
      scheme: {
        TournamentEdition: {}
      },
      team: {},
      showEnrollments: false,
      showQueue: false,
      showDraw: false,
    }
  }

  componentDidMount() {
    Queries.Schemes
      .getById(this.props.match.params['id'])
      .then(res => this.setState(res));
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <h2 style={{ textAlign: 'center' }}>{this.state.scheme.TournamentEdition.name} - {this.state.scheme.name}</h2>

          <div className="scheme-list">
            <div className="scheme-list-header" onClick={() => this.setState({ showEnrollments: !this.state.showEnrollments })}>
              Записани
            </div>
            {/* {this.getList(this.state.enrollments, 3)} */}
            {this.state.showEnrollments ?
              this.state.enrollments.map((e, i) =>
                <div>
                  <Link to={`/users/${e.user1Id}`} key={i}>{i + 1}. {e.user1Name}</Link>
                  {e.user2Id ? <Link to={`/users/${e.user2Id}`} key={i}> & {e.user2Name}</Link> : null}
                </div>)
              : null}

            {this.state.showEnrollments && this.state.enrollments.length == 0 ?
              <div>Няма записани играчи</div> : null}
          </div>

          <div className="scheme-list">
            <div className="scheme-list-header" onClick={() => this.setState({ showQueue: !this.state.showQueue })}>
              Резерви
            </div>
            {/* {this.getList(this.state.enrollments, 3)} */}
            {this.state.showQueue ?
              this.state.queue.map((e, i) => <Link to={`/users/${e.user1Id}`} key={i}>{i + 1}. {e.user1Name}</Link>)
              : null}

            {this.state.showQueue && this.state.queue.length == 0 ?
              <div>Няма резерви</div> : null}
          </div>

          <div className="scheme-list" style={{ overflowX: 'auto' }}>
            <div className="scheme-list-header" onClick={() => this.setState({ showDraw: !this.state.showDraw })}>
              Схема
              {this.state.showDraw ?
                <div style={{ fontSize: '.5em', textDecoration: 'underline' }}>
                  <Link to={`/bracket/${this.state.scheme.id}`}>преглед </Link>
                </div> : null}
            </div>
            {/* {this.getList(this.state.enrollments, 3)} */}
            {this.state.showDraw ?
              <BracketPreview draw={this.state.draw} />
              : null}

            {this.state.showDraw && !this.state.draw.isDrawn ?
              <div>Няма изтеглена схема</div> : null}
          </div>
        </div>
      </div>
    );
  }

  getList(collection, itemsOnRow) {
    const items = [];
    for (let i = 0; i < collection.length; i += itemsOnRow) {
      items.push(
        <div className="scheme-list-row" key={i / itemsOnRow}>
          {collection.slice(i, i + itemsOnRow).map((e, j) => <div>{i + j + 1}. {e.user1Name}</div>)}
        </div>
      );
    }

    return items;
  }
}