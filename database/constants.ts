import { IGender, ISize, IType } from '../interfaces';
import { IUserRole } from '../interfaces/user';

interface IShopConstants {
  validTypes: IType[];
  validGenders: IGender[];
  validSizes: ISize[];
}

interface IUserConstants {
  validRoles: IUserRole[];
}

export const SHOP_CONSTANTS: IShopConstants = {
  validTypes: ['shirts', 'pants', 'hoodies', 'hats'],
  validGenders: ['men', 'women', 'kid', 'unisex'],
  validSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
};

export const USER_CONSTANTS: IUserConstants = {
  validRoles: ['client', 'admin'],
};

export default SHOP_CONSTANTS;
