import axios from 'axios';
import type { ContentDataRecord, PopularRecord } from '@/views/workplace/type';

export function queryContentData() {
  return axios
    .get<{ data: ContentDataRecord[] }>('/api/mock/content-data')
    .then((res) => res.data);
}

export function queryTreeDate() {
  return axios
    .get<{ data: any }>('/api/mock/tree/list')
    .then((res) => res.data);
}

export function addTreeDate() {
  return axios.get<{ data: any }>('/api/mock/tree/add').then((res) => res.data);
}

export function queryMore() {
  return axios
    .get<{ data: any }>('/api/mock/tree/more')
    .then((res) => res.data);
}
export function queryMoreTable() {
  return axios
    .get<{ data: any }>('/api/mock/tree/table')
    .then((res) => res.data);
}
export function addTableDate() {
  return axios.get<{ data: any }>('/api/mock/tree/jiatable').then((res) => res.data);
}
