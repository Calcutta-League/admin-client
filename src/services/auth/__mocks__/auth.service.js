
export const signIn = jest.fn(() => {
  return Promise.resolve({ token: 'dummy_token' });
});

export const signOut = jest.fn(() => {
  return Promise.resolve({ status: 200 });
});

export const getCurrentSession = jest.fn(() => {
  console.log('this is the mocked func');
  return Promise.resolve({
    idToken: {
      jwtToken: 'dummy_token'
    }
  });
});