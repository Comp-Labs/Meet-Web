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
import axios from 'axios';
import { createHash } from 'crypto';

interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    email: HTMLInputElement;
    id: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export default function JoinMeetingUI() {
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
                [`& .${formLabelClasses.asterisk}`]: {
                    visibility: "hidden"
                }
            }}
        >
            <div>
                <Typography component="h2" fontSize="xl2" fontWeight="lg">
                    Join Meeting
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
                        id: formElements.id.value
                    };
                    // Gravatar Function
                    const trimText = formData.email.trim();
                    const lowerCaseText = trimText.toLowerCase();
                    const md5String = createHash('md5').update(lowerCaseText).digest('hex');
                    // API Request
                    const participantOptions = {
                        method: 'POST',
                        url: 'https://meet-backend.fly.dev/meetings/' + formData.id + '/participants',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {
                            name: formData.name,
                            picture: 'https://gravatar.com/avatar/' + md5String + '?s=512?d=mp?r=pg',
                            preset_name: 'group_call_host',
                            custom_participant_id: formData.email
                            // picture: 'https://cdn.jsdelivr.net/gh/Comp-Labs/cdn/img/logo-removebg.jpg',
                        }
                    };
                    axios.request(participantOptions).then(function (response) {
                        console.log(response.data);
                        window.location.href = '/meet?authToken=' + response.data.data.token;
                    }).catch(function (error) {
                        console.error(error);
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
                        <b>Meeting ID</b>
                    </FormLabel>
                    <Input
                        placeholder="Something Like `bbbc002b-0527-4b35-9687-99ee388d6ac0`"
                        type="text"
                        name="id"
                    />
                </FormControl>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center"
                    }}
                >
                </Box>
                <Button type="submit" fullWidth>
                    Join Meeting
                </Button>
            </form>
            {/* <Button
              variant="outlined"
              color="neutral"
              fullWidth
              startDecorator={<GoogleIcon />}
            >
              Sign in with Google
            </Button> */}
        </Box>
    );
}
