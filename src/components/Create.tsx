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
import { createHash } from 'crypto';
import { DyteMeeting } from '@dytesdk/react-ui-kit';
import { useDyteClient } from '@dytesdk/react-web-core';
import Stack from '@mui/joy/Stack';
// import md5 from 'md5-ts';

interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    email: HTMLInputElement;
    title: HTMLInputElement;
    waitingRoom: HTMLInputElement;
    audio: HTMLInputElement;
    video: HTMLInputElement;
    recordOnStart: HTMLInputElement;
    liveStreamOnStart: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export function Meet(props: { authToken: string; audio: boolean; video: boolean; }) {
    const [meeting, initMeeting] = useDyteClient();
    React.useEffect(() => {
        const searchParams = new URL(window.location.href).searchParams;
        const authToken = props.authToken;
        // searchParams.get('authToken')
        if (!authToken) {
            alert(
                "An authToken wasn't passed, please pass an authToken to join a meeting."
            );
            return;
        }

        initMeeting({
            authToken,
            defaults: {
                audio: props.audio,
                video: props.video,
            },
        });
    }, []);

    return <DyteMeeting meeting={meeting!} showSetupScreen />;
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
                        recordOnStart: formElements.recordOnStart.checked,
                        liveStreamOnStart: formElements.liveStreamOnStart.checked,
                        defaults: {
                            audio: formElements.audio.checked,
                            video: formElements.video.checked,
                        }
                    };
                    // Gravatar Function
                    var md5 = require("blueimp-md5")
                    const email = "Complabs28@gmail.com "
                    const trimText = email.trim();
                    const lowerCaseText = trimText.toLowerCase();
                    const hashString = md5(lowerCaseText);
                    // API Requests
                    const meetingOptions = {
                        method: 'POST',
                        url: 'https://meet-backend.fly.dev/meetings',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Basic Og=='
                        },
                        data: {
                            title: formData.title,
                            preferred_region: 'ap-south-1',
                            record_on_start: formData.recordOnStart,
                            live_stream_on_start: formData.liveStreamOnStart
                        }
                    };
                    axios.request(meetingOptions).then(function (response) {
                        console.log(response.data);
                        // setMeetingData(response.data);
                        const participantOptions = {
                            method: 'POST',
                            url: 'https://meet-backend.fly.dev/meetings/' + response.data.data.id + '/participants',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: 'Basic Og=='
                            },
                            data: {
                                name: formData.name,
                                picture: 'https://gravatar.com/avatar/' + hashString + '?s=512?d="http%3A%2F%2Flocalhost%3A3000%2Fuser.png"?r=pg',
                                preset_name: 'group_call_host',
                                client_specific_id: formData.email
                            }
                        };
                        axios.request(participantOptions).then(function (response) {
                            console.log(response.data);
                            // return <Meet authToken={response.data.data.token} audio={formData.defaults.audio} video={formData.defaults.video} />
                            window.location.href = '/meet?authToken=' + response.data.data.token + '&audio=' + formData.defaults.audio + '&video=' + formData.defaults.video;
                        }).catch(function (error) {
                            console.error(error);
                            alert(error);
                        });
                    }).catch(function (error) {
                        console.error(error);
                        alert(error);
                    });
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
                    <Stack spacing={2} sx={{ width: '100%' }}>
                    <FormLabel>
                        <b>Options:</b>
                    </FormLabel>
                    <Checkbox disabled size="sm" label="Waiting Room Enabled (Coming Soon)" name="waitingRoom" />
                    <Checkbox size="sm" label="Mute Audio On Entry" name="audio" />
                    <Checkbox size="sm" label="Mute Video On Entry" name="video" />
                    <Checkbox size="sm" label="Record on Start" name="recordOnStart" />
                    <Checkbox size="sm" label="Live Stream on Start" name="liveStreamOnStart" />
                    </Stack>
                <Button type="submit" fullWidth>
                    Start Meeting
                </Button>
            </form>
        </Box>
    );
}
