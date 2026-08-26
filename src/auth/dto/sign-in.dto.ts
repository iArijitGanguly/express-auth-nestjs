import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(72)
    @Matches(/[a-z]/, {
        message: 'password must contain at least one lowercase letter',
    })
    @Matches(/[A-Z]/, {
        message: 'password must contain at least one uppercase letter',
    })
    @Matches(/[0-9]/, { message: 'password must contain at least one number' })
    @Matches(/[^a-zA-Z0-9]/, {
        message: 'password must contain at least one special character',
    })
    password!: string;
}
