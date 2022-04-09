import Mock from 'mockjs';
import qs from 'query-string';
import setupMock, { successResponseInLabs } from '@/utils/setup-mock';
import { GetParams } from '@/types/global';

const mockData = Mock.mock({
  'list|100': [
    {
      'id|+1': 1,
      'txhash': /0x[0-9a-z]{64}/,
      'state': null,
      'bigNumber': '@integer(20000, 40000)',
      'timeStamp': new Date().getTime() / 1000,
      'fromBadge': /0x[1-9][0-9a-z]{39}/,
      'toBadge': /0x[1-9][0-9a-z]{39}/,
      'price': '@integer(1, 1000)',
      'indexBadge': null,
      'inputAccount': /0x[1-9][0-9a-z]{39}/,
      'inputId': '@integer(1, 100)',
      'inputAmount': '@integer(1, 100)',
      'delect': null,
    },
  ],
});

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/getOrderList'), (params: GetParams) => {
      const { startPage = 1, size = 10 } = qs.parseUrl(params.url).query;
      const p = startPage as number;
      const s = size as number;
      return successResponseInLabs({
        list: mockData.list.slice((p - 1) * s, p * s),
        total: mockData.list.length,
      });
    });
    Mock.mock(new RegExp('/api/getOrderListInGame'), (params: GetParams) => {
      const { startPage = 1, size = 10 } = qs.parseUrl(params.url).query;
      const p = startPage as number;
      const s = size as number;
      return successResponseInLabs({
        list: mockData.list.slice((p - 1) * s, p * s),
        total: mockData.list.length,
      });
    });
  },
});
