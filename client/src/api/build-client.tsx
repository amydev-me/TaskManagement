import axios from 'axios';

const buildClient = (req?: any) => {
 
    return axios.create({
      baseURL: 'http://localhost:3000',
      withCredentials: true,
    }); 
};

export default buildClient;
