import Mock from 'mockjs';
import qs from 'query-string';
import dayjs from 'dayjs';
import { GetParams } from '@/types/global';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';

const dataList = {
  level2: [
    {
      id: 1,
      invId: 982277661,
      address: '0x111111111111111111111111111111',
      level: 2,
    },
    {
      id: 2,
      invId: 9877333662,
      address: '0x22222222222222222222222222222',
      level: 2,
    },
    {
      id: 3,
      invId: 9833377663,
      address: '0x3333333333333333333333333333333',
      level: 2,
    },
    {
      id: 4,
      invId: 9811177664,
      address: '0x444444444444444444444444444444',
      level: 2,
    },
    {
      id: 5,
      invId: 98722227665,
      address: '0x55555555555555555555555555555555',
      level: 2,
    },
  ],
  level3: [
    {
      id: 1,
      invId: 9822776611,
      address: '0x111111111111111111111111111111b',
      level: 3,
    },
    {
      id: 2,
      invId: 98773336622,
      address: '0x22222222222222222222222222222b',
      level: 3,
    },
    {
      id: 3,
      invId: 98333776633,
      address: '0x3333333333333333333333333333333b',
      level: 3,
    },
    {
      id: 4,
      invId: 98111776644,
      address: '0x444444444444444444444444444444b',
      level: 3,
    },
    {
      id: 5,
      invId: 987222276655,
      address: '0x55555555555555555555555555555555b',
      level: 3,
    },
    {
      id: 6,
      invId: 987222276666,
      address: '0x66666666666666666666666666666666b',
      level: 3,
    },
  ],
  level4: [
    {
      id: 1,
      invId: 98227766111,
      address: '0x111111111111111111111111111111c',
      level: 4,
    },
    {
      id: 2,
      invId: 987733366222,
      address: '0x22222222222222222222222222222c',
      level: 4,
    },
    {
      id: 3,
      invId: 983337766333,
      address: '0x3333333333333333333333333333333c',
      level: 4,
    },
    {
      id: 4,
      invId: 981117766444,
      address: '0x444444444444444444444444444444c',
      level: 4,
    },
    {
      id: 5,
      invId: 9872222766555,
      address: '0x55555555555555555555555555555555c',
      level: 4,
    },
  ],
};

const newNode = {
  id: 9,
  invId: 999999999999,
  address: '0xswd23333333333333331098765543ww33333',
  level: 2,
};

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/mock/tree/list'), () => {
      return successResponseWrap(dataList);
    });
    Mock.mock(new RegExp('/api/mock/tree/add'), () => {
      return successResponseWrap(newNode);
    });
    Mock.mock(new RegExp('/api/mock/tree/more'), () => {
      return successResponseWrap(dataList.level3);
    });
  },
});
