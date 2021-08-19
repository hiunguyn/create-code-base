#!/usr/bin/env node
const { prompt } = require("inquirer");
const { readdirSync } = require("fs");
const { join } = require("path");

const {
  argvToObject,
  createDirectoryContents,
  createGitRepo,
  createProject,
  postProcess,
  showMessage,
} = require("./utils");

const ARGV = argvToObject();
const CURR_DIR = process.cwd();
const CHOICES = readdirSync(join(__dirname, "templates"));
const QUESTIONS = [
  {
    name: "template",
    type: "list",
    message: "What project template would you like to generate?",
    choices: CHOICES,
    when: () => !ARGV.template,
  },
  {
    name: "name",
    type: "input",
    message: "Project name:",
    when: () => !ARGV.name,
    validate: (input) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    },
  },
  {
    name: "author",
    type: "input",
    message: "Author project:",
    when: () => !ARGV.author,
    validate: (input) => {
      if (/^.+$/.test(input)) return true;
      else
        return "Author project is required.";
    },
  },
];

prompt(QUESTIONS).then(async (answers) => {
  answers = Object.assign({}, answers, ARGV);

  const projectChoice = answers.template;
  const projectName = answers.name;
  const author = answers.author;
  const templatePath = join(__dirname, "templates", projectChoice);
  const tartgetPath = join(CURR_DIR, projectName);

  const options = {
    projectName,
    author,
    templateName: projectChoice,
    templatePath,
    tartgetPath,
  };

  if (!createProject(tartgetPath)) {
    return;
  }

  createDirectoryContents(templatePath, projectName, author, CURR_DIR);

  await postProcess(options)

  await createGitRepo()

  showMessage(options);
});
