// @ts-nocheck

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js';
import { jwtDecode } from 'jwt-decode';


const poolData = {
  UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

function formatDateForCognito(date) {
  const pad = (n) => String(n).padStart(2, '0');

  const yyyy = date.getUTCFullYear();
  const mm = pad(date.getUTCMonth() + 1); // Months are zero-based
  const dd = pad(date.getUTCDate());
  const hh = pad(date.getUTCHours());
  const min = pad(date.getUTCMinutes());
  const ss = pad(date.getUTCSeconds());

  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss} UTC`;
}

export const authHandler = {
  async register(email, password, attributes = {}) {
    return new Promise((resolve, reject) => {
      const attributeList = Object.entries(attributes).map(([key, value]) => {
        return new CognitoUserAttribute({
          Name: key,
          Value: value
        });
      });

      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  async confirmSignUp(email, code) {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: userPool
      });

      user.confirmRegistration(code, true, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  login(email, password) {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: userPool
      });

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password
      });

      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          const idToken = result.getIdToken().getJwtToken();
          const accessToken = result.getAccessToken().getJwtToken();
          const refreshToken = result.getRefreshToken().getToken();
          const decoded = jwtDecode(idToken);

          // Store tokens
          localStorage.setItem('idToken', idToken);
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          // Format datetime properly
          const formattedDate = formatDateForCognito(new Date());

          // Update custom:last_login
          user.updateAttributes(
            [
              {
                Name: 'custom:lastlogin',
                Value: formattedDate
              }
            ],
            (err, resultAttr) => {
              if (err) {
                console.error('Failed to update custom:last_login:', err);
                // Optionally reject if required: reject(err);
              } else {
                console.log('custom:last_login updated:', resultAttr);
              }

              resolve({ idToken, accessToken, refreshToken, decoded });
            }
          );
        },

        onFailure: (err) => {
          reject(err);
        }
      });
    });
  },

  logout() {
    const user = userPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
    localStorage.clear();
  },

  async changePassword(currentPassword, newPassword) {
    const user = userPool.getCurrentUser();
    if (!user) return Promise.reject("Not authenticated");
    return new Promise((resolve, reject) => {
      user.getSession((err) => {
        if (err) return reject(err);
        user.changePassword(currentPassword, newPassword, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

  async forgotPassword(email) {
    // send your email here?
    const user = new CognitoUser({ Username: email, Pool: userPool });
    return new Promise((resolve, reject) => {
      user.forgotPassword({ onSuccess: resolve, onFailure: reject });
    });
  },

  async confirmPassword(email, code, newPassword) {
    const user = new CognitoUser({ Username: email, Pool: userPool });
    return new Promise((resolve, reject) => {
      user.confirmPassword(code, newPassword, {
        onSuccess: resolve,
        onFailure: reject,
      });
    });
  },

  updateProfileAttributes(attributes) {
    const user = userPool.getCurrentUser();

    if (!user) {
      return Promise.reject(new Error('Not authenticated'));
    }

    return new Promise((resolve, reject) => {
      user.getSession((err, session) => {
        if (err || !session.isValid()) {
          return reject(err || new Error('Session invalid'));
        }

        const attributeList = Object.entries(attributes).map(
            ([key, value]) =>
                new CognitoUserAttribute({
                  Name: key,
                  Value: value,
                })
        );

        user.updateAttributes(attributeList, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

  getCurrentUser() {
    return userPool.getCurrentUser();
  },

  getCurrentUserAttributesMap() {
    return new Promise((resolve, reject) => {
      const user = this.getCurrentUser();
      if (!user) return reject(new Error('No current user'));

      user.getSession((err, session) => {
        if (err || !session.isValid()) {
          return reject(new Error('Invalid session'));
        }

        user.getUserAttributes((err, attributes) => {
          if (err) return reject(err);

          const attrMap = Object.fromEntries(
              attributes.map(attr => [attr.getName(), attr.getValue()])
          );

          resolve({
            username: attrMap['name'] || user.getUsername(),
            email: attrMap['email'] || '',
            role: attrMap['custom:role'] || '',
            kyc: attrMap['custom:kyc'] === 'true',
            raw: attrMap, // Optional: full raw attributes if needed
          });
        });
      });
    });
  },

  getDecodedToken() {
    const token = localStorage.getItem('idToken');
    return token ? jwtDecode(token) : null;
  },

  // Restore user session from local storage
  async restoreSession() {
    return new Promise((resolve, reject) => {
      const user = userPool.getCurrentUser();

      if (!user) return reject(new Error('No current user'));

      user.getSession((err, session) => {
        if (err || !session.isValid()) {
          return reject(err || new Error('Session invalid'));
        }

        const idToken = session.getIdToken().getJwtToken();
        const accessToken = session.getAccessToken().getJwtToken();
        const refreshToken = session.getRefreshToken().getToken();
        const decoded = jwtDecode(idToken);

        localStorage.setItem('idToken', idToken);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        resolve({ idToken, accessToken, refreshToken, decoded });
      });
    });
  },

  getIdToken() {
    return localStorage.getItem('idToken');
  },
};
