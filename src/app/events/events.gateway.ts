/* eslint-disable @typescript-eslint/no-empty-function */
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
  SubscribeMessage,
  type WsResponse,
  MessageBody,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Request } from 'express'
import { setupWSConnection } from 'y-websocket/bin/utils'
import { getCookie } from '../utils/cookie'
import { Logger } from '@nestjs/common'

@WebSocketGateway({
  cors: { origin: '*' },
  path: 'yjs',
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('EventsGateway')

  constructor() {}

  @WebSocketServer()
  server: Server

  afterInit(server: Server) {
    this.logger.log('web socket init')
  }

  handleConnection(connection: WebSocket, request: Request): void {
    this.logger.log(`client connected: ${request}`)
    // We can handle authentication of user like below

    // const token = getCookie(request?.headers?.cookie, 'auth_token');
    // const ERROR_CODE_WEBSOCKET_AUTH_FAILED = 4000;
    // if (!token) {
    //   connection.close(ERROR_CODE_WEBSOCKET_AUTH_FAILED);
    // } else {
    //   const signedJwt = this.authService.verifyToken(token);
    //   if (!signedJwt) connection.close(ERROR_CODE_WEBSOCKET_AUTH_FAILED);
    //   else {
    //     const docName = getCookie(request?.headers?.cookie, 'roomName');
    //     setupWSConnection(connection, request, { ...(docName && { docName }) });
    //   }
    // }

    this.logger.log(JSON.stringify(request?.headers))
    const docName = getCookie(request?.headers?.cookie, 'roomName')
    setupWSConnection(connection, request, { ...(docName && { docName }) })
  }

  handleDisconnect(@ConnectedSocket() socket: Socket): void {
    this.logger.log('disconnection')
  }
}
