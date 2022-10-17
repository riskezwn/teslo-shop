import React from 'react';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import useSWR from 'swr';
import { AdminLayout } from '../../components/layouts';
import { FullScreenLoading } from '../../components/ui';
import { OrdersGrid } from '../../components/admin';
import { IOrder } from '../../interfaces';

const OrdersPage = () => {
  const { data: orders, error } = useSWR<IOrder[]>('/api/admin/orders');

  return (
    <AdminLayout title="Orders" subtitle="Orders maintenance" icon={<ConfirmationNumberOutlined />}>
      {
        (!orders && !error) ? (
          <FullScreenLoading />
        ) : (
          <OrdersGrid orders={orders!} />
        )
      }
    </AdminLayout>
  );
};

export default OrdersPage;
