import { Prisma } from '../../../generated/prisma/client';

export type UserWithRole = Prisma.UserGetPayload<{
    include: {
        role: true;
    };
}>;
