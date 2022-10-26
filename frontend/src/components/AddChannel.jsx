import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, TextField } from "@mui/material";

import axios from "axios";

const AddChannel = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleChange = (value) => {
    setName(value);
  };


  const addChannelDetails = () => {
    const options = {
      method: "POST",
      url: `http://localhost:5000/current-channel`,
      params: { channel_name: name },
    };
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
            value={name}
            id="outlined-basic"
            label="Channal Name"
            variant="outlined"
            onChange={(e) => handleChange(e.target.value)}
          />
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
