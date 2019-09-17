import { AuditableEntity } from "./auditableEntity";

export class Project extends AuditableEntity {
  public id: number;
  public name: string;
  public author: string;
  public description: string;
  public shortDescription: string;
  public projectFile: any;
  public images: any;

  constructor(name: string,
    author: string,
    description: string,
    shortDescription: string,
    projectFile: any,
    images: any) {
    super();
    this.name = name;
    this.author = author;
    this.description = description;
    this.shortDescription = shortDescription;
    this.projectFile = projectFile;
    this.images = images;
  }
}

export class GetProjectsResponse extends AuditableEntity {
  public id: number;
  public name: string;
  public author: string;
  public description: string;
  public shortDescription: string;
  public projectFileId: string;
  public images: string;

  constructor(name: string, author: string, description: string, shortDescription: string, projectFileId: string, images: string) {
    super();
    this.name = name;
    this.author = author;
    this.description = description;
    this.shortDescription = shortDescription;
    this.projectFileId = projectFileId;
    this.images = images;
  }
}
