export interface PaginationMeta {
  total?: number;
  limit?: number;
  offset?: number;
  page?: number;
  nextPage?: number | null;
  hasNextPage?: boolean;
}

export interface PaginatedResult<T> {
  items: T[];
  meta: PaginationMeta;
}
