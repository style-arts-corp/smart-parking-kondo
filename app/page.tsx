"use client";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Image from "next/image";
import { useState } from "react";
import dayjs from "dayjs";

const yearMenuItems = () => {
  const items = [];
  for (let i = 2022; i <= 2073; i++) {
    items.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }
  return items;
};

const monthMenuItems = () => {
  const items = [];
  for (let i = 1; i <= 12; i++) {
    items.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }
  return items;
};

const dayMenuItems = () => {
  const items = [];
  for (let i = 1; i < 31; i++) {
    items.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }
  return items;
};

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
// 引数がlet形なら、引数に値を代入すればmainにも反映されますか？
// => 反映されないですね。ブロックスコープのため
// ref: https://jsprimer.net/basic/function-scope/
//
// const calcPrice = (hikisu1, hikisu2, ...) => {
// return 0;
// }

const calcPrice = (
  diffMinutes: number,
  currentHour: number,
  startHour: number
) => {
  if (diffMinutes < 30) return 0;

  let money = 700 * Math.floor(diffMinutes / 1440);
  let a = diffMinutes % 1440;
  if (a >= 120) money += 700;

  while (a < 120) {
    a -= 30;
    money += 150;
    if (a < 0) break;
  }

  if (money <= 700 && money > 500) {
    if (currentHour >= 16 && currentHour <= 8) {
      if (startHour >= 16 && startHour <= 8) return 500;
    }
  }
  return money;
};

export default function Home() {
  const [hasStarted, setStarted] = useState(false);
  const [year, setYear] = useState(2023);
  const [month, setMonth] = useState(9);
  const [date, setDate] = useState(6);
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(30);

  let StartMinutes = 0,
    money = 0,
    iHour = 0,
    i,
    nextMoney = 0;
  const dateNow = dayjs(`2023-09-07 00:00:00`);
  const dateBegin = dayjs(`${year}-${month}-${date} ${hour}:${minute}:00`);

  const diffMinutes = dateNow.diff(dateBegin, "minute");
  // StartMinutes = console.log(day1.format());

  money = calcPrice(diffMinutes, dateNow.hour(), hour);

  for (i = 0; ; i++) {
    nextMoney = calcPrice(diffMinutes + i, dateNow.hour(), hour);
    if (money !== nextMoney) break;
  }

  iHour = Math.floor(i / 60);
  i = i - iHour * 60;

  console.log(hour);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0">
      <div className="z-12 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 text-4xl flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          スマートパーキング
        </p>
      </div>
      <div>
        <p className="text-2xl">入庫時間</p>
      </div>
      {hasStarted === false && (
        <>
          <div>
            <Stack direction="row" alignItems="center">
              <FormControl>
                <InputLabel id="begin-year">year</InputLabel>
                <Select
                  labelId="begin-year"
                  id="begin-year"
                  value={year}
                  label="year"
                  onChange={(event) => {
                    setYear(Number(event.target.value));
                  }}
                >
                  {yearMenuItems().map((v) => v)}
                </Select>
              </FormControl>
              <p className="mx-1 text-3xl">年</p>{" "}
              <FormControl>
                <InputLabel id="begin-month">month</InputLabel>
                <Select
                  labelId="begin-month"
                  id="begin-month"
                  value={month}
                  label="month"
                  onChange={(event) => {
                    setMonth(Number(event.target.value));
                  }}
                >
                  {monthMenuItems().map((v) => v)}
                </Select>
              </FormControl>
              <p className="mx-1 text-3xl">月</p>{" "}
              <FormControl>
                <InputLabel id="begin-day">day</InputLabel>
                <Select
                  labelId="begin-day"
                  id="begin-day"
                  value={date}
                  label="day"
                  onChange={(event) => {
                    setDate(Number(event.target.value));
                  }}
                >
                  {dayMenuItems().map((v) => v)}
                </Select>
              </FormControl>
              <p className="mx-1 text-3xl">日</p>
            </Stack>
          </div>
          <div>
            <Stack direction="row" alignItems="center">
              <FormControl>
                <InputLabel id="begin-hour">hour</InputLabel>
                <Select
                  labelId="begin-hour"
                  id="begin-hour"
                  value={hour}
                  label="hour"
                  onChange={(event) => {
                    setHour(Number(event.target.value));
                  }}
                >
                  {hourMenuItems().map((v) => v)}
                </Select>
              </FormControl>
              <p className="mx-3 text-3xl">時</p>
              <FormControl>
                <InputLabel id="begin-hour">minute</InputLabel>
                <Select
                  labelId="begin-hour"
                  id="begin-hour"
                  value={minute}
                  label="minute"
                  onChange={(event) => {
                    setMinute(Number(event.target.value));
                  }}
                >
                  {minuteMenuItems().map((v) => v)}
                </Select>
              </FormControl>
              <p className="mx-3 text-3xl">分</p>
            </Stack>
          </div>

          <div>
            <Button
              variant="outlined"
              color="success"
              onClick={() => setStarted(true)}
            >
              <p className="text-3xl">決定</p>
            </Button>
          </div>
        </>
      )}
      {hasStarted && (
        <>
          <div>
            <Stack direction="row" alignItems="center">
              <p className="text-2xl mx-12">現在の料金</p>
              <Button
                variant="outlined"
                color="success"
                onClick={() => setStarted(false)}
              >
                <p className="text-xl">RESET</p>
              </Button>
            </Stack>
          </div>
          <div>
            <p className="text-5xl">{money}円</p>
          </div>
          <div>
            <p className="text-base">次に料金が上がる時間は</p>
          </div>
          <div>
            <p className="text-base">
              {iHour}時間{i}分後に
            </p>
          </div>
          <div>
            <p className="text-base">{nextMoney}円になります</p>
          </div>
        </>
      )}

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}
