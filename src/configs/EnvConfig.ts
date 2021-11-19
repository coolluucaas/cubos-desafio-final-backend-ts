
import { resolve } from "path"

import { config } from "dotenv"

config({ path: resolve(__dirname, `./../../env/env.${process.env.NODE_ENV}`) })