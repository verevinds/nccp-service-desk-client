useEffect(() => {
  // axios
  //   .get('http://api.nccp-eng.ru/', {
  //     params: {
  //       method: 'users.get',
  //     },
  //   })
  //   .then(function (response) {
  //     let newResponse;
  //     for (let key in response.data) {
  //       // let key = 81251;
  //       let data = {
  //         number: key,
  //         positionId: response.data[key].job,
  //         departmentId: response.data[key].team,
  //         fired: response.data[key].fired,
  //         sex: response.data[key].sex,
  //         name1: response.data[key].name1,
  //         name2: response.data[key].name2,
  //         name3: response.data[key].name3,
  //         phone1: response.data[key].phone1,
  //         phone2: response.data[key].phone2,
  //         email: response.data[key].email,
  //         exmail: response.data[key].exmail,
  //         computer: response.data[key].computer,
  //         login: response.data[key].login,
  //         dob: response.data[key].dob,
  //         level: null,
  //         photo: response.data[key].photo,
  //       };
  //       axios
  //         .post(`http://192.168.214.106:8080/api/users`, data)
  //         .then((res) => {
  //           console.log(`${key} загружен`);
  //         })
  //         .catch((err) => {
  //           console.log(err.message);
  //         });
  //       console.log(key, data); // John, затем 30
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
}, []);
useEffect(() => {
  // axios
  //   .get('http://api.nccp-eng.ru/', {
  //     params: {
  //       method: 'jobs.get',
  //     },
  //   })
  //   .then(function (response) {
  //     let newResponse;
  //     for (let key in response.data) {
  //       let data = {
  //         id: key,
  //         name: response.data[key].name,
  //         level: 0,
  //       };
  //       axios
  //         .post(`http://192.168.214.106:8080/api/positions`, data)
  //         .then((res) => {
  //           console.log(`${key} загружен`);
  //         })
  //         .catch((err) => {
  //           console.log(err.message);
  //         });
  //       console.log(key, data); // John, затем 30
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
}, []);

useEffect(() => {
  // axios
  //   .get('http://api.nccp-eng.ru/', {
  //     params: {
  //       method: 'teams.get',
  //     },
  //   })
  //   .then(function (response) {
  //     let newResponse;
  //     for (let key in response.data) {
  //       let data = {
  //         id: key,
  //         name: response.data[key].name,
  //       };
  //       axios
  //         .post(`http://192.168.214.106:8080/api/departments`, data)
  //         .then((res) => {
  //           console.log(`${key} загружен`);
  //         })
  //         .catch((err) => {
  //           console.log(err.message);
  //         });
  //       console.log(key, response.data[key]); // John, затем 30
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
}, []);
