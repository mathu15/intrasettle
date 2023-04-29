import { useState } from 'react';

class useToken {

//  const [token, setToken] = useState(this.getToken());

  getToken = () => {

    const tokenString = localStorage.getItem('token');

    const userToken = JSON.parse(tokenString);

    return userToken?.token

  }

  getUser = () => {

    const tokenString = localStorage.getItem('token');

    const userToken = JSON.parse(tokenString);

    return userToken?.user

  }



  saveToken = (userToken) => {

    localStorage.setItem('token', JSON.stringify(userToken));

    //setToken(userToken.token);

  }
}

export { useToken }; 

