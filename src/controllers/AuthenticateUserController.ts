import { Request, Response } from 'express'
import { AuthenticateUserService } from '../services/AuthenticateUserService'

class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body

        const service = new AuthenticateUserService()

        const result = await service.execute({ email, password })

        return response.status(200).json(result)
    }
}

export { AuthenticateUserController }
