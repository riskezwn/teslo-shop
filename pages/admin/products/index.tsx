import React from 'react';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import useSWR from 'swr';
import { Box, Button } from '@mui/material';
import { AdminLayout } from '../../../components/layouts';
import { FullScreenLoading } from '../../../components/ui';
import { IProduct } from '../../../interfaces';
import ProductsGrid from '../../../components/admin/ProductsGrid';

const OrdersPage = () => {
  const { data: products, error } = useSWR<IProduct[]>('/api/admin/products');

  return (
    <AdminLayout
      title="Products"
      subtitle={`Products maintenance (${products ? products.length : 0})`}
      icon={<CategoryOutlined />}
    >
      <Box display="flex" justifyContent="end" mb={2}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          href="/admin/products/new"
        >
          New product
        </Button>
      </Box>
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
