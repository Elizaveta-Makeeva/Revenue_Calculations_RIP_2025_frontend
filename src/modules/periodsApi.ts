export interface Period {
  id: number;
  title?: string;
  description?: string;
  duration?: string;
  short_description?: string;
  detailed_description?: string;
  shortdescription?: string;
  detaileddescription?: string;
  img?: string;
  isactive?: boolean;
  is_active?: boolean;
}

export interface PeriodsResult {
  resultCount: number;
  results: Period[];
}


const API_URL = '/api';
export const getPeriodsByQuery = async (query = ''): Promise<PeriodsResult> => {
  const url = query 
    ? `${API_URL}/periods?title=${encodeURIComponent(query)}` 
    : `${API_URL}/periods`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 500);

  try {
    const response = await fetch(url, { 
      signal: controller.signal,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.periods && Array.isArray(data.periods)) {
      return { resultCount: data.periods.length, results: data.periods };
    }
    if (Array.isArray(data)) {
      return { resultCount: data.length, results: data };
    }
    return { resultCount: 0, results: [] };
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export const getPeriodById = async (id: string | number): Promise<Period | null> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1500);

  try {
    const response = await fetch(`${API_URL}/periods/${id}`, { 
      signal: controller.signal,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.period || data;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};