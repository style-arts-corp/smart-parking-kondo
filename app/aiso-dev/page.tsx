"use client";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Image from "next/image";
import { useState } from "react";

function hourMenuItems() {
  // const hourMenuItems = () => {
  const items = [];

  for (let i = 0; i < 24; i++) {
    items.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }
  return items;
}

const minuteMenuItems = () => {
  const items = [];
  for (let i = 0; i < 60; i++) {
    items.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }
  return items;
};

export default function Home() {
  const [hasStarted, setStarted] = useState(false);
  const [hour, setHour] = useState(9);
  const [minute, setMinute] = useState(6);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-100">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 text-4xl flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          スマートパーキング
        </p>
      </div>
      <div>
        <p className="text-lg">入庫時間</p>
      </div>
      <div>
        <Stack direction="row" alignItems="center">
          {/*
            MUI Select を使っています
            参照： https://mui.com/material-ui/react-select/#basic-select
          */}
          <FormControl>
            <InputLabel id="begin-hour">時</InputLabel>
            <Select
              labelId="begin-hour"
              id="begin-hour"
              value={hour}
              label="Hour"
              onChange={(event) => {
                console.log(event.target.value);
                setHour(Number(event.target.value));
              }}
            >
              {hourMenuItems().map((v) => v)}
            </Select>
          </FormControl>
          時
          <FormControl>
            <InputLabel id="begin-hour">分</InputLabel>
            <Select
              labelId="begin-hour"
              id="begin-hour"
              value={30}
              label="Age"
              // onChange={handleChange}
            >
              {minuteMenuItems().map((v) => v)}
            </Select>
          </FormControl>
          分
        </Stack>
      </div>
      {hasStarted === false && (
        <div>
          <p className="text-3xl">決定</p>
          {/*
            MUI Button を使っています
            参照： https://mui.com/material-ui/react-button/
          */}
          <Button variant="contained" onClick={() => setStarted(true)}>
            決定
          </Button>
        </div>
      )}
      {hasStarted && <>何かを表示する</>}

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}
