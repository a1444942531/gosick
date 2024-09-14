import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TOKEN_PREFIX } from '../constant/user.constant';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService
  ) {}
  
  async canActivate(
    context: ExecutionContext,
  ) {
    const request = GqlExecutionContext.create(context).getContext().req;

    if (['/tokens', '/users'].includes(request.url)) {
      return true
    }

    const token = this.extractTokenFromHeader(request)
    try {
      request['user'] = await this.jwtService.verifyAsync(token)
    } catch (error) {
      throw new UnauthorizedException("非法token")
    }

    return true;
  }
  
  private extractTokenFromHeader(request: Request) {
    let [type, token] = request.headers.authorization?.split(" ") ?? []
    return type == TOKEN_PREFIX ? token : ''
  }
}
