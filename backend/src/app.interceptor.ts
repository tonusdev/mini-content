import {
  Injectable,
  ExecutionContext,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';


@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextType = context.getType() as string;
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    if (contextType === 'telegraf') {
      request.t = request.i18nContext.t.bind(request.i18nContext);
    }

    return next.handle();
  }
}
