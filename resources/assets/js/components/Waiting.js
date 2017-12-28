import React, { Component } from 'react';

export default class Waiting extends Component {


  render() {
    let waitingStyle = {
      position: 'absolute',
      display: (this.state.isOpen) ? 'block' : none,
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundColor: "rgba(0,0,0,0.8)",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
      waitingContentStyle = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        color: '#ffffff',
        textAlign: 'center'
      },
      waitingMessageStyle = {
        lineHeight: '1.6rem',
        fontSize: '1.7rem',
        letterSpacing: '-1px',
        fontWeight: 'bold'
      }


    return (
      <div style={waitingStyle}>
        <div style={waitingContentStyle}>
          <i className="fas fa-circle-notch fa-spin fa-5x" style={{ 'margin': '10px auto' }}></i><br/>
          <p style={waitingMessageStyle}>Loading...<br/>please wait!</p>
        </div>
      </div>
    );
  }
}
