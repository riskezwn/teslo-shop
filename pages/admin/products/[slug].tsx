/* eslint-disable react/jsx-props-no-spreading */
import React, {
  ChangeEvent,
  FC, useEffect, useRef, useState,
} from 'react';
import { GetServerSideProps } from 'next';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AdminLayout } from '../../../components/layouts';
import {
  IGender, IProduct, ISize, IType,
} from '../../../interfaces';
import { dbProducts } from '../../../database';
import { tesloApi } from '../../../api_base';
import { Product } from '../../../models';

interface FormData {
  _id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ISize[];
  slug: string;
  tags: string[];
  title: string;
  type: IType;
  gender: IGender;
}

const validTypes: IType[] = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender: IGender[] = ['men', 'women', 'kid', 'unisex'];
const validSizes: ISize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

interface Props {
  product: IProduct;
}

const ProductAdminPage:FC<Props> = ({ product }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newTagValue, setNewTagValue] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const {
    register, handleSubmit, formState: { errors }, getValues, setValue, watch,
  } = useForm<FormData>({
    defaultValues: product,
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        const newSlug = value.title?.toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '') || '';

        setValue('slug', newSlug);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const onChangeSize = (size: ISize) => {
    const currentSizes = getValues('sizes');
    if (currentSizes.includes(size)) {
      return setValue('sizes', currentSizes.filter((s) => s !== size), { shouldValidate: true });
    }
    return setValue('sizes', [...currentSizes, size], { shouldValidate: true });
  };

  const onAddNewTag = () => {
    if (!newTagValue || newTagValue === ' ') return;

    const newTag = newTagValue.trim().toLowerCase();
    setNewTagValue('');

    const currentTags = getValues('tags');
    if (currentTags.includes(newTag)) return;
    currentTags.push(newTag);
  };

  const onDeleteTag = (tag: string) => {
    const updatedTags = getValues('tags').filter((t) => t !== tag);
    return setValue('tags', updatedTags, { shouldValidate: true });
  };

  const onDeleteImage = (image: string) => {
    const updatedImages = getValues('images').filter((img) => img !== image);
    return setValue('images', updatedImages, { shouldValidate: true });
  };

  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) return;

    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const file of target.files) {
        const formData = new FormData();
        formData.append('file', file);
        tesloApi.post<{message: string}>('/admin/upload', formData).then(({ data }) => {
          setValue('images', [...getValues('images'), data.message], { shouldValidate: true });
        });
      }
    } catch (e: any) {
      throw new Error(e);
    }
  };

  const onSubmitForm = async (data: FormData) => {
    // TODO: change to snackbar
    if (data.images.length < 2) return alert('At least 2 images are required');
    setIsSaving(true);

    try {
      const resp = await tesloApi({
        url: '/admin/products',
        method: data._id ? 'PUT' : 'POST', // PUT if have ID, POST if not
        data,
      });

      if (!data._id) {
        await router.replace(`/admin/products/${data.slug}`);
      } else {
        setIsSaving(false);
      }
      return resp.data;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <AdminLayout
      title="Product"
      subtitle={product.title}
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: '150px' }}
            type="submit"
            disabled={isSaving}
          >
            Save
          </Button>
        </Box>
        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('title', {
                required: 'Required',
                minLength: { value: 2, message: 'Must contain at least two characters' },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              label="Description"
              variant="filled"
              fullWidth
              multiline
              rows={4}
              sx={{ mb: 1 }}
              {...register('description', {
                required: 'Required',
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <TextField
              label="Inventary"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('inStock', {
                required: 'Required',
                min: { value: 0, message: 'Minimum value is 0' },
              })}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />
            <TextField
              label="Price"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('price', {
                required: 'Required',
                min: { value: 0, message: 'Minimum value is 0' },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
            <Divider sx={{ my: 1 }} />
            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                row
                value={getValues('type')}
                onChange={({ target }) => setValue('type', target.value as IType, { shouldValidate: true })}
              >
                {
                  validTypes.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio color="secondary" />}
                      label={capitalize(option)}
                    />
                  ))
                }
              </RadioGroup>
            </FormControl>
            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                value={getValues('gender')}
                onChange={({ target }) => setValue('gender', target.value as IGender, { shouldValidate: true })}
              >
                {
                  validGender.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio color="secondary" />}
                      label={capitalize(option)}
                    />
                  ))
                }
              </RadioGroup>
            </FormControl>
            <FormGroup>
              <FormLabel>Sizes</FormLabel>
              <Box>
                {
                  validSizes.map((size: ISize) => (
                    <FormControlLabel
                      key={size}
                      control={<Checkbox checked={getValues('sizes').includes(size)} />}
                      label={size}
                      onChange={() => onChangeSize(size)}
                    />
                  ))
                }
              </Box>
            </FormGroup>
          </Grid>
          {/* Tags and images */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Slug"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('slug', {
                required: 'Required',
                validate: (val) => (val.trim().includes(' ') ? 'Cannot have blanks' : undefined),
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />
            <TextField
              label="Tags"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              helperText="Press [spacebar] to add"
              value={newTagValue}
              onChange={({ target }) => setNewTagValue(target.value.trim())}
              onKeyUp={({ key, code }) => {
                if ((key === ' ' || code === 'Space')) {
                  onAddNewTag();
                }
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0,
              }}
              component="ul"
            >
              {
                getValues('tags').map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => onDeleteTag(tag)}
                    color="primary"
                    size="small"
                    sx={{ ml: 1, mt: 1 }}
                  />
                ))
              }
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" flexDirection="column">
              <FormLabel sx={{ mb: 1 }}>Images</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadOutlined />}
                sx={{ mb: 3 }}
                onClick={() => fileInputRef.current?.click()}
              >
                Upload image
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/png, image/gif, image/jpg"
                style={{ display: 'none' }}
                onChange={onFilesSelected}
              />
              <Chip
                label="At least 2 images are required"
                color="error"
                variant="outlined"
                sx={{ display: getValues('images').length < 2 ? 'flex' : 'none' }}
              />
              <Grid container spacing={2}>
                {
                  getValues('images').map((img) => (
                    <Grid item xs={4} sm={3} key={img}>
                      <Card>
                        <CardMedia
                          component="img"
                          className="fadeIn"
                          image={`/products/${img}`}
                          alt={img}
                        />
                        <CardActions>
                          <Button fullWidth color="error" onClick={() => onDeleteImage(img)}>
                            Delete
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))
                }
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = '' } = query;

  let product: IProduct | null;

  if (slug === 'new') {
    const tempProduct = JSON.parse(JSON.stringify(new Product()));
    delete tempProduct._id;
    tempProduct.images = ['img1.jpg', 'img2.jpg'];

    product = tempProduct;
  } else {
    product = await dbProducts.getProductBySlug(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
