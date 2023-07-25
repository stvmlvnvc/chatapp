import React, { Component } from "react";

class Messages extends Component {

    render() {
        const { messages } = this.props;

        return (
            <div className="Messages">
                <ul className="Messages-list">
                    {messages.map((m) => this.renderMessage(m))}
                </ul>
            </div>
        );
    }

    renderMessage(message){
        const messageId = Math.floor(Date.now() * Math.random());
        const {member, text} = message;
        const {currentMember} = this.props;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe ? "Messages-message currentMember" : "Messages-message";

        return (
            <li className={className} key={messageId}>
                <span 
                    className="avatar" 
                    style={{backgroundColor: member.clientData.color}} 
                />
                <div className="Message-content">
                    <div className="username">
                        {member.clientData.username}
                    </div>
                    <div className="text">{text}</div>
                </div>
            </li>
        );
    }
}

export default Messages;
