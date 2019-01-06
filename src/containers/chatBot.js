import React, {Component, findDOMNode} from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactTooltip from 'react-tooltip';
import Loader from 'react-loader-spinner';

import {sendMessage} from '../actions';

class ChatBot extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    this.props.sendMessage(this.textInput.current.value);
  }

  componentDidUpdate() {
    this.textInput.current.value = '';
  }

  render() {
    console.log(this.props.messages);
    return (
      <div className="chatbox">
        <div className="messages">
          <div className="message_history">
            {
              this.props.messages.message.map((message, index) => (
                <div key={index}>
                  {
                    message.sender !== 'bot'
                      ?
                      <div className="incoming_msg">
                        <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" width="25" height="25" /></div>
                        <div className="received_msg">
                          <div className="received_withd_msg">
                            <p>{message.message}</p>
                          </div>
                        </div>
                      </div>
                      :
                      <div className="outgoing_message">
                        <div className="sent_msg">
                          <p>{message.message}</p>
                        </div>
                      </div>
                  }
                  <br/>
                </div>
              ))
            }
            {
              this.props.messages.loader
                ?
                <div className="outgoing_message loading">
                  <div className="sent_msg">
                    <p><Loader type="ThreeDots" color="#00BFFF" height={20} width={20} /></p>
                  </div>
                </div>
                :
                <div></div>
            }
          </div>
          <div className="type_message">
            <form className="input_message" onSubmit={this.submitForm} >
              <input className="input-text" ref={this.textInput} data-tip='Did you apply your changes?' autoFocus={false} placeholder="Type a message" />
              <Button type="submit" className="send_message"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></Button>
            </form>
          </div>
        </div>
        <ReactTooltip />
      </div>
    );
  }
}

const mapStateToProps = ({messages}) => ({
  messages
});

const mapDispatchToProps = dispatch => bindActionCreators({sendMessage}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatBot);
