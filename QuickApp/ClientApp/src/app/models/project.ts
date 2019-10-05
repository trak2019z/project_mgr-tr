import { AuditableEntity } from "./auditableEntity";

export class Project extends AuditableEntity {
  public id: number;
  public name: string;
  public author: string;
  public description: string;
  public shortDescription: string;
  public projectFile: ProjectFile;
  public images: Image;
  public views:number;
  constructor(name: string,
    author: string,
    description: string,
    shortDescription: string) {
    super();
    this.name = name;
    this.author = author;
    this.description = description;
    this.shortDescription = shortDescription;
  }
}

export class GetProjectsResponse extends AuditableEntity {
  public id: number;
  public name: string;
  public author: string;
  public description: string;
  public shortDescription: string;
  public projectFileId: ProjectFile;
  public images: Image;

  constructor(name: string, author: string, description: string, shortDescription: string, projectFileId: ProjectFile, images: Image) {
    super();
    this.name = name;
    this.author = author;
    this.description = description;
    this.shortDescription = shortDescription;
    this.projectFileId = projectFileId;
    this.images = images;
  }
}

export class ProjectFile extends AuditableEntity {
  public id: string;
  public downloads: number;
  public path: string;

  constructor(id: string, downloads: number, path: string) {
    super();
    this.id = id;
    this.downloads = downloads;
    this.path = path;
  }
}

export class Image extends AuditableEntity {
  public id: string;
  public path: string;

  constructor(id: string, path: string) {
    super();
    this.id = id;
    this.path = path;
  }
  }


