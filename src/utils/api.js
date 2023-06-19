
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
  
  export const sendDataToServer = (sessionData, setSessionData, selectedPackage, sessionId) => {
    const cartonIds = selectedPackage.map((item) => item.id);
    const updatedItems = sessionData.order.items.map((item) => ({
      id: item.id,
      status: item.status,
    }));

    // Проверяем, все ли элементы имеют статус "scanned"
  const allItemsScanned = updatedItems.every((item) => item.status === 'scanned');

  // Устанавливаем значение статуса в зависимости от результата проверки
  const sessionStatus = allItemsScanned ? 'closed_success' : 'closed_problem';

    const requestBody = {
      ...sessionData,
      order: {
          items: updatedItems,
          order_id: sessionData.order.order_id,
          selected_carton: cartonIds,
      },
      status: sessionStatus
    };
  
    return fetch(`${BASE_URL}/session/${sessionId}`, {
      method: 'PATCH',
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
  