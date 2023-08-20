import { z } from 'zod';

const createAdminZodSchema = z.object({
  body: z.object({
    role: z.string().optional(),
    password: z.string().min(6, {
      message: 'password should be at least 6 characters',
    }),
    phoneNumber: z.string().nonempty({
      message: 'phoneNumber is required',
    }),
    name: z.object({
      firstName: z.string().nonempty({
        message: 'firstName is required',
      }),
      lastName: z.string().nonempty({
        message: 'lastName is required',
      }),
    }),
    address: z.string().nonempty({
      message: 'address is required',
    }),
  }),
});

const updateAdminZodSchema = z.object({
  body: z.object({
    role: z.string().optional(),
    password: z.string().min(6).optional(),
    phoneNumber: z.string().nonempty().optional(),
    name: z
      .object({
        firstName: z.string().nonempty().optional(),
        lastName: z.string().nonempty().optional(),
      })
      .optional(),
    address: z.string().nonempty().optional(),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'phone number is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
  updateAdminZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
};
