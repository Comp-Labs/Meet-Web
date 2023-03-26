import { useEffect } from 'react';
import { DyteMeeting } from '@dytesdk/react-ui-kit';
import { useDyteClient } from '@dytesdk/react-web-core';

export default function Meeting() {
  const [meeting, initMeeting] = useDyteClient();

  useEffect(() => {
    const searchParams = new URL(window.location.href).searchParams;
    const authToken = searchParams.get('authToken');
    const roomName = searchParams.get('roomName') || '';

    if (!authToken) {
      alert(
        "An authToken wasn't passed, please pass an authToken in the URL query to join a meeting."
      );
      return;
    }

    initMeeting({
      authToken,
      roomName,
    });
  }, []);

  return <DyteMeeting meeting={meeting!} showSetupScreen />;
}
