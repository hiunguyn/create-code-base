<p align="center">
  <a href="https://github.com/hieubeo0/create-code-base" target="blank"><img src="https://hieubeo0.github.io/static-file/svg/programming.svg" width="320" /></a>
</p>

# Start a project with code base

## Quick start

```bash
$ npx create-code-base [options]

or

$ npm init code-base [options]
```

#### Options

[--project-name=<project name\>] [--app-name=<app name\>] [--author=<author project\>] [--template=<template name \>]

- --project-name: Name of the project you want to create
- --app-name: The name of your React Native App you want to create
- --author: Author of the project you want to create
- --template: Template of the project you want to create<br />
  template names: [nestjs-code-base | nextjs-code-base | react-native]<br />
  If the template is not `react-native` then argument --app-name is not necessary

  example command:

```bash
$ npx create-code-base --project-name=my-project --author='My Name' --template=nestjs-code-base

or

$ npx create-code-base --project-name=my-project --app-name='My App' --author='My Name' --template=react-native
```

## Global install

```bash
$ npm install create-code-base -g

or

$ sudo install create-code-base -g (for mac)
```

#### Use as cli

```bash
$ create-code-base [options]
```

## Documents

- [NestJs code base](https://github.com/hieubeo0/create-code-base/tree/master/bin/templates/nestjs-code-base#readme)
- [NextJs code base](https://github.com/hieubeo0/create-code-base/tree/master/bin/templates/nextjs-code-base#readme)
- [React Native code base](https://github.com/hieubeo0/create-code-base/tree/master/bin/templates/react-native#readme)

## Issues

[Issues on github](https://github.com/hieubeo0/create-code-base/issues)
