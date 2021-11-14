import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { prisma } from '../prisma'

interface AuthenticateUserRequestInterface {
    email: string
    password: string
}

class AuthenticateUserService {
    async execute({ email, password }: AuthenticateUserRequestInterface) {
        if (!email) {
            throw new Error('Email é um campo obrigatório.')
        }

        if (!password) {
            throw new Error('Password é um campo obrigatório.')
        }

        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        })

        if (!user) {
            throw new Error('Email ou senha incorretos')
        }

        const passwordMatch = compare(password, user.password)

        if (!passwordMatch) {
            throw new Error('Email ou senha incorretos')
        }

        const token = sign(
            { email: user.email },
            <string>process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '1d',
            }
        )

        return token
    }
}

export { AuthenticateUserService }
