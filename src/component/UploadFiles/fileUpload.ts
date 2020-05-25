import axios from 'axios';

const fileUpload = (file: any, onSuccess: any, onFailure: any) => {
  const data = new FormData();
  data.append('file', file);
  axios
    .post('http://192.168.213.77:8080/upload', data)
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      onFailure(error);
    });
};

export { fileUpload };
