/* eslint-disable @typescript-eslint/no-empty-function */
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Request } from 'express'
import { setupWSConnection } from 'y-websocket/bin/utils'
import { getCookie } from '../utils/cookie'

@WebSocketGateway({ namespace: 'messages', transports: ['websocket'] })
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}

  @WebSocketServer()
  server: Server

  afterInit(server: Server) {
    console.log('init')
  }

  handleConnection(connection: WebSocket, request: Request): void {
    console.log('connectection')
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

    const docName = getCookie(request?.headers?.cookie, 'roomName')
    console.log(docName)
    setupWSConnection(connection, request, { ...(docName && { docName }) })
  }

  handleDisconnect(@ConnectedSocket() socket: Socket): void {
    console.log('disconnection')
  }
}
