import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import MessageIcon from '@material-ui/icons/Message';
import facebookLogo from './facebook-messenger-logo.jpg';

import './App.css';
import Message from './Message';
import database from './Firebase';

function App() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);
	const [username, setUsername] = useState('');

	useEffect(() => {
		setUsername(prompt(`Please enter your name....`))
	}, []);

	useEffect(() => {
		database.collection("facebook_messenger_messages").
			orderBy('timestamp', 'desc')
			.onSnapshot(snapshot => {
				setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})));

			})
	}, []);

	const sendMessage = (event) => {
		event.preventDefault();

		database.collection("facebook_messenger_messages").add({
			username: username,
			message: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		});
		setInput('');
	}

	return (
		<div className="App" >
			<img src={facebookLogo} style={{height: "150px", width: "150px"}}></img>
			<p>Welcome {username}</p>
			<form className='app__form'>
				<FormControl className= 'app__formControl'>
					<Input className= 'app__input' placeholder="Enter the msg...." value={input} onChange={event => setInput(event.target.value)} />
					<IconButton className= 'app__iconButton' disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>
					   <SendIcon/>
				    </IconButton>
				</FormControl>
			</form>
			<FlipMove>
				{
					messages.map(({id, message}) => (
						<Message key={id} username={username} message={message} />
					))
				}
			</FlipMove>
		</div>
	)
}

export default App;
