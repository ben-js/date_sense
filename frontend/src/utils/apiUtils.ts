import { logger } from './logger';
import { API_CONFIG } from '@/constants';

// API 요청 기본 설정
const getDefaultHeaders = (userId?: string) => ({
  'Content-Type': 'application/json',
  ...(userId && { 'userid': userId }),
});

// API 응답 타입
interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

// API 요청 함수 (GET)
export const apiGet = async <T = any>(url: string, params?: Record<string, any>, userId?: string): Promise<T> => {
  const fullUrl = params 
    ? `${API_CONFIG.BASE_URL}${url}?${new URLSearchParams(params).toString()}`
    : `${API_CONFIG.BASE_URL}${url}`;

  try {
    logger.api.request('GET', fullUrl);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: getDefaultHeaders(userId),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    const result: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.message || `HTTP ${response.status}`);
    }

    logger.api.response('GET', fullUrl, result);
    return (result.data || result) as T;
  } catch (error) {
    logger.api.error('GET', fullUrl, error);
    throw error;
  }
};

// API 요청 함수 (POST)
export const apiPost = async <T = any>(url: string, data?: any, userId?: string): Promise<T> => {
  const fullUrl = `${API_CONFIG.BASE_URL}${url}`;

  try {
    logger.api.request('POST', fullUrl, data);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
    
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: getDefaultHeaders(userId),
      body: data ? JSON.stringify(data) : undefined,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    const result: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.message || `HTTP ${response.status}`);
    }

    logger.api.response('POST', fullUrl, result);
    return (result.data || result) as T;
  } catch (error) {
    logger.api.error('POST', fullUrl, error);
    throw error;
  }
};

// API 요청 함수 (PUT)
export const apiPut = async <T = any>(url: string, data?: any, userId?: string): Promise<T> => {
  const fullUrl = `${API_CONFIG.BASE_URL}${url}`;

  try {
    logger.api.request('PUT', fullUrl, data);
    
    const response = await fetch(fullUrl, {
      method: 'PUT',
      headers: getDefaultHeaders(userId),
      body: data ? JSON.stringify(data) : undefined,
    });

    const result: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.message || `HTTP ${response.status}`);
    }

    logger.api.response('PUT', fullUrl, result);
    return (result.data || result) as T;
  } catch (error) {
    logger.api.error('PUT', fullUrl, error);
    throw error;
  }
};

// API 요청 함수 (DELETE)
export const apiDelete = async <T = any>(url: string, userId?: string): Promise<T> => {
  const fullUrl = `${API_CONFIG.BASE_URL}${url}`;

  try {
    logger.api.request('DELETE', fullUrl);
    
    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers: getDefaultHeaders(userId),
    });

    const result: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.message || `HTTP ${response.status}`);
    }

    logger.api.response('DELETE', fullUrl, result);
    return (result.data || result) as T;
  } catch (error) {
    logger.api.error('DELETE', fullUrl, error);
    throw error;
  }
};

// 파일 업로드 함수
export const apiUpload = async <T = any>(url: string, file: File, onProgress?: (progress: number) => void, userId?: string): Promise<T> => {
  const fullUrl = `${API_CONFIG.BASE_URL}${url}`;
  const formData = new FormData();
  formData.append('file', file);

  try {
    logger.api.request('UPLOAD', fullUrl, { fileName: file.name, fileSize: file.size });
    
    const response = await fetch(fullUrl, {
      method: 'POST',
      body: formData,
      headers: {
        // Content-Type은 자동으로 설정됨 (multipart/form-data)
        ...(userId && { 'userid': userId }),
      },
    });

    const result: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.message || `HTTP ${response.status}`);
    }

    logger.api.response('UPLOAD', fullUrl, result);
    return (result.data || result) as T;
  } catch (error) {
    logger.api.error('UPLOAD', fullUrl, error);
    throw error;
  }
}; 