export interface PaginatedApiResponse<T> {
  data: T[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_next_page: boolean;
    has_previous_page: boolean;
  };
  message: string;
  success: boolean;
  timestamp: string;
} 