export type SearchParams = {
  id: number;
  txhash: number;
  bigNumber: number;
  fromBadge: string;
  toBadge: string;
  inputAccount: string;
  inputId: number;
  inputAmount: number;
  start: number;
  end: number;
};

// TODO
// 1. don't set any type on state property, check it.
// 2. what is indexBadge and delect?
export type OrderItem = {
  id: number;
  txhash: string;
  state: any;
  bigNumber: number;
  timeStamp: number;
  fromBadge: string;
  toBadge: string;
  price: number;
  indexBadge: null;
  inputAccount: string;
  inputId: number;
  inputAmount: number;
  delect: null;
};

export type Response = {
  data: {
    list: OrderItem[];
    total: number;
  };
};
