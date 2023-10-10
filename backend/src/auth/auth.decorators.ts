import { createParamDecorator, ExecutionContext, } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';


export const InjectJwtSubject = createParamDecorator(
  (target: object, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req?.user;
  },
);
