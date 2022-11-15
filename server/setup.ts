import next from 'next'
import chalk from 'chalk'
import { Options } from 'next/dist/server/base-server'
import { existsSync } from 'fs'
import { execSync, spawnSync } from 'child_process'
import { RunServer } from './server'

export const MODE = {
  PROD: 'production',
  DEV: 'development'
}

const base_port = parseInt(String( process.env.PORT ), 10) || 80

export const setupServer = async (opts: Partial<Options>) => {

  const mode = opts.dev ? MODE.DEV : MODE.PROD
  const port = base_port

  const app = next(opts)
  const handle = app.getRequestHandler()

  console.log(`Initializing app in ${mode} mode on port ${port}`)

  if (mode === MODE.PROD) {
    if (!existsSync('node_modules')) {
      console.log("Node Modules not found, installing")
      try {
        const install_out = execSync('npm install').toString()
        console.log(install_out)
        console.log("✅ Dependencies install done")
      } catch (e: any) {
        console.log("Error installing dependencies: ", e.message)
        console.log("Production failed")
        return
      }
    }

    if (!existsSync(".next")) {
      console.log("Next build not found, building")
      try {
        const spawn = spawnSync('npm exec next build')
        if (spawn.error) {
          console.log("Error building production: ", spawn.error.message)
          console.log("Build failed")
          return
        }
        const out = spawn.output.toString()
        console.log(out)
        console.log("✅ Prod build done")
      } catch (e: any) {
        console.log("Error building production: ", e.message)
        console.log("Build failed")
        return
      }
    }

    console.log(chalk.cyan("Production ready"))
  }

  if (!existsSync("node_modules") || !existsSync(".next")) {
    console.log(chalk.red("Error setting up production"))
    return
  }

  app.prepare().then(() => {
    console.log(`App ${mode} version prepared, setting up server`)

    RunServer({ port, mode, handle })
    console.log("Finished")

  }).catch(e => {
    console.log("Error running server")
    console.log(e)
  })
}
