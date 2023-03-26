import * as React from 'react';
import {
  BrowserRouter as Router,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import CreateMeetingUI from './components/Create';
import JoinMeetingUI from './components/Join';
import TabPanel from '@mui/joy/TabPanel';
import Meeting from './components/Meeting';
import Template from './components/Template';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import VideoCallRoundedIcon from '@mui/icons-material/VideoCallRounded';

export default function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meet" element={<Meeting />} />
        </Routes>
      </div>
    </Router>
  )
}

export function Home() {
  return (
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
  )
}