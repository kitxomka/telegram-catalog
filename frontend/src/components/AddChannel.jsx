import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, TextField } from "@mui/material";

import axios from "axios";
import ChannelsCategories from "./ChannelsCategories";
import { useSelector } from "react-redux";

const AddChannel = () => {
  const [channelName, setChannelName] = useState("");
  const navigate = useNavigate();

  const channelCategoryName = useSelector(
    (state) => state.channel.categoryName
  );

  const handleChange = (value) => {
    setChannelName(value);
  };

  const addChannelDetails = () => {
    let options = {};
    let categoryName = "";
    if (channelCategoryName.length != 0) {
      categoryName = channelCategoryName;
    } else {
      categoryName = "Other";
    }

    if (channelName.length != 0) {
      console.log("channelName:", channelName);
      if (channelName.charAt(0) !== "@") {
        options = {
          method: "POST",
          url: `http://localhost:5000/current-channel`,
          params: {
            channel_name: "@" + channelName,
            category_name: categoryName,
          },
        };
      } else {
        options = {
          method: "POST",
          url: `http://localhost:5000/current-channel`,
          params: { channel_name: channelName, category_name: categoryName },
        };
      }
    } else {
      alert('The channel name is required');
    }

    axios.request(options).then((response) => {
      console.log("response", response);
      navigate("/");
    });
  };

  

  return (
    <>
      <div className="form-wrapper">
        <Typography variant="h4">Add Channel</Typography>
        <Box
          className="channal-inputs-container"
          component="form"
          noValidate
          autoComplete="off"
        >
          <TextField
            className="channal-name"
            value={channelName}
            id="outlined-basic"
            label="Channel Name"
            variant="outlined"
            onChange={(e) => handleChange(e.target.value)}
            required
          />
        </Box>
        <Box className="channal-category-container">
          <ChannelsCategories />
        </Box>
        <Box className="channal-btn">
          <Button variant="contained" onClick={addChannelDetails}>
            Add
          </Button>
        </Box>
      </div>
    </>
  );
};

export default AddChannel;
