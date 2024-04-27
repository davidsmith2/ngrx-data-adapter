import { Controller, Get, Param } from '@nestjs/common';
import { ImportService } from './import.service';
import { ImportDao } from './import.dao';

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Get()
  getAll(): any {
    const dao: ImportDao = this.importService.getAllData();
    return this.daoToDto(dao);
  }

  private daoToDto(dao: ImportDao): any {
    return {
      users: null,
      companies: null,
      addresses: null,
      permissions: null
    };
  }
}
