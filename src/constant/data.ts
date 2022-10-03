import { WarrantyClaimStatus } from '../sold-product';

const now = new Date();
const today = now.toISOString().split('T')[0];
const zeroDayAgo = new Date(today);
const twoDaysAgo = new Date(today);
const oneDayAgo = new Date(today);

oneDayAgo.setDate(twoDaysAgo.getDate() - 1);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

const Users = [
  {
    query: { username: 'admin' },
    payload: {
      name: 'administrator',
      username: 'admin',
      password: 'admin',
      isAdmin: true,
      createdAt: oneDayAgo,
      updatedAt: oneDayAgo,
    },
  },
  {
    query: { username: 'adi' },
    payload: {
      name: 'adi sanbroyo',
      username: 'adi',
      password: 'adi',
      isAdmin: false,
      createdAt: oneDayAgo,
      updatedAt: oneDayAgo,
    },
  },
  {
    query: { username: 'ucup' },
    payload: {
      name: 'ucup suprada',
      username: 'ucup',
      password: 'ucup',
      isAdmin: false,
      createdAt: oneDayAgo,
      updatedAt: oneDayAgo,
    },
  },
];

const Products = [
  {
    query: { code: 'a001' },
    payload: {
      code: 'a001',
      name: 'Apple iPhone 6s',
      warranty: 1,
      price: 100,
      createdAt: twoDaysAgo,
      updatedAt: twoDaysAgo,
    },
  },
  {
    query: { code: 'a002' },
    payload: {
      code: 'a002',
      name: 'Apple iPhone 13 Pro',
      warranty: 1,
      price: 2000,
      createdAt: twoDaysAgo,
      updatedAt: twoDaysAgo,
    },
  },
  {
    query: { code: 'a003' },
    payload: {
      code: 'a003',
      name: 'Samsung Galaxy S22 Ultra',
      warranty: 1,
      price: 1800,
      createdAt: twoDaysAgo,
      updatedAt: twoDaysAgo,
    },
  },
  {
    query: { code: 'a004' },
    payload: {
      code: 'a004',
      name: 'Xiaomi 12 Ultra',
      warranty: 1,
      price: 1600,
      createdAt: twoDaysAgo,
      updatedAt: twoDaysAgo,
    },
  },
  {
    query: { code: 'a005' },
    payload: {
      code: 'a005',
      name: 'Poco F4 GT',
      warranty: 1,
      price: 1400,
      createdAt: twoDaysAgo,
      updatedAt: twoDaysAgo,
    },
  },
];

const SoldProducts = [
  {
    query: { saleId: 's001' },
    payload: {
      saleId: 's001',
      product: Products[0].payload,
      buyer: Users[1].payload,
      buyTimestamp: oneDayAgo,
    },
  },
  {
    query: { saleId: 's002' },
    payload: {
      saleId: 's002',
      product: Products[1].payload,
      buyer: Users[1].payload,
      warrantyClaims: [
        {
          status: WarrantyClaimStatus.Pending,
          createdAt: zeroDayAgo,
        },
        {
          status: WarrantyClaimStatus.Accepted,
          createdAt: now,
        },
      ],
      buyTimestamp: oneDayAgo,
    },
  },
  {
    query: { saleId: 's003' },
    payload: {
      saleId: 's003',
      product: Products[1].payload,
      buyer: Users[1].payload,
      warrantyClaims: [
        {
          status: WarrantyClaimStatus.Pending,
          createdAt: zeroDayAgo,
        },
        {
          status: WarrantyClaimStatus.Refused,
          createdAt: now,
        },
      ],
      buyTimestamp: oneDayAgo,
    },
  },
  {
    query: { saleId: 's004' },
    payload: {
      saleId: 's004',
      product: Products[2].payload,
      buyer: Users[1].payload,
      warrantyClaims: [
        {
          status: WarrantyClaimStatus.Pending,
          createdAt: zeroDayAgo,
        },
        {
          status: WarrantyClaimStatus.Accepted,
          createdAt: zeroDayAgo,
        },
        {
          status: WarrantyClaimStatus.Delivered,
          createdAt: now,
        },
      ],
      buyTimestamp: oneDayAgo,
    },
  },
  {
    query: { saleId: 's005' },
    payload: {
      saleId: 's005',
      product: Products[3].payload,
      buyer: Users[1].payload,
      buyTimestamp: oneDayAgo,
    },
  },
  {
    query: { saleId: 's006' },
    payload: {
      saleId: 's006',
      product: Products[3].payload,
      buyer: Users[0].payload,
      buyTimestamp: oneDayAgo,
    },
  },
  {
    query: { saleId: 's007' },
    payload: {
      saleId: 's007',
      product: Products[0].payload,
      buyer: Users[2].payload,
      buyTimestamp: oneDayAgo,
    },
  },
  {
    query: { saleId: 's008' },
    payload: {
      saleId: 's008',
      product: Products[1].payload,
      buyer: Users[2].payload,
      buyTimestamp: oneDayAgo,
    },
  },
];

export const Data = {
  users: Users,
  products: Products,
  soldProducts: SoldProducts,
};
