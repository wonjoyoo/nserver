import cron from 'node-cron'
import {Server} from 'socket.io'
import {getCustomRepository, getManager, getConnection} from 'typeorm'
import logger from './libs/logger';
import { format } from 'date-fns';
import { exec } from 'child_process';


export default class Scheduler {
  io: Server
  secret = process.env.SECRET

  isUpdate: boolean = false
  lastCount: number = 0

  constructor(io: any) {
    this.io = io
    this.start()
  }

  public start() {

    console.log('Scheduler start') //서로 분을 다르게 해야함.

  }
}
