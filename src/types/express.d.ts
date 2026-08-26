// common/types/express.d.ts
import { JwtPayload } from '../guards/jwt-auth/jwt-auth.guard';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}
