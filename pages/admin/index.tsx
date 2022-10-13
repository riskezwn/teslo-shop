import { DashboardRounded } from '@mui/icons-material';
import React from 'react';
import { AdminLayout } from '../../components/layouts';

const DashboardPage = () => (
  <AdminLayout
    title="Dashboard"
    subtitle="General statistics"
    icon={<DashboardRounded />}
  >
    Hello world
  </AdminLayout>
);

export default DashboardPage;
