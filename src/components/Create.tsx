import * as React from "react";
import Template from './Template';
// MUI Joy (Components)
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import FormHelperText from '@mui/joy/FormHelperText';
import axios from "axios";
import md5 from 'md5-ts';

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  title: HTMLInputElement;
  waitingRoom: HTMLInputElement;
  audio: HTMLInputElement;
  video: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function CreateMeetingUI() {
  const [meetingData, setMeetingData] = React.useState(null);
  const [participantData, setParticipantData] = React.useState(null);
  return (
    <Box
      component="main"
      sx={{
        my: "auto",
        py: 2,
        pb: 5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 400,
        maxWidth: "100%",
        mx: "auto",
        borderRadius: "sm",
        "& form": {
          display: "flex",
          flexDirection: "column",
          gap: 2
        },
      }}
    >
      <div>
        <Typography component="h2" fontSize="xl2" fontWeight="lg">
          Create Meeting
        </Typography>
        <Typography level="body2" sx={{ my: 1, mb: 3 }}>
          Let&apos;s get started! Please enter your meeting details.
        </Typography>
      </div>
      <form
        onSubmit={(event: React.FormEvent<SignInFormElement>) => {
          event.preventDefault();
          const formElements = event.currentTarget.elements;
          const formData = {
            name: formElements.name.value,
            email: formElements.email.value,
            title: formElements.title.value,
            waitingRoom: formElements.waitingRoom.checked,
            defaults: {
              audio: formElements.audio.checked,
              video: formElements.video.checked,
            }
          };
          // Gravatar Function
          const trimText = formData.email.trim();
          const lowerCaseText = trimText.toLowerCase();
          const md5String = md5(lowerCaseText);
          // API Requests
          const meetingOptions = {
            method: 'POST',
            url: 'https://api.cluster.dyte.in/v2/meetings',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Basic NWFjMzA5MzItNDM5NS00Y2Y3LWE3NDctNDY3NTRmOWM3YzY0OjdkMDgzOTU0ZjBiZmU2ZTYyODc2'
            },
            data: {
              title: formData.title,
              preferred_region: 'ap-south-1',
              record_on_start: false,
              live_stream_on_start: false
            }
          };
          axios.request(meetingOptions).then(function (response) {
            console.log(response.data);
            setMeetingData(response.data);
          }).catch(function (error) {
            console.error(error);
            alert(error);
          });
          const participantOptions = {
            method: 'POST',
            url: 'https://api.cluster.dyte.in/v2/meetings/' + meetingData.data.id + '/participants',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Basic NWFjMzA5MzItNDM5NS00Y2Y3LWE3NDctNDY3NTRmOWM3YzY0OjdkMDgzOTU0ZjBiZmU2ZTYyODc2'
            },
            data: {
              name: formData.name,
              picture: 'https://gravatar.com/avatar/' + { md5String } + '?s=512?d=mp?r=pg',
              preset_name: 'group_call_host',
              custom_participant_id: formData.email
            }
          };
          axios.request(participantOptions).then(function (response) {
            console.log(response.data);
            setParticipantData(response.data);
          }).catch(function (error) {
            console.error(error);
            alert(error);
          });
          alert(JSON.stringify(formData, null, 2));
          window.location.href = '/meet?authToken=' + participantData.data.token;
          // participantData.data.token
        }}
      >
        <Typography component="h3" fontSize="xl1" fontWeight="lg">
          Participant Details
        </Typography>
        <FormControl required>
          <FormLabel>
            <b>Name</b>
          </FormLabel>
          <Input placeholder="Enter your name" type="text" name="name" />
        </FormControl>
        <FormControl required>
          <FormLabel>
            <b>Email</b>
          </FormLabel>
          <Input
            placeholder="Enter your Email ID"
            type="email"
            name="email"
          />
        </FormControl>
        <Divider />
        <Typography component="h3" fontSize="xl1" fontWeight="lg">
          Meeting Details
        </Typography>
        <FormControl required>
          <FormLabel>
            <b>Meeting name</b>
          </FormLabel>
          <Input
            placeholder="What's your meeting about?"
            type="text"
            name="title"
          />
        </FormControl>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}
        >
          <FormLabel>
            <b>Options:</b>
          </FormLabel>
          <br />
          <Checkbox size="sm" label="Waiting Room" name="waitingRoom" />
          <Checkbox size="sm" label="Mute Audio On Entry" name="audio" />
          <Checkbox size="sm" label="Mute Video On Entry" name="video" />
        </Box>
        <Button type="submit" fullWidth>
          Start Meeting
        </Button>
      </form>
    </Box>
  );
}
