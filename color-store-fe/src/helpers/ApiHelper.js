const API_HOST = 'http://192.168.178.20:8080';

const ApiHelper = {
  getConfig: async () => {
    return (await fetch(API_HOST + '/config')).json();
  },
  getUser: async (id) => {
    return (await fetch(API_HOST + '/users/' + id)).json();
  },
  updateUser: async (user) => {
    await fetch(API_HOST + '/users/' + user.id, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
  },
  getColors: async () => {
    return (await fetch(API_HOST + '/colors')).json();
  }
};

export default ApiHelper;
