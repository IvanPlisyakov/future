export class BooksApi {
  constructor(data, errorCallback) {
    this._baseUrlGoogleBooks = data.baseUrlGoogleBooks;
    this._headers = data.headers;
    this._key = data.key;
    this._errorCallback = errorCallback;
  }

  _standartErrorThen(res) {
    switch (res.status) {
      case 400:
        this._errorCallback('Validation error');
        return;
      case 401:
        this._errorCallback('User is not authorised');
        return;
      case 404:
        this._errorCallback('Resource not found');
        return;
      case 409:
        this._errorCallback('Server conflict');
        return;
      default:
        this._errorCallback('Error on the server');
        return;
    }
  }

  _standartThen(res) {
    if (Number(res.status) >= 200 && Number(res.status) < 300) {
      return res.json();
    }

    this._standartErrorThen(res);
    return Promise.reject(`Error: ${res.status}`);
  }

  _sendStandartCatch(err) {
    console.log(err);
  }

  getInitialBooks(string, category, sorting, startIndex) {
    return fetch(`${this._baseUrlGoogleBooks}q="${string}"${(category === '') ? '' : '+subject:'+category}&orderBy=${sorting}&printType=books&startIndex=${startIndex}&maxResults=30&key=${this._key}`, {
      method: 'GET',
      headers: {
        ...this._headers,
      },
    })
      .then((response) => this._standartThen(response))
      .catch((err) => this._sendStandartCatch(err));
  }

  getBook(id) {
    return fetch(`https://www.googleapis.com/books/v1/volumes/${id}`, {
      method: 'GET',
      headers: {
        ...this._headers,
      },
    })
      .then((response) => this._standartThen(response))
      .catch((err) => this._sendStandartCatch(err));
  }
}