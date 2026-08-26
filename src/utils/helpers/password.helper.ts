import bcrypt from 'bcrypt';

export async function hashPassword(plainPassword: string): Promise<string> {
    const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
    return bcrypt.hash(plainPassword, saltRounds);
}

export async function comparePassword(
    plainPassword: string,
    hash: string,
): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hash);
}
