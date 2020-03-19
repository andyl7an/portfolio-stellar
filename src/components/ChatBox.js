import React from 'react'
import Typist from 'react-typist'
import styles from './ChatBox.module.css'
import googleAuth from './googleAuth/GoogleAuth';


class ChatBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      text: `Hi, I'm a Software Engineer from San Francisco living in Seattle`,
      typing: true,
      reading: true,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.loopTyping = this.loopTyping.bind(this)
    this.getQueryResult = this.getQueryResult.bind(this)
    this.generateAccessToken = this.generateAccessToken.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  async generateAccessToken(clientEmail, privateKey) {
    let token;
    try {
        token = await googleAuth(clientEmail, privateKey, ['https://www.googleapis.com/auth/cloud-platform']);
    } catch (e) {
        console.error("react-native-dialogflow: Authentication Error: " + e);
        throw new Error("react-native-dialogflow: Authentication Error: " + e);
    } finally {
        return token;
    }
}

  async getQueryResult(utterance) {
    const token = await this.generateAccessToken(
      process.env.DIALOGFLOW_PRIVATE_EMAIL,
      process.env.DIALOGFLOW_PRIVATE_KEY
    );
    if (!token) {
      console.error("Authentication failed");
    }

    // Create the request parameters to Dialogflow
    const url =
      'https://dialogflow.googleapis.com/v2beta1/projects/antan-portfolio-ouemuo/agent/sessions/6bacda62-9cdf-e0fd-f19c-388748863444:detectIntent'
    const data = {
      queryInput: {
        text: { text: utterance, languageCode: 'en' },
      },
    }
    return fetch(url, {
      body: JSON.stringify(data),
      headers: {
        Authorization:
        `Bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      method: 'POST',
    })
      .then(res => res.json())
      .catch(error => {
        console.error(`Error: ${error}`)
        this.setState({ text: `Error: ${error}` })
      })

  }

  async handleSubmit(event) {
    // Prevent page refresh on submit
    event.preventDefault()

    
    const request = this.getQueryResult(this.state.value);

    // Clear the text box
    this.setState({value: ""});

    const response = await request;
    this.setState({
      text: response.queryResult.fulfillmentText
    })
    this.loopTyping()

  }

  // Restart Typist animation
  loopTyping = () => {
    this.setState({ typing: false }, () => {
      this.setState({ typing: true })
    })
  }

  render() {
    return (
      <div>
        {this.state.typing ? (
          <Typist cursor={{ hideWhenDone: true }}>{this.state.text}</Typist>
        ) : (
          ''
        )}

        <form onSubmit={this.handleSubmit}>
          <input
            className={styles.header}
            type="text"
            placeholder="Ask me anything"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
      </div>
    )
  }
}

export default ChatBox
