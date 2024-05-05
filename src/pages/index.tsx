import * as React from 'react';
import CreateMeetingUI from '../components/Create';
import JoinMeetingUI from '../components/Join';
import TabPanel from '@mui/joy/TabPanel';
import Meeting from './meet';
import Template from '../components/Template';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import VideoCallRoundedIcon from '@mui/icons-material/VideoCallRounded';
import Head from 'next/head'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Tech Fiddle Meet</title>
            </Head>
            <Template>
                <Tabs
                    aria-label="Option for Create/Join a Meeting"
                    defaultValue={0}
                    sx={{ mb: 2, borderRadius: 'lg' }}
                >
                    <TabList>
                        <Tab>
                            <ListItemDecorator>
                                <VideoCallRoundedIcon />
                            </ListItemDecorator>
                            Create
                        </Tab>
                        <Tab>
                            <ListItemDecorator>
                                <VideocamRoundedIcon />
                            </ListItemDecorator>
                            Join
                        </Tab>
                    </TabList>
                    <TabPanel value={0} sx={{ p: 2 }}>
                        <CreateMeetingUI />
                    </TabPanel>
                    <TabPanel value={1} sx={{ p: 2 }}>
                        <JoinMeetingUI />
                    </TabPanel>
                </Tabs>
            </Template>
        </div>
    )
}