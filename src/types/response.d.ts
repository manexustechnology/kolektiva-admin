export interface ResponseData<T> {
  data: T;
  statusCode: number;
  message: string;
}

export interface ResponseDataPagination<T> extends ResponseData {
  data: {
    data: T;
    meta: PaginationMeta;
  };
}

export interface PaginationMeta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
}
