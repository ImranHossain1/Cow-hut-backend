import { Breed, Location } from './cow.interface';

export const CowLocation: Location[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];
export const CowBreed: Breed[] = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
];

export const cowSearchableFields = ['name', 'location', 'breed', 'category'];
export const cowFilterableFields = [
  'searchTerm',
  'name',
  'age',
  'price',
  'location',
  'breed',
  'weight',
  'category',
];
