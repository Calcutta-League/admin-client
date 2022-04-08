import { Auth } from '@aws-amplify/auth';

export function signIn(email, password) {
  return new Promise((resolve, reject) => {
    Auth.signIn({
      username: email,
      password: password
    }).then(response => {
      return getCurrentSession();
    }).then(session => {
      resolve({ token: session.idToken.jwtToken });
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  });
}

export function signOut() {
  return new Promise((resolve, reject) => {
    Auth.signOut().then(response => {
      console.log(response);
      resolve(response);
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  });
}

export function getCurrentSession() {
  return new Promise((resolve, reject) => {
    Auth.currentSession().then(session => {
      resolve(session);
    }).catch(error => {
      reject(error);
    });
  });
}