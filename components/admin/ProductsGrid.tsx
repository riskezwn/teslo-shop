import React, { FC } from 'react';
import NextLink from 'next/link';
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams, GridValueGetterParams,
} from '@mui/x-data-grid';
import { CardMedia, Grid, Link } from '@mui/material';
import { IProduct } from '../../interfaces';
import currency from '../../utils/currency';

interface Props {
  products: IProduct[];
}

export const ProductsGrid: FC<Props> = ({ products }) => {
  const columns: GridColDef[] = [
    {
      field: 'image',
      headerName: 'Image',
      flex: 1,
      renderCell: ({ row }: GridValueGetterParams) => (
        <Link href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
          <CardMedia component="img" className="fadeIn" image={row.image} />
        </Link>
      ),
    },
    {
      field: 'title',
      headerName: 'Title',
      minWidth: 250,
      flex: 1,
      renderCell: ({ row }: GridValueGetterParams) => (
        <NextLink href={`/admin/products/${row.slug}`} passHref>
          <Link href={`/admin/products/${row.slug}`} underline="always">{row.title}</Link>
        </NextLink>
      ),
    },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'inStock', headerName: 'In stock', flex: 1 },
    {
      field: 'sizes', headerName: 'Sizes', minWidth: 250, flex: 1,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      flex: 1,
      maxWidth: 120,
      valueFormatter: ({ value }: GridValueFormatterParams) => currency.format(value),
    },
  ];

  const rows = products.map((product) => ({
    id: product._id,
    image: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    sizes: product.sizes.join(' - '),
    price: product.price,
    slug: product.slug,
  }));

  return (
    <Grid container className="fadeIn">
      <Grid
        item
        xs={12}
        sx={{
          height: 650,
          width: '100%',
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Grid>
    </Grid>
  );
};

export default ProductsGrid;
