import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChannels } from "../features/channelSlice";

import axios from "axios";

import { Button } from "@mui/material";
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
      console.log('response', response);
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
        
        <div key={channel.id} className="oneChannel">
          <div><b>{channel.title}</b></div>
          <div>
            <img src={channel.profileImage}></img>
            
          </div>
          {channel.description ? (
            <div><i>{channel.description}</i></div>
          ) : (
            <div><i>No Description</i></div>
          )}
          <div>{channel.membersCounter}</div>
          <div>
            <a href={`https://t.me/${channel.username}`}>@{channel.username}</a>
          </div>
          <div>
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={() => handleUpBotton(channel.id)}
              disabled={channel.isDisabled === true}
            >
              <KeyboardDoubleArrowUpIcon />
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Channels;
