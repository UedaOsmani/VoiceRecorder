import React from 'react';
import {Recorder} from 'react-voice-recorder'
import './style.css'

export default class VoiceRecorder extends React.Component {
  constructor(props) {
    super(props);
    //initialize elements we'll use
    this.state = {
      email:"", //email of the user
      audioURL: null,
      audioDetails: {
        url: null,
        blob: null, //the blob that will hold the recorded audio
        chunks: null, //will be used later to record audio
        duration: {
          h: 0,
          m: 0,
          s: 0
        }
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleAudioStop(data) {
    console.log(data);
    this.setState({ audioDetails: data });
    //console.log(data);
  }

  //here we are able to update email's value
  handleChange(event) {
    this.setState({email: event.target.email});
  }

   submit(e) {
    e.preventDefault();
   //the form data that will hold the Blob to upload
  const formData = new FormData();
  const url="" //Here we add the endpoint where we want to send the info
  //add the Blob to formData
  formData.append('audio', this.state.audioDetails.blob, 'recording.mp3');
  formData.append(this.state.email);

  //send the request to the endpoint
  fetch(url, {
    method: 'POST',
    body: formData
  })
  .then((response) => response.json())
  .then(() => {
    alert("Your recording is sent"); //success
  })
  .catch((err) => {
    console.error(err);
    alert("An error occurred, please try again later");
  })
}

  render() {
    return (
      <div className="App">
        <Recorder
          record={true} //browser prompts the user to allow the website to access the microphone
          audioURL={this.state.audioDetails.url}
          showUIAudio
          handleAudioStop={(data) => this.handleAudioStop(data)}
        />
         <form onSubmit={this.submit}>
            <label>
                Email Address:
                <input type="text" id="email" value={this.state.email} onChange={this.handleChange}  />
            </label>
            <input type="submit" value="Submit" />
            </form>
      </div>
    );
  }
}
