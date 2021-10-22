export class Http {
  static HEADERS = {'Content-TYPE': 'application/json'};

  static async get(url: string) {
    try {
      return await request(url);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async post(url: string, data: DataType = {} as DataType) {
    try {
      return await request(url, 'POST', data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async delete(url: string) {
    try {
      return await request(url, 'DELETE');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async patch(url: string, data: DataType = {} as DataType) {
    try {
      return await request(url, 'PATCH', data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

type ConfigType = {
  method: string
  headers: { [key: string]: string }
  body?: string
}

type DataType = {
  title: string
}

const request = async (url: string, method: string = 'GET', data?: DataType) => {
  const config: ConfigType = {
    method,
    headers: Http.HEADERS
  };

  if (method === 'POST' || method === 'PATCH') {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);
  return await response.json();
};
