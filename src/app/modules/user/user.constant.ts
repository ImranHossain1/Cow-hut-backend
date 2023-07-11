import { IUserRole } from './user.interface';

export const userRole: IUserRole[] = ['seller', 'buyer'];

export const userSearchableFields = ['contactNo', 'role'];
export const userFilterableFields = ['searchTerm', 'contactNo', 'role'];
