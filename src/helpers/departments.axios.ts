import axios from 'axios';

export const getNpData = async (
  cityName: string = '',
  page: string = '1',
  id: string = '',
): Promise<any> => {
  const data = await axios.post(`https://api.novaposhta.ua/v2.0/json/`, {
    modelName: 'Address',
    calledMethod: 'getWarehouses',
    methodProperties: {
      CityName: cityName,
      Page: page,
      Limit: '20',
      WarehouseId: id,
    },
  });

  return data.data;
};
