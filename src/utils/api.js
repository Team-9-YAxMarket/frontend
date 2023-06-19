
const BASE_URL = 'http://ivr.sytes.net:9009/api/v1';

export const fetchDataFromServer = (userId, setSessionData) => {
    return fetch(`${BASE_URL}/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка получения данных с сервера');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Данные успешно получены:', data);
        setSessionData(data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  export const fetchCarton = (setCartons) => {
    return fetch(`${BASE_URL}/carton`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCartons(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  export const sendDataToServer = (sessionData, setSessionData, selectedPackage) => {
    const cartonIds = selectedPackage.map((item) => item.id);
    const updatedItems = sessionData.order.items.map((item) => ({
      id: item.id,
      status: item.status,
    }));
    const requestBody = {
      ...sessionData,
      order: {
        items: updatedItems,
        selected_carton: cartonIds,
      },
    };
  
    return fetch(`${BASE_URL}/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка выполнения запроса');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Данные успешно отправлены', data);
        setSessionData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  