import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChannels } from "../features/channelSlice";
import axios from "axios";

import { Container, Box, Grid, Typography } from "@mui/material";
import Search from "./Search";
import Channels from "./Channels";

const Home = () => {
  const filterBy = useSelector((state) => state.channel.filterBy);
  const dispatch = useDispatch();

  useEffect(() => {
    getChannelsAPI();
  }, []);

  const getChannelsAPI = () => {
    const options = {
      method: "GET",
      url: `http://localhost:5000/channels`,
    };

    axios.request(options).then((response) => {
      dispatch(getChannels(response.data));
    });
  };

  const pageTitle =
    filterBy.length === 0 ? <h2>Top Channels</h2> : <h2>Filterd Channels</h2>;


  return (
    <>
      <div className="results-wraper">
        <Search />
        <div className="title">{pageTitle}</div>
        <div className="channels-wrapper">
          <Channels />
        </div>
      </div>
    </>
  );
};

export default Home;

