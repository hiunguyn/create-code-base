#!/usr/bin/env node
const { prompt } = require("inquirer")
const { join } = require("path")

const {
  createProject,
  createGitRepo,
  installPackage,
  showMessage,
  ARGV,
  CURR_DIR,
  QUESTIONS,
  capitalizeFirstLetter,
} = require("./helpers")

prompt(QUESTIONS).then(async (answers) => {
  answers = Object.assign({}, answers, ARGV)

  const options = {
    template: answers.template,
    projectName: answers["project-name"],
    displayName: answers["app-name"] && answers["app-name"].trim(),
    name: answers["project-name"]
      .split("-")
      .map((value, index) => capitalizeFirstLetter(value, index))
      .join(""),
    author: answers.author.trim(),
    tartgetPath: join(CURR_DIR, answers["project-name"]),
  }

  await createProject(options)

  await installPackage(options)

  await createGitRepo()

  showMessage(options)
})
