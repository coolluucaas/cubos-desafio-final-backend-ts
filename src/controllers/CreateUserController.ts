import { Request, Response } from 'express'
import { CreateUserService } from '../services/CreateUserService'

class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, password } = request.body

        const service = new CreateUserService()

        try {
            const result = await service.execute({ name, email, password })
            return response.json(result)
        } catch (error) {
            if (error instanceof Error) {
                return response.json({ error: error.message })
            }
        }
    }
}

export { CreateUserController }
