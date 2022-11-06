import axios from "axios";

const user =
  typeof localStorage.getItem("user") == "string" &&
  localStorage.getItem("user").length !== 0
    ? JSON.parse(localStorage.getItem("user"))
    : null;

export const config = {
  headers: {
    token: user && user !== null ? user._id : 1234,
  },
};
export async function getData() {
  try {
    const { data } = await axios.get(
      `http://127.0.0.1:3200/users?email=${user.userEmail}`,
      config
    );
    console.log(`this is the data `);

    if (data) {
      return data;
    } else return {};
  } catch (error) {
    console.log(error);
  }
}
export async function postTask(datareq) {
  try {
    const { data } = await axios.post(
      `http://127.0.0.1:3200/tasks`,
      datareq,
      config
    );
    if (data) {
      return data;
    } else return {};
  } catch (error) {
    console.log(error);
  }
}

export async function putTask(datareq) {
  try {
    const { data } = await axios.put(
      `http://127.0.0.1:3200/tasks`,
      datareq,
      config
    );
    if (data) {
      return;
    } else return {};
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTask(datareq) {
  try {
    const { data } = await axios.delete(
      `http://127.0.0.1:3200/tasks?task=${datareq}`,
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
      `http://127.0.0.1:3200/user?email=${datareq}`,
      config
    );
    if (data) {
      return data;
    } else return {};
  } catch (error) {
    throw new Error("error occured deleting user");
  }
}
