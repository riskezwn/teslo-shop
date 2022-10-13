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
  Grid,
} from '@mui/material';
import React from 'react';
import { SummaryTile } from '../../components/admin';
import { AdminLayout } from '../../components/layouts';

const DashboardPage = () => (
  <AdminLayout
    title="Dashboard"
    subtitle="General statistics"
    icon={<DashboardRounded />}
  >
    <Grid container spacing={2}>
      <SummaryTile
        title={1}
        subtitle="Total orders"
        icon={<CreditCardOutlined color="secondary" fontSize="large" />}
      />
      <SummaryTile
        title={1}
        subtitle="Orders paid"
        icon={<AttachMoneyOutlined color="success" fontSize="large" />}
      />
      <SummaryTile
        title={1}
        subtitle="Pending orders"
        icon={<CreditCardOffOutlined color="error" fontSize="large" />}
      />
      <SummaryTile
        title={34}
        subtitle="Clients"
        icon={<GroupOutlined color="primary" fontSize="large" />}
      />
      <SummaryTile
        title={20}
        subtitle="Products"
        icon={<CategoryOutlined color="warning" fontSize="large" />}
      />
      <SummaryTile
        title={5}
        subtitle="Out of stock"
        icon={<CancelPresentationOutlined color="error" fontSize="large" />}
      />
      <SummaryTile
        title={5}
        subtitle="In stock"
        icon={<ProductionQuantityLimitsOutlined color="warning" fontSize="large" />}
      />
      <SummaryTile
        title={8}
        subtitle="Refresh"
        icon={<AccessTimeOutlined color="warning" fontSize="large" />}
      />
    </Grid>
  </AdminLayout>
);

export default DashboardPage;
