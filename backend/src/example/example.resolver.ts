import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExampleService } from './example.service';
import { Example } from './entities/example.entity';
import { CreateExampleInput } from './dto/create-example.input';
import { UpdateExampleInput } from './dto/update-example.input';

@Resolver(() => Example)
export class ExampleResolver {
  constructor(private readonly exampleService: ExampleService) {}

  @Mutation(() => Example)
  createExample(@Args('createExampleInput') createExampleInput: CreateExampleInput) {
    return this.exampleService.create(createExampleInput);
  }

  @Query(() => [Example], { name: 'example' })
  findAll() {
    return this.exampleService.findAll();
  }

  @Query(() => Example, { name: 'example' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.exampleService.findOne(id);
  }

  @Mutation(() => Example)
  updateExample(@Args('updateExampleInput') updateExampleInput: UpdateExampleInput) {
    return this.exampleService.update(updateExampleInput.id, updateExampleInput);
  }

  @Mutation(() => Example)
  removeExample(@Args('id', { type: () => Int }) id: number) {
    return this.exampleService.remove(id);
  }
}
