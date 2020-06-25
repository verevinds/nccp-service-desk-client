import axios, { AxiosResponse } from 'axios';

interface IResponse {
  config: {
    url: string;
    method: string;
    data: FormData;
    headers: { Accept: string };
    maxContentLength: number;
    timeout: number;
    transformRequest: [() => void];
    transformResponse: [() => void];
    validateStatus: () => void;
    xsrfCookieName: string;
    xsrfHeaderName: string;
  };
  data: { message: string; url: string; filename: string };
  headers: { 'content-length': number; 'content-type': string };
  request: {};
  status: number;
  statusText: string;
}
const fileUpload = async (
  file: string | Blob,
  onSuccess?: (response: AxiosResponse<IResponse>) => void,
  onFailure?: (error: any) => void,
) => {
  let statusUpload;
  const data = new FormData();
  let PORT = window.location.protocol === 'http:' ? '8080' : '8433';
  data.append('file', file);
  statusUpload = await axios
    .post(`${window.location.protocol}//srv-sdesk.c31.nccp.ru:${PORT}/api/upload`, data)
    .then((response: AxiosResponse<IResponse>) => {
      !!onSuccess ? onSuccess(response) : console.log(response);
      if (response.statusText === 'OK') {
        return response;
      }
    })
    .catch((error) => {
      !!onFailure ? onFailure(error) : console.log(error.message);
      return error.message;
    });

  return statusUpload;
};

export { fileUpload };
