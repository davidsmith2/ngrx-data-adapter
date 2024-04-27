import { Injectable } from '@nestjs/common';
import { ImportDao } from './import.dao';
import { IMPORT_DATA } from './import.data';

@Injectable()
export class ImportService {
  getAllData(): ImportDao {
    return IMPORT_DATA;
  }
}
