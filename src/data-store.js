import axios from "axios";

const rootDir = "https://timeline-backend.vercel.app/";

const user = JSON.parse(localStorage.getItem("user"));

export const config = {
  headers: {
    token: user && user !== null ? user._id : 1234,
  },
};
export async function getData() {
  console.log(user);
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
export async function postTask(datareq) {
  try {
    const { data } = await axios.post(`${rootDir}tasks`, datareq, config);
    if (data) {
      return data;
    } else return {};
  } catch (error) {
    throw new Error("could not create task");
  }
}

export async function putTask(datareq) {
  try {
    const { data } = await axios.put(`${rootDir}tasks`, datareq, config);
    if (data) {
      return;
    } else return {};
  } catch (error) {
    throw new Error("could not update task");
  }
}

export async function deleteTask(datareq) {
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

export async function deleteUser(datareq) {
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
