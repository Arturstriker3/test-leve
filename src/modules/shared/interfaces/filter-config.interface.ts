export interface FilterConfig {
  [key: string]: {
    type: 'string' | 'number' | 'boolean' | 'enum' | 'date';
    allowedValues?: string[] | number[];
    required?: boolean;
    description?: string;
  };
}

export interface FilterResult<T> {
  isValid: boolean;
  data?: T;
  errors?: string[];
} 