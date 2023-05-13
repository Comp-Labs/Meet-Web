import * as React from 'react';
import { DyteMeeting } from '@dytesdk/react-ui-kit';
import { useDyteClient } from '@dytesdk/react-web-core';

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