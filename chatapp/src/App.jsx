import React, { Component } from 'react';
import Messages from './modules/Messages';
import Input from './modules/Input';

class App extends Component {

    constructor() {
        super();

        this.drone = new window.Scaledrone("jbKMlnvGEXw5WtJQ", {
            data: this.state.member
        });

    }

    randomName = () => {
        const adjectives = ["late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy"];
        const nouns = ["feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry"];
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        return adjective + noun;
    }

    randomColor = () => {
        return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
    }

    componentDidMount() {
        this.drone.on("open", error => {
            if(error) {
                return console.error(error);
            }
            const member = {...this.state.member};
            member.id = this.drone.clientId;
            this.setState({member});
        });

        const room = this.drone.subscribe("observable-room");

        room.on("data", (data, member) => {
            const messages = this.state.messages;
            messages.push({member, text: data});
            this.setState({messages});
        });
    }

    onSendMessage = (message) => {
        this.drone.publish({
            room: "observable-room",
            message
       });
    }

    state = {
        messages: [],
        member: {
            username: this.randomName(),
            color: this.randomColor()
        }
    }    

    render() {
        return (
            <div className="App">
                <div className='App-header'>
                    <h1>Chatka</h1>
                </div>
                <Messages 
                    messages={this.state.messages}
                    currentMember={this.state.member}
                />
                <Input 
                    onSendMessage={this.onSendMessage}
                />   
            </div>
        );
    }

}

export default App;
