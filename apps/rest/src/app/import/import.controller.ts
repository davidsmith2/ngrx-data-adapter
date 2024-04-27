import { Controller, Get } from '@nestjs/common';
import { ImportService } from './import.service';
import { ImportDao } from './import.dao';
import { ImportMapper } from './import.mapper';
import { Import } from '@ngrx-data-adapter/api-interfaces';

@Controller('import')
export class ImportController {
  constructor(
    private readonly importService: ImportService,
    private readonly importMapper: ImportMapper<ImportDao, Import>
  ) {}

  @Get()
  getAll(): Import {
    const dao: ImportDao = this.importService.getAllData();
    return this.importMapper.mapDaoToDto(dao);
  }

}
