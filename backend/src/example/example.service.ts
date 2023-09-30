import { Injectable } from '@nestjs/common';
import { CreateExampleInput } from './dto/create-example.input';
import { UpdateExampleInput } from './dto/update-example.input';

@Injectable()
export class ExampleService {
  create(createExampleInput: CreateExampleInput) {
    return 'This action adds a new example';
  }

  findAll() {
    return `This action returns all example`;
  }

  findOne(id: number) {
    return `This action returns a #${id} example`;
  }

  update(id: number, updateExampleInput: UpdateExampleInput) {
    return `This action updates a #${id} example`;
  }

  remove(id: number) {
    return `This action removes a #${id} example`;
  }
}
