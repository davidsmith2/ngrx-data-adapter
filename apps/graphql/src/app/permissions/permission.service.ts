import { Injectable } from "@nestjs/common";
import fetch from 'node-fetch';
import { PermissionType } from "./permission.types";

@Injectable()
export class PermissionService {
  async getAll(): Promise<Array<PermissionType>> {
    const response = await fetch(`http://localhost:8080/rest/permission`);
    const data = await response.json() as Array<PermissionType>;
    return data;
  }

  async getByKey(key: number): Promise<PermissionType> {
    const response = await fetch(`http://localhost:8080/rest/permission/${key}`);
    const data = await response.json() as PermissionType;
    return data;
  }

}
