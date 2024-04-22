export interface ChildEntity {
  id: number;
  name: string;
}

export interface RootEntity {
  id: number;
  name: string;
  childEntityId: number;
  childEntity: ChildEntity;
}
