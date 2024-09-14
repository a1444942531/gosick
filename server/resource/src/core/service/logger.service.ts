import { ConsoleLogger, Injectable } from '@nestjs/common';
import { existsSync, promises } from 'fs';

@Injectable()
export class LoggerService extends ConsoleLogger {
  async logToFile(entry) {
    const formattendEntry = `${Intl.DateTimeFormat('zh', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format()}\t${entry}\n`

    const logPath = __dirname + "/.." + "/.." + "/.." + "/logs"

    try {
      if (!existsSync(logPath)) {
        await promises.mkdir(logPath)
      }

      await promises.appendFile(logPath + `/${Intl.DateTimeFormat('zh', {
        dateStyle: "long"
      }).format()}-log.log`, formattendEntry)
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }

  log(message: any, context?: string) {
    const entry = `${context}\t${message}`
    this.logToFile(entry)
    super.log(message, context)
  }

  error(message: any, stackOrContext?: string) {
    const entry = `${stackOrContext}\t${message}`
    this.logToFile(entry)
    super.error(message, stackOrContext)
  }
}
