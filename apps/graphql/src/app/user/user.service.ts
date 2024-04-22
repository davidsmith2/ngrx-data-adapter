import { Injectable } from "@nestjs/common";
import { UpsertUserInput, UserType } from "./user.types";
import fetch from 'node-fetch';

@Injectable()
export class UserService {
  async add(user: UpsertUserInput): Promise<UserType> {
    const response = await fetch(`http://localhost:8080/rest/user`, {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json() as UserType;
    return data;
  }

  async delete(key: number): Promise<UserType> {
    const response = await fetch(`http://localhost:8080/rest/user/${key}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json() as UserType;
    return data;
  }

  async getAll(): Promise<Array<UserType>> {
    const response = await fetch(`http://localhost:8080/rest/user`);
    const data = await response.json() as Array<UserType>;
    return data;
  }

  async getByKey(key: number): Promise<UserType> {
    const response = await fetch(`http://localhost:8080/rest/user/${key}`);
    const data = await response.json() as UserType;
    return data;
  }

  async getWithQuery(firstName: string): Promise<Array<UserType>> {
    const response = await fetch(`http://localhost:8080/rest/user?firstName=${firstName}`);
    const data = await response.json() as Array<UserType>;
    return data;
  }

  async update(user: UpsertUserInput): Promise<UserType> {
    const response = await fetch(`http://localhost:8080/rest/user`, {
      method: 'put',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json() as UserType;
    return data;
  }

  async upsert(id: number, user: UpsertUserInput): Promise<UserType> {
    const response = await fetch(`http://localhost:8080/rest/user/${id}`, {
      method: 'put',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json() as UserType;
    return data;
  }

}
