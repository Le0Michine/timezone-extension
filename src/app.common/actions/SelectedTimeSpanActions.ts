import { ActionCreator } from "react-redux";
import { Action } from "./Action";
import { TimeSpanInfo } from "../models";
import * as moment from "moment-timezone";

export function changeStartTime(hour: number, minute: number) {
  return {
    type: "SELECTED_TIMESPAN/CHANGE_START_TIME",
    payload: { hour, minute }
  };
}

export function changeStartHour(hour: number) {
  return {
    type: "SELECTED_TIMESPAN/CHANGE_START_HOUR",
    payload: hour
  };
}

export function changeStartMinute(minute: number) {
  return {
    type: "SELECTED_TIMESPAN/CHANGE_START_MINUTE",
    payload: minute
  };
}

export function changeEndTime(hour: number, minute: number) {
  return {
    type: "SELECTED_TIMESPAN/CHANGE_END_TIME",
    payload: { hour, minute }
  };
}

export function changeEndHour(hour: number) {
  return {
    type: "SELECTED_TIMESPAN/CHANGE_END_HOUR",
    payload: hour
  };
}

export function changeEndMinute(minute: number) {
  return {
    type: "SELECTED_TIMESPAN/CHANGE_END_MINUTE",
    payload: minute
  };
}

export function changeSelectedTimeSpan(start: number, end: number): Action<TimeSpanInfo> {
  const startHour = Math.floor(start / 2);
  const startMinute = (start % 2) * 30;
  const endHour = Math.floor(end / 2);
  const endMinute = (end % 2) * 30;
  return {
    type: "SELECTED_TIMESPAN/CHANGE_SELECTED_TIMESPAN",
    payload: { startHour, startMinute, endHour, endMinute }
  };
}