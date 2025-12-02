export interface ApiErrorDetail {
  msg: string;
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
      errors?: ApiErrorDetail[];
    };
  };
}
