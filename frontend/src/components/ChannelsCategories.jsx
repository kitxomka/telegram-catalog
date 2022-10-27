import React, { useState, useEffect } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import { channalCategoryName } from "../features/channelSlice";

const CategoriesArr = [
  "Business & startups",
  "Food & cooking",
  "Video & films",
  "Fun",
  "Travel",
  "Education",
  "Other"
];

const ChannelsCategories = () => {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");

  const handleChange = (e) => {
    setCategoryName(e.target.value);
    dispatch(channalCategoryName(e.target.value));
  };

  return (
    <FormControl className="channal-categories">
      <InputLabel id="demo-simple-select-label">Channel Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={categoryName}
        label="Channel Category"
        onChange={(e) => handleChange(e)}
      >
        {CategoriesArr.map((category, index) => (
          <MenuItem key={index + 1} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ChannelsCategories;
