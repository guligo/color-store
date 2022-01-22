const ApiHelper = {
  getConfig: async () => {
    return (await fetch(process.env.REACT_APP_API_URI + '/config')).json();
  },
  getUser: async (id) => {
    return (await fetch(process.env.REACT_APP_API_URI + '/users/' + id)).json();
  },
  updateUser: async (user) => {
    try {
      let response = await fetch(process.env.REACT_APP_API_URI + '/users/' + user.id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });

      if (response.status !== 200) {
        let body = await response.json();
        throw new Error(body.message);
      }
    } catch (err) {
      throw err;
    }
  },
  getColors: async () => {
    return (await fetch(process.env.REACT_APP_API_URI + '/colors')).json();
  }
};

export default ApiHelper;
