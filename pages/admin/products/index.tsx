import React from 'react';
import { CategoryOutlined } from '@mui/icons-material';
import useSWR from 'swr';
import { AdminLayout } from '../../../components/layouts';
import { FullScreenLoading } from '../../../components/ui';
import { IProduct } from '../../../interfaces';
import ProductsGrid from '../../../components/admin/ProductsGrid';

const OrdersPage = () => {
  const { data: products, error } = useSWR<IProduct[]>('/api/admin/products');

  return (
    <AdminLayout title="Products" subtitle={`Products maintenance (${products?.length})`} icon={<CategoryOutlined />}>
      {
        (!products && !error) ? (
          <FullScreenLoading />
        ) : (
          <ProductsGrid products={products!} />
        )
      }
    </AdminLayout>
  );
};

export default OrdersPage;
