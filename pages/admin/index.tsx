import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardRounded,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  CircularProgress,
  Grid,
} from '@mui/material';
import React, { Suspense, useEffect, useState } from 'react';
import useSWR from 'swr';
import { SummaryTile } from '../../components/admin';
import { AdminLayout } from '../../components/layouts';
import { DashboardSummaryResponse } from '../../interfaces';

const DashboardPage = () => {
  const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
    refreshInterval: 30 * 1000, // 30 seconds
  });

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refresh) => (refresh > 0 ? refresh - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!error && !data) {
    return <Box />;
  }

  if (error) {
    return <Alert severity="error">Error loading info</Alert>;
  }

  const {
    numberOfOrders,
    paidOrders,
    pendingOrders,
    numberOfClients,
    numberOfProducts,
    productsOutOfStock,
    productsLowStock,
  } = data!;

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="General statistics"
      icon={<DashboardRounded />}
    >
      <Suspense fallback={<CircularProgress />}>
        <Grid container spacing={2}>
          <SummaryTile
            title={numberOfOrders}
            subtitle="Total orders"
            icon={<CreditCardOutlined color="secondary" fontSize="large" />}
          />
          <SummaryTile
            title={paidOrders}
            subtitle="Orders paid"
            icon={<AttachMoneyOutlined color="success" fontSize="large" />}
          />
          <SummaryTile
            title={pendingOrders}
            subtitle="Pending orders"
            icon={<CreditCardOffOutlined color="error" fontSize="large" />}
          />
          <SummaryTile
            title={numberOfClients}
            subtitle="Clients"
            icon={<GroupOutlined color="primary" fontSize="large" />}
          />
          <SummaryTile
            title={numberOfProducts}
            subtitle="Products"
            icon={<CategoryOutlined color="warning" fontSize="large" />}
          />
          <SummaryTile
            title={productsOutOfStock}
            subtitle="Out of stock"
            icon={<CancelPresentationOutlined color="error" fontSize="large" />}
          />
          <SummaryTile
            title={productsLowStock}
            subtitle="Low stock"
            icon={<ProductionQuantityLimitsOutlined color="warning" fontSize="large" />}
          />
          <SummaryTile
            title={refreshIn}
            subtitle="Refresh"
            icon={<AccessTimeOutlined color="warning" fontSize="large" />}
          />
        </Grid>
      </Suspense>
    </AdminLayout>
  );
};

export default DashboardPage;
