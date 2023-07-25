import React, { Component } from 'react';

class Input extends Component {

    state = {
        text: ""
    }

    onChange(e) {
        this.setState({text: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({text: ""});
        this.props.onSendMessage(this.state.text);
    }

    render() {
        return (
            <div className="Input">
                <form onSubmit={e => this.onSubmit(e)}>
                    <input 
                        onChange={e => this.onChange(e)}
                        value={this.state.text}
                        type="text" 
                        placeholder='Send your message...'
                        autoFocus
                    />
                    <button><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon-send"><path d="M21.66,12a2,2,0,0,1-1.14,1.81L5.87,20.75A2.08,2.08,0,0,1,5,21a2,2,0,0,1-1.82-2.82L5.46,13H11a1,1,0,0,0,0-2H5.46L3.18,5.87A2,2,0,0,1,5.86,3.25h0l14.65,6.94A2,2,0,0,1,21.66,12Z"></path></svg></button>
                </form>  
            </div>
        );
    }
}

export default Input;
