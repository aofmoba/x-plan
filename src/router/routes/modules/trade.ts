export default {
  path: 'trade',
  name: 'trade',
  component: () => import('@/views/trade/index.vue'),
  meta: {
    locale: 'menu.trade',
    icon: 'icon-check-circle',
    requiresAuth: true,
    order: 1,
  },
  children: [
    {
      path: '',
      alias: '/',
      redirect: { name: 'Order' },
      meta: {
        hideInMenu: true,
        requiresAuth: true,
      },
    },
    {
      path: 'order',
      name: 'Order',
      component: () => import('@/views/trade/order/index.vue'),
      meta: {
        requiresAuth: true,
        locale: 'menu.trade.order',
      },
    },
    {
      path: 'game-order',
      name: 'gameOrder',
      component: () => import('@/views/trade/orderInGame/index.vue'),
      meta: {
        requiresAuth: true,
        locale: 'menu.trade.orderInGame',
      },
    },
  ],
};
