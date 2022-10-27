import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, TextField } from "@mui/material";

import axios from "axios";
import ChannelsCategories from "./ChannelsCategories";
import { useSelector } from "react-redux";


const AddChannel = () => {

  const [chanalName, setChanalName] = useState("");
  const navigate = useNavigate();

  const channalCategoryName = useSelector((state) => state.channel.categoryName);

  const handleChange = (value) => {
    setChanalName(value);
  };


  const addChannelDetails = () => {
    let options = {}
    if (chanalName.charAt(0) !== "@") {
      options = {
        method: "POST",
        url: `http://localhost:5000/current-channel`,
        params: { channel_name: "@" + chanalName, category_name: channalCategoryName },
      };
    } else {
      options = {
        method: "POST",
        url: `http://localhost:5000/current-channel`,
        params: { channel_name: chanalName, category_name: channalCategoryName},
      };
    }
    axios.request(options).then((response) => {
      console.log("response", response);
      navigate("/");
    });
  };

  const addToChannelsArray = () => {
    addChannelDetails();
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
            value={chanalName}
            id="outlined-basic"
            label="Channal Name"
            variant="outlined"
            onChange={(e) => handleChange(e.target.value)}
          />
        </Box>
        <Box className="channal-category-container">
          <ChannelsCategories/>
        </Box>
        <Box className="channal-btn">
          <Button variant="contained" onClick={addToChannelsArray}>
            Add
          </Button>
        </Box>
      </div>
    </>
  );
};

export default AddChannel;
