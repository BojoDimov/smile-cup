import React from 'react';
import { Link } from 'react-router-dom';
import Queries from '../services/queries';
import { BracketPreview } from './bracket/BracketPreview';
import { ConfirmationButton, createOpenModalEvent, AccommodationMessage } from './Infrastructure';
import { get, post } from '../services/fetch';
import * as Enums from '../enums';
import * as UserService from '../services/user';
import './scheme-view-styles.css';

export default class SchemeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: UserService.getUser(),
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
    this.getData();
  }

  getData() {
    Queries.Schemes
      .getById(this.props.match.params['id'])
      .then(res => this.setState(res));
  }

  enroll(scheme) {
    get(`/schemes/${scheme.id}/enroll?userId=${this.state.user.id}`)
      .then(() => {
        this.getData();
        createOpenModalEvent(<AccommodationMessage />, () => null);
      });
  }

  cancelEnroll(scheme) {
    get(`/schemes/${scheme.id}/cancelEnroll?userId=${this.state.user.id}`)
      .then(() => this.getData());
  }

  isEnrolled() {
    if (this.state.user)
      return this.state.user && (this.state.enrollments
        .find(e => e.user1Id == this.state.user.id || e.user2Id == this.state.user.id)
        || this.state.queue
          .find(e => e.user1Id == this.state.user.id || e.user2Id == this.state.user.id));
  }

  render() {
    const button = this.getButton(this.state.scheme);

    return (
      <div className="wrapper">
        <div className="container">
          {button ?
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <h2 style={{ flex: 4, flexBasis: '14rem' }}>{this.state.scheme.TournamentEdition.name} - {this.state.scheme.name}</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', flex: 1 }}>
                <ConfirmationButton message={button.message}
                  confirm={button.confirm}
                  onChange={flag => flag ? button.onClick() : null} >
                  <span className={`special-button small ${button.class}`}
                    title={button.title}>{button.name}</span>
                </ConfirmationButton>
                {this.isEnrolled() ?
                  <div>
                    <span className="special-button small disabled" title="Плащането през сайта ще бъде отворено скоро." >Плащане</span>
                  </div> : null}
              </div>
            </div>
            : <h2 style={{ textAlign: 'center' }}>{this.state.scheme.TournamentEdition.name} - {this.state.scheme.name}</h2>
          }

          <div className="scheme-list">
            <div className="scheme-list-header" onClick={() => this.setState({ showEnrollments: !this.state.showEnrollments })}>
              Записани
            </div>
            {/* {this.getList(this.state.enrollments, 3)} */}
            {this.state.showEnrollments ?
              this.state.enrollments.map((e, i) =>
                <div key={i}>
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
              this.state.queue.map((e, i) =>
                <div>
                  <Link to={`/users/${e.user1Id}`} key={i}>{i + 1}. {e.user1Name}</Link>
                  {e.user2Id ? <Link to={`/users/${e.user2Id}`} key={i}> & {e.user2Name}</Link> : null}
                </div>)
              : null}

            {this.state.showQueue && this.state.queue.length == 0 ?
              <div>Няма резерви</div> : null}
          </div>

          <div className="scheme-list" style={{ overflowX: 'auto' }}>
            <div className="scheme-list-header" onClick={() => this.setState({ showDraw: !this.state.showDraw })}>
              Схема
              {this.state.showDraw && this.state.draw.isDrawn ?
                <div style={{ fontSize: '.5em', marginTop: '1rem' }}>
                  <Link to={`/bracket/${this.state.scheme.id}`}>преглед </Link>
                  {this.state.scheme.groupPhase ? <Link to={`/bracket/${this.state.scheme.groupPhaseId}`}>| групова фаза</Link> : null}
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

  getButton(scheme) {
    if (!this.state.user)
      return {
        confirm: false,
        message: null,
        title: null,
        name: 'Записване',
        class: 'b',
        onClick: (e) => {
          if (e)
            e.stopPropagation();
          return this.props.history.push(`/login`);
        }
      }

    const age = new Date(new Date() - new Date(this.state.user.birthDate)).getUTCFullYear() - 1970;

    if (scheme.status == Enums.Status.FINALIZED || scheme.hasGroupPhase)
      return null;

    if (new Date(scheme.registrationStart) > new Date())
      return {
        confirm: false,
        message: null,
        title: 'Записването още не е започнало',
        name: 'Записване',
        class: 'disabled',
        onClick: (e) => {
          if (e)
            e.stopPropagation()
        }
      }

    if (this.isEnrolled())
      return {
        confirm: true,
        message: `Сигурни ли сте че искате да се отпишете от турнир "${scheme.name}"?`,
        title: null,
        name: 'Отписване',
        class: 'default',
        onClick: (e) => {
          if (e)
            e.stopPropagation();
          return this.cancelEnroll(scheme)
        }
      }

    //двойки
    if (!scheme.singleTeams
      && (scheme.mixedTeams || scheme[this.state.user.gender + 'Teams']))
      return {
        confirm: false,
        message: null,
        title: null,
        name: 'Записване',
        class: 'g',
        onClick: (e) => {
          if (e)
            e.stopPropagation();
          return this.props.history.push(`/schemes/${scheme.id}/invite`);
        }
      }

    if (scheme[this.state.user.gender + 'Teams']
      && (!scheme.ageFrom || scheme.ageFrom < age)
      && (!scheme.ageTo || scheme.ageTo > age)) {
      if (new Date() > new Date(scheme.registrationEnd))
        return {
          confirm: true,
          message: `Сигурни ли сте че искате да се запишете за турнир "${scheme.name}"?`,
          title: 'регистрацията е приключила, ще бъдете записан в опашка',
          name: 'Записване',
          class: 'b',
          onClick: (e) => {
            if (e)
              e.stopPropagation();
            return this.enroll(scheme)
          }
        }
      else
        return {
          confirm: true,
          message: `Сигурни ли сте че искате да се запишете за турнир "${scheme.name}"?`,
          title: null,
          name: 'Записване',
          class: 'g',
          onClick: (e) => {
            if (e)
              e.stopPropagation();
            return this.enroll(scheme)
          }
        }
    }
    else
      return {
        confirm: false,
        message: null,
        title: 'не отговаряте на изискванията за тази схема',
        name: 'Записване',
        class: 'disabled',
        onClick: (e) => {
          if (e)
            e.stopPropagation()
        }
      }
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