import Mock from 'mockjs';

import './user';
import './message-box';
import '@/views/workplace/mock';
import '@/views/trade/mock';
import '@/views/agent/mock';

Mock.setup({
  timeout: '600-1000',
});
