import axios from "axios";

export const getUsersList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`
      )
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const postNewUser = (user) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`,
        user
      )
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const putEditedUser = (id, user) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${id}`,
        user
      )
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(
        `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${id}`
      )
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
