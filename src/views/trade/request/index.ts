import axios from 'axios';

import type { SuccessResponse } from '@/types/apiResponse';
import type { SearchParams, Response } from '@/views/trade/type';

type _Response = SuccessResponse & Response;

export const getOrderList = (params: Partial<SearchParams>) =>
  axios
    .get<_Response>('/api/getOrderList', {
      params,
    })
    .then((res) => res.data);

export const getOrderListInGame = (params: Partial<SearchParams>) =>
  axios
    .get<_Response>('/api/getOrderListInGame', {
      params,
    })
    .then((res) => res.data);
