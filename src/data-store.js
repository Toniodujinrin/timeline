import axios from "axios";

import React from "react";

const rootDir = "https://timeline-backend.vercel.app/";

export async function getData(user) {
  const config = {
    headers: {
      token: user && user !== null ? user._id : 1234,
    },
  };
  try {
    const { data } = await axios.get(
      `${rootDir}users?email=${user.userEmail}`,
      config
    );
    console.log(`this is the data `);

    if (data) {
      return data;
    } else return {};
  } catch (error) {
    throw new Error("could not get data from the server");
  }
}
export async function postTask(datareq, user) {
  const config = {
    headers: {
      token: user && user !== null ? user._id : 1234,
    },
  };
  try {
    const { data } = await axios.post(`${rootDir}tasks`, datareq, config);
    if (data) {
      return data;
    } else return {};
  } catch (error) {
    throw new Error("could not create task");
  }
}

export async function putTask(datareq, user) {
  const config = {
    headers: {
      token: user && user !== null ? user._id : 1234,
    },
  };
  try {
    const { data } = await axios.put(`${rootDir}tasks`, datareq, config);
    if (data) {
      return;
    } else return {};
  } catch (error) {
    throw new Error("could not update task");
  }
}

export async function deleteTask(datareq, user) {
  const config = {
    headers: {
      token: user && user !== null ? user._id : 1234,
    },
  };
  try {
    const { data } = await axios.delete(
      `${rootDir}tasks?task=${datareq}`,
      config
    );
    if (data) {
      return data;
    } else return {};
  } catch (error) {
    throw new Error("error occured deleting task");
  }
}

export async function deleteUser(datareq, user) {
  const config = {
    headers: {
      token: user && user !== null ? user._id : 1234,
    },
  };
  try {
    const { data } = await axios.delete(
      `${rootDir}users?email=${datareq}`,
      config
    );
    if (data) {
      return data;
    } else return {};
  } catch (error) {
    throw new Error("error occured deleting user");
  }
}
