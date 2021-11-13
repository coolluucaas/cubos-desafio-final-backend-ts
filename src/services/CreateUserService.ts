import { hash } from 'bcryptjs'
import { prisma } from '../prisma'

interface CreateUserRequestInterface {
    name: string
    email: string
    password: string
    cpf?: string
    phone?: string
}

class CreateUserService {
    async execute({ name, email, password }: CreateUserRequestInterface) {
        const userAlreadyExists = await prisma.user.findFirst({
            where: {
                email: email,
            },
        })

        if (userAlreadyExists) {
            throw new Error(
                'Email indisponível. Por favor, insira outro endereço.'
            )
        }

        const passwordEncrypted: string = await hash(password, 8)       

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: `${passwordEncrypted}`,
            },
        })

        return user
    }
}

export { CreateUserService }
