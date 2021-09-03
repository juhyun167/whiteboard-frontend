import axios, { AxiosResponse, AxiosError } from "axios";

interface CustomResponse {
  success: boolean;
  status: number | undefined;
  statusText: string | undefined;
  data: any;
}

const axiosInstance = axios.create({
  timeout: 1000,
  withCredentials: true,
});

/* Account service */

const handleResponse = (response: AxiosResponse): CustomResponse => {
  return {
    success: true,
    status: response.status,
    statusText: response.statusText,
    data: response.data,
  };
};

const handleError = (error: AxiosError): CustomResponse => {
  const result: CustomResponse = {
    success: false,
    status: undefined,
    statusText: undefined,
    data: undefined,
  };
  if (error.response) {
    result.status = error.response.status;
    result.statusText = error.response.statusText;
    result.data = error.response.data;
  }
  return result;
};

const login = async (
  username: string,
  password: string
): Promise<CustomResponse> => {
  try {
    const response = await axiosInstance.post("/api/auth/login", {
      username,
      password,
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const logout = async (): Promise<CustomResponse> => {
  try {
    const response = await axiosInstance.post("/api/auth/logout");
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const register = async (
  displayName: string,
  username: string,
  password: string
): Promise<CustomResponse> => {
  try {
    const response = await axiosInstance.post("/api/user", {
      displayName,
      username,
      password,
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

/* Study service */

const getAllStudyList = async (): Promise<CustomResponse> => {
  try {
    const response = await axiosInstance.get("/api/study");
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const getMyStudyList = async (uid: number): Promise<CustomResponse> => {
  try {
    const response = await axiosInstance.get("/api/student", {
      params: {
        userId: uid,
      },
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const enrollStudy = async (studyId: number): Promise<CustomResponse> => {
  try {
    const response = await axiosInstance.post("/api/student", {
      studyId,
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const unrollStudy = async (
  studyId: number,
  uid: number
): Promise<CustomResponse> => {
  try {
    const response = await axiosInstance.delete("/api/student", {
      data: {
        studyId,
        userId: uid,
      },
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const service = {
  login,
  logout,
  register,

  getAllStudyList,
  getMyStudyList,
  enrollStudy,
  unrollStudy,
};
