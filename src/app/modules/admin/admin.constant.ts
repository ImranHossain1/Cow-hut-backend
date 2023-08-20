import { IAdminRole } from './admin.interface';

export const adminRole: IAdminRole[] = ['admin'];

export const adminSearchableFields = ['contactNo'];
export const adminFilterableFields = ['searchTerm', 'contactNo', 'role'];
