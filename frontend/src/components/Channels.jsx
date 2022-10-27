import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChannels } from "../features/channelSlice";

import axios from "axios";

import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  Button,
  CardActions,
  Tooltip 
} from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

const Channels = () => {
  const channelsList = useSelector((state) => state.channel.channelsList);
  const filterBy = useSelector((state) => state.channel.filterBy);
  const dispatch = useDispatch();

  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    filterChannelList(channelsList, filterBy);
  }, [filterBy]);

  useEffect(() => {
    setFilteredList(channelsList);
  }, [channelsList]);

  const filterChannelList = (channelsList, filterBy) => {
    if (filterBy.length > 0) {
      console.log("filterBy", filterBy);
      let tmpFilteredList = channelsList.filter(
        (channel) =>
          channel.title?.toLowerCase().includes(filterBy.toLowerCase()) ||
          channel.description?.toLowerCase().includes(filterBy.toLowerCase()) ||
          channel.username?.toLowerCase().includes(filterBy.toLowerCase())
      );
      setFilteredList(tmpFilteredList);
    }
  };

  const getChannelsAPI = () => {
    const options = {
      method: "GET",
      url: `http://localhost:5000/channels`,
    };

    axios.request(options).then((response) => {
      console.log("response", response);
      dispatch(getChannels(response.data));
    });
  };

  const updateChannelIndex = (id) => {
    const options = {
      method: "POST",
      url: `http://localhost:5000/update-channel-index`,
      params: { channel_id: id },
    };
    axios
      .request(options)
      .then((response) => {
        console.log("response", response);
        getChannelsAPI();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handleUpBotton = (id) => {
    // debugger;
    console.log("id", id);
    updateChannelIndex(id);
  };

  return (
    <>
      {filteredList?.map((channel) => (
        <Card key={channel.id} className="oneChannel">
          <CardHeader title={channel.title} />
          <div className="bg">
            <img src={`http://localhost:5000${channel.profileImage}`} />
            <div class="overlay">
              <div>Category: {channel.category}</div>
            </div>
          </div>
          <CardContent>
            {channel.description ? (
              <Typography variant="body2" color="text.secondary">
                {channel.description}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No Description
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              {channel.membersCounter}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <a href={`https://t.me/${channel.username}`}>@{channel.username}</a>
            </Typography>
          </CardContent>
          <CardActions>
          <Tooltip title="Click to UP the channel" placement="right-end">
            <Button
              className="upBtn"
              size="small"
              variant="contained"
              color="success"
              onClick={() => handleUpBotton(channel.id)}
              disabled={channel.isDisabled === true}
            >
              <KeyboardDoubleArrowUpIcon />
            </Button>
          </Tooltip>
          
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default Channels;
