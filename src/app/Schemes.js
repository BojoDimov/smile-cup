import React from 'react';
import { get } from '../services/fetch';
import './fast-styles.css';
import * as UserService from '../services/user';
import * as Enums from '../enums';
import Queries from '../services/queries';

export default class Schemes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: UserService.getUser(),
      schemes: [],
      edition: {},
      enrolled: []
    }
  }

  componentDidMount() {
    Queries.Schemes
      .get(this.props.match.params['id'])
      .then(res => this.setState(res));
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container list">
          <h2>{this.state.edition.name}</h2>
          {this.state.schemes.map(this.getScheme.bind(this))}
        </div>
      </div>
    );
  }

  enroll(scheme) {
    get(`/schemes/${scheme.id}/enroll?userId=${this.state.user.id}`)
      .then(() => this.setState({ enrolled: this.state.enrolled.concat([scheme.id]) }));
  }

  cancelEnroll(scheme) {

    get(`/schemes/${scheme.id}/cancelEnroll?userId=${this.state.user.id}`)
      .then(() => {
        let ei = this.state.enrolled.indexOf(scheme.id);
        let enrolled = this.state.enrolled;
        enrolled.splice(ei, 1);
        return this.setState({ enrolled: enrolled })
      });
  }

  getScheme(scheme, i) {
    const button = this.getButton(scheme);

    return (
      <div className="button list-row" key={i} onClick={() => this.props.history.push(`/schemes/${scheme.id}`)} style={{ cursor: 'pointer' }}>
        <img src="../images/smile-logo.jpg" />
        <div >
          <div className="list-row-header">{scheme.name}</div>
          <div style={{ fontWeight: 700 }}>{getLocaleDate(scheme.date)}</div>
        </div>

        <div style={{ flexGrow: 1, textAlign: 'center' }}>
          {getLimitations(scheme)}
        </div>

        <div style={{ padding: '1rem' }}>
          <div>Записване</div>
          <div>{getLocaleDateTime(scheme.registrationStart)}</div> <div>{getLocaleDateTime(scheme.registrationEnd)}</div>
        </div>

        <div style={{ width: '10rem' }}>
          {button ?
            <span className={`special-button ${button.class}`}
              title={button.title}
              onClick={button.onClick}>{button.name}</span>
            : null}
        </div>
      </div>
    );
  }

  getButton(scheme) {
    let button = null;
    if (!this.state.user)
      return button;

    const age = new Date(new Date() - new Date(this.state.user.birthDate)).getUTCFullYear() - 1970;

    if (this.state.enrolled.find(e => e == scheme.id))
      return {
        title: null,
        name: 'Отписване',
        class: 'default',
        onClick: (e) => {
          e.stopPropagation();
          return this.cancelEnroll(scheme)
        }
      }

    //двойки
    if (!scheme.singleTeams
      && (scheme.mixedTeams || scheme[this.state.user.gender + 'Teams']))
      return {
        title: null,
        name: 'Покани',
        class: 'g',
        onClick: (e) => {
          e.stopPropagation();
          return this.props.history.push(`/schemes/${scheme.id}/invite`);
        }
      }

    if (scheme[this.state.user.gender + 'Teams']
      && (!scheme.ageFrom || scheme.ageFrom < age)
      && (!scheme.ageTo || scheme.ageTo > age)) {
      if (new Date() > new Date(scheme.registrationEnd))
        return {
          title: 'регистрацията е приключила, ще бъдете записан в опашка',
          name: 'Записване',
          class: 'b',
          onClick: (e) => {
            e.stopPropagation();
            return this.enroll(scheme)
          }
        }
      else
        return {
          title: null,
          name: 'Записване',
          class: 'g',
          onClick: (e) => {
            e.stopPropagation();
            return this.enroll(scheme)
          }
        }
    }
    else
      return {
        title: 'не отговаряте на изискванията за тази схема',
        name: 'Записване',
        class: 'disabled',
        onClick: (e) => {
          e.stopPropagation()
        }
      }
  }
}

function getLimitations(scheme) {
  const limitations = [];
  if (scheme.schemeType == Enums.SchemeType.ELIMINATION)
    limitations.push('K ' + getSize(scheme));
  if (scheme.schemeType == Enums.SchemeType.GROUP)
    limitations.push('G ' + getSize(scheme));
  if (scheme.maleTeams)
    limitations.push('M');
  if (scheme.femaleTeams)
    limitations.push('F');
  if (scheme.mixedTeams)
    limitations.push('Mixed');
  if (scheme.ageFrom || scheme.ageTo)
    limitations.push(scheme.ageFrom + ' - ' + scheme.ageTo);

  return limitations.join(' | ');
}

function getSize(scheme) {
  if (scheme.schemeType == 'elimination')
    return scheme.maxPlayerCount;
  else return scheme.groupCount * scheme.teamsPerGroup;
}


function canEnroll(user, scheme) {
  if (scheme.singleTeams) {
    return scheme[user.gender + 'Teams'];
  }
}

function getLocaleDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString();
}

function getLocaleDateTime(date) {
  const d = new Date(date);
  return d.toLocaleString();
}