import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class IdeaInterceptor implements NestInterceptor {
  private readonly logger = new Logger(IdeaInterceptor.name);
  private jwtService: JwtService;

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.get('user-agent') || '';
    const { ip, method, path: url } = request;

    this.logger.debug(`
    ${method} , ${url} , 
    ${userAgent} , 
    ${ip}: ${context.getClass().name}, 
    ${context.getHandler().name}, 
    ${request['user'].username},
     Invoked...
    `);

    //TODO: manipulate request


    return next.handle();
  }
}
