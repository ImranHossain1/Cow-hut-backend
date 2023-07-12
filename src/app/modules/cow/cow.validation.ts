import { z } from 'zod';
import { CowBreed, CowLocation } from './cow.constant';

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string().nonempty({
      message: 'name is required',
    }),
    age: z.number().positive({
      message: 'age must be a positive number',
    }),
    price: z.number().positive({
      message: 'price must be a positive number',
    }),
    location: z.enum([...CowLocation] as [string, ...string[]]).optional(),
    breed: z.enum([...CowBreed] as [string, ...string[]]).optional(),
    weight: z.number().positive({
      message: 'weight must be a positive number',
    }),
    label: z.string().nonempty({
      message: 'label is required',
    }),
    category: z.string().nonempty({
      message: 'category is required',
    }),
    seller: z
      .string()
      .nonempty({
        message: 'seller is required',
      })
      .refine(value => value.match(/^[0-9a-fA-F]{24}$/), {
        message: 'seller must be a valid ObjectId',
      }),
  }),
});

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().positive().optional(),
    price: z.number().positive().optional(),
    location: z.enum([...CowLocation] as [string, ...string[]]).optional(),
    breed: z.enum([...CowBreed] as [string, ...string[]]).optional(),
    weight: z.number().positive().optional(),
    label: z.string().optional(),
    category: z.string().optional(),
    seller: z
      .string()
      .refine(value => value.match(/^[0-9a-fA-F]{24}$/))
      .optional(),
  }),
});

export const CowValidation = { createCowZodSchema, updateCowZodSchema };
