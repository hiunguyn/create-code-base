const { existsSync, readFileSync, writeFileSync, rmSync } = require("fs")
const { join } = require("path")
const { spawn, spawnSync, exec } = require("child_process")
const chalk = require("chalk")
const boxen = require("boxen")

const CHOICES = ["nestjs-base", "nextjs-base", "react-native-base"]
const GIT_REPO = {
  "nestjs-base": "https://github.com/hiunguyn/nestjs-base.git",
  "nextjs-base": "https://github.com/hiunguyn/nextjs-base.git",
  "react-native-base":
    "https://github.com/hiunguyn/react-native-base.git",
}

const argvToObject = () => {
  const argvObjects = process.argv
    .filter((arg) => arg.startsWith("--"))
    .map((arg) => {
      const argvArray = arg.substr(2).split("=")
      const argvObject = {}
      argvObject[argvArray[0]] = argvArray[1]
      return argvObject
    })
  return Object.assign({}, ...argvObjects)
}

const render = (content, data) => {
  Object.keys(data).forEach(
    (key) =>
      (content = content.replace(new RegExp(`{{${key}}}`, "g"), data[key])),
  )
  return content
}

const isNode = (options) => {
  return existsSync(join(options.tartgetPath, "package.json"))
}

const useYarn = () => {
  const child = spawnSync("which", ["yarn"])
  return child.status === 0
}

const useNpm = () => {
  const child = spawnSync("which", ["npm"])
  return child.status === 0
}

const downloadProject = (options) => {
  return new Promise((resolve, reject) => {
    if (existsSync(options.tartgetPath)) {
      console.log(
        chalk.red(
          `🥲 Folder ${options.tartgetPath} exists. Delete or use another name.`,
        ),
      )
      reject()
    }

    const repo = GIT_REPO[options.template]
    const cmd = `git clone ${repo} ${options.projectName}`
    const child = exec(cmd)
    console.log()
    console.log("Downloading project...")
    child.on("close", (code) => {
      if (code !== 0) {
        // abort this case
        console.log(chalk.red("🥲 Cannot download project!"))
        console.log(chalk.red(`🥲 Command: ${cmd}`))
        reject()
        return
      }
      rmSync(join(options.tartgetPath, ".git"), {
        recursive: true,
        force: true,
      })
      console.log(chalk.green(`🥳 Project downloaded successfully!`))
      resolve()
    })
  })
}

const postProcessNode = (options) => {
  process.chdir(options.tartgetPath)

  let cmd = ""
  let args = []

  if (useYarn()) {
    cmd = "yarn"
  } else if (useNpm) {
    cmd = "npm"
    args = ["install"]
  }

  return new Promise((resolve) => {
    if (cmd) {
      console.log()
      console.log(`Installing dependencies...`)
      const child = spawn(cmd, args, { stdio: "inherit" })
      child.on("close", (code) => {
        if (code !== 0) {
          // abort this case
          console.log(chalk.red("🥲 Cannot run installation."))
          console.log(chalk.red(`🥲 Command: ${cmd} ${args.join(" ")}`))
          console.log()
          resolve()
          return
        }
        console.log(chalk.green(`🥳 Dependencies installed successfully!`))
        console.log()
        resolve()
      })
    } else {
      console.log(
        chalk.red("🥲  No yarn or npm found. Cannot run installation."),
      )
      resolve()
    }
  })
}

module.exports.ARGV = argvToObject()
module.exports.CURR_DIR = process.cwd()
module.exports.QUESTIONS = [
  {
    name: "template",
    type: "list",
    message: "What project template would you like to generate?",
    choices: CHOICES,
    when: () => !CHOICES.includes(this.ARGV.template),
  },
  {
    name: "project-name",
    type: "input",
    message: "Project name:",
    when: () =>
      !this.ARGV["project-name"] ||
      !/^[a-z][a-z\d]*(\-[a-z\d]+)*$/.test(this.ARGV["project-name"]),
    validate: (input) => {
      if (/^[a-z][a-z\d]*(\-[a-z\d]+)*$/.test(input)) return true
      else
        return 'Project name does not match the pattern of "^[a-z][a-z\\d]*(\\-[a-z\\d]+)*$"'
    },
  },
  {
    name: "app-name",
    type: "input",
    message: "App name:",
    when: (answers) =>
      !this.ARGV["app-name"] && answers.template === CHOICES[2],
    validate: (input) => {
      if (/^.+$/.test(input)) return true
      else return "App name is required."
    },
  },
  {
    name: "author",
    type: "input",
    message: "Author project:",
    when: () => !this.ARGV.author,
    validate: (input) => {
      if (/^.+$/.test(input)) return true
      else return "Author project is required."
    },
  },
]

module.exports.capitalizeFirstLetter = (value, index) => {
  if (index && /^[a-z]$/.test(value[0])) {
    return value[0].toUpperCase() + value.slice(1)
  }
  return value
}

module.exports.createGitRepo = () => {
  return new Promise((resolve) => {
    const cmd = 'git init && git add . && git commit -m "Init project"'
    const child = exec(cmd)
    child.on("close", (code) => {
      if (code !== 0) {
        // abort this case
        console.log(chalk.red("🥲 Cannot initialize new git repo!"))
        console.log(chalk.red(`🥲 Command: ${cmd}`))
        resolve()
        return
      }
      console.log(chalk.green(`🥳 New git repo initialized successfully!`))
      resolve()
    })
  })
}

module.exports.showMessage = (options) => {
  const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
  }

  const starting = chalk`{cyan.bold Hello ${options.author} 👋\n\n}{white.bold Move to your project:\n\n$ cd ${options.projectName}\n\n}{cyan.bold Happy Hacking 😎 From Hieu Nguyen with 😍😍😍}`
  console.log(boxen(starting, boxenOptions))
}

module.exports.installPackage = (options) => {
  if (isNode(options)) {
    return postProcessNode(options)
  }
}

module.exports.createProject = async (options) => {
  try {
    await downloadProject(options)

    const packageJsonPath = join(options.tartgetPath, "package.json")
    const appJsonPath = join(options.tartgetPath, "app.json")

    if (existsSync(packageJsonPath)) {
      const contents = render(readFileSync(packageJsonPath, "utf8"), {
        ...options,
      })
      writeFileSync(packageJsonPath, contents, "utf8")
    }

    if (existsSync(appJsonPath)) {
      const contents = render(readFileSync(appJsonPath, "utf8"), {
        ...options,
      })
      writeFileSync(appJsonPath, contents, "utf8")
    }
  } catch (error) {
    process.exit(1)
  }
}
