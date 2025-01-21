import { Method } from 'axios';
import React, { useState } from 'react';
import buildClient from '../api/build-client';


interface UseRequestProps {
  url: string;  
  method: Method; // HTTP method (get, post, put, etc.)
  body?: object; // Request body
  onSuccess?: (data: any) => void;
}

interface ErrorResponse {
  message: string; // Error message
}


const useRequest = ({ url, method, body, onSuccess }: UseRequestProps) => {
  const [errors, setErrors] = useState<React.ReactNode | null>(null);

  const doRequest = async (props: object = {}) => {
    try {
      setErrors(null);
      const client = buildClient();
      const response = await client.request({
        url,
        method,
        data: { ...body, ...props },
      });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err: any) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oops.....</h4>
          <ul className="my-0">
            {err.response?.data?.errors?.map((error: ErrorResponse) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
