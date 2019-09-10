import React, { Component } from 'react';
import Axios from 'axios';

import './HistoryModal.css';

export default class HistoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyMessages: []
    };
  }

  
  componentDidMount() {
    // create request here
    Axios.get('/api/messages/history')
      .then(res => this.setState({historyMessages: res.data}))
      .catch(err => err)
  }
  

  render() {
    let historyMessages = this.state.historyMessages.map((messageObj, i) => {
      return (
        <div className="message" key={i}>
          <span>{messageObj.username}</span>
          <span>{messageObj.message}</span>
        </div>
      );
    });

    return (
      <section className="modal-wrapper">
        <div className="modal-content">{historyMessages}</div>
        <div className="close" onClick={this.props.closeHistoryModal}>
          x
        </div>
      </section>
    );
  }
}
