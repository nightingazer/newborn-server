import * as fs from 'fs'
import { Logger } from '../utils/'

export class ConfigKeys {
  private static readonly mongo = {
    username: 'mongo0',
    password: 'tRQia82gocWGFGn9',
    cluster: 'cluster0.vxc0nic.mongodb.net',
  }
  public static readonly jwtSecret = 'jwt-dev'
  public static get mongoConnectString(): string {
    return `mongodb+srv://${this.mongo.username}:${this.mongo.password}@${this.mongo.cluster}/?retryWrites=true&w=majority`
  }
}
