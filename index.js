#!/usr/bin/env node

const AppController = require("./controller");
const directory = process.argv.slice(2, 3)[0];
const flag = process.argv.slice(3, 4)[0];
const convertion = process.argv.slice(4, 5)[0];

// Filled when process.argv.length is more than 5 or flag -o - Start//
let destinationNewDirectory;
// Filled when process.argv.length is more than 5 or flag -o - End//

if (process.argv.length > 5 || flag === "-o") {
  let optionCommand;

  if (flag === "-o") {
    optionCommand = process.argv.slice(4);
    destinationNewDirectory = optionCommand[0];
  } else {
    optionCommand = process.argv.slice(5);
    destinationNewDirectory = optionCommand[1];
  }
}

if (process.argv.length > 5) {
  AppController.moveFile(directory, convertion, destinationNewDirectory);
} else {
  switch (directory) {
    case "-h":
      AppController.getHelp();
      break;
    default:
      switch (flag) {
        case "-o":
          AppController.moveFile(
            directory,
            convertion,
            destinationNewDirectory
          );
          break;
        default:
          console.log("MASOK");
          AppController.getFile(directory, convertion);
          break;
      }
      break;
  }
}
