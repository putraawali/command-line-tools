const fs = require("fs");
const convert = require("./convert");
class AppController {
  static async getHelp() {
    console.log(`
    HELP:
    -----
    -h : Check all command on this tools
    -----

    CONVERT:
    --------
    < current directory file > -t < flag (json / text) >        : Command to convert your log file into json file or plaintext
      example: cli-tools /var/log/nginx/error.log -t json
          OR
    < current directory file >                                  : Command to convert your log file into plaintext
      example: cli-tools /var/log/nginx/error.log
    --------

    CREATE NEW FILE:
    ----------------
    < current directory file > -o < your destination folder >         : Command to copy you current file to new directory as new txt file
      example: cli-tools /var/log/nginx/error.log -o /User/johnmayer/Desktop/nginxlog.txt
        OR
    < current directory file > -t json -o < you new destination folder > : Command to convert and copy your current log file to new directory as new json file
      example: cli-tools /var/log/nginx/error.log -t json -o /User/johnmayer/Desktop/nginxlog.json
    ----------------
    `);
  }

  static async getFile(fileDirectory, convertion) {
    try {
      let dataLog = fs.readFileSync(fileDirectory, "utf8");
      if (convertion === "json") {
        let convertedLog = convert(dataLog);
        console.log(convertedLog);
        return convertedLog;
      } else {
        console.log(dataLog);
        return dataLog;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async moveFile(fileDirectory, convertion, destinationDirectory) {
    let dataLog = await this.getFile(fileDirectory, convertion);
    try {
      if (convertion === "json") {
        dataLog = JSON.stringify(dataLog);
        await fs.writeFileSync(destinationDirectory, dataLog, {
          encoding: "utf-8",
          flag: "w",
        });
      } else {
        await fs.writeFileSync(destinationDirectory, dataLog, {
          encoding: "utf-8",
          flag: "w",
        });
      }
      console.log("Sukses");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AppController;
