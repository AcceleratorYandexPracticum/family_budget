import { setCookie, getCookie, deleteCookie } from './cookies';

const baseUrl = 'https://familybudget.ddns.net/api';
const defaultHeaders = {
  'Content-Type': 'application/json',
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.detail || 'Request failed');
  }

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();
  return data;
};

const request = async (url, options) => {
  try {
    const response = await fetch(url, options);
    return handleResponse(response);
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
};

// регистрация
export const registerUserAPI = async (userData) => {
  const url = `${baseUrl}/users/`;
  const options = {
    method: 'POST',
    headers: {
      ...defaultHeaders,
    },
    body: JSON.stringify(userData),
  };

  return request(url, options);
};

// авторизация
export const loginUserAPI = async (userData) => {
  const url = `${baseUrl}/auth/token/login/`;
  const options = {
    method: 'POST',
    headers: {
      ...defaultHeaders,
    },
    body: JSON.stringify(userData),
  };

  const data = await request(url, options);

  if (data && data.auth_token) {
    setCookie('token', data.auth_token);
  }
  return data;
};

// выход
export const logoutUserAPI = async () => {
  const url = `${baseUrl}/auth/token/logout/`;
  const options = {
    method: 'POST',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
  };

  try {
    await request(url, options);
    deleteCookie('token');
  } catch (error) {
    throw new Error(`Logout failed: ${error.message}`);
  }
};

// данные пользователя
export const getUserAPI = async () => {
  const url = `${baseUrl}/users/me/`;
  const options = {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
  };
  const data = await request(url, options);
  return data;
};

// изменение данных пользователя
export const updateUserAPI = async (userData) => {
  const url = `${baseUrl}/users/me/`;
  const options = {
    method: 'PATCH',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
    body: JSON.stringify(userData),
  };

  const data = await request(url, options);
  return data;
};

// удаление профиля
export const deleteUserAPI = async () => {
  const url = `${baseUrl}/users/me/`;
  const options = {
    method: 'DELETE',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
  };

  try {
    await request(url, options);
    deleteCookie('token');
  } catch (error) {
    throw new Error(`Delete user failed: ${error.message}`);
  }
};

// получение счетов пользователя
export const getUserFinanceAPI = async () => {
  const url = `${baseUrl}/finance/`;
  const options = {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
  };
  const data = await request(url, options);
  return data;
};

// получение доступных для создания счетов
export const getFinanceOptionsAPI = async () => {
  const url = `${baseUrl}/finance/handbook/`;
  const options = {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
  };
  const data = await request(url, options);
  return data;
};

// получение категорий пользователя
export const getUserCategoriesAPI = async () => {
  const url = `${baseUrl}/category/`;
  const options = {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
  };
  const data = await request(url, options);
  return data;
};

// получение иконок для создания новой категории

export const getCategoryIconsAPI = async () => {
  const url = `${baseUrl}/category/icons/?limit=100`;
  const options = {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
  };
  const data = await request(url, options);
  return data;
};

// получение списка транзакций
export const getTransactionListAPI = async () => {
  const url = `${baseUrl}/transaction/`;
  const options = {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
  };
  const data = await request(url, options);
  return data;
};

// добавление транзакции
export const addTransactionAPI = async (formData) => {
  const url = `${baseUrl}/transaction/`;
  const options = {
    method: 'POST',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
    body: JSON.stringify(formData),
  };

  const data = await request(url, options);
  return data;
};

// удлаение транзакции
export const deleteTransactionAPI = async (id) => {
  const url = `${baseUrl}/transaction/${id}/`;
  const options = {
    method: 'DELETE',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
  };

  try {
    await request(url, options);
  } catch (error) {
    throw new Error(`Delete transaction failed: ${error.message}`);
  }
};

// редактирование транзакции
export const editTransactionAPI = async (id, formData) => {
  const url = `${baseUrl}/transaction/${id}/`;
  const options = {
    method: 'PATCH',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
    body: JSON.stringify(formData),
  };

  const data = await request(url, options);
  return data;
};

// получение копилок пользователя
export const getMoneyboxAPI = async () => {
  const url = `${baseUrl}/moneybox/`;
  const options = {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
  };
  const data = await request(url, options);
  return data;
};

// добавление новой копилки
export const addMoneyboxAPI = async (formData) => {
  const url = `${baseUrl}/moneybox/`;
  const options = {
    method: 'POST',
    headers: {
      ...defaultHeaders,
      authorization: `Token ${getCookie('token')}`,
    },
    body: JSON.stringify(formData),
  };

  const data = await request(url, options);
  return data;
};
