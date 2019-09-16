import { AuditableEntity } from "./auditableEntity";

export class Project extends AuditableEntity
{
  public id:number;
public name:string;
public author:string;
public description:string;
public  shortDescription:string;
public  linkToFile:string;
public images:string[];
public  views:number;
  public downloads: number;

  constructor(name: string, author: string, description: string, shortDescription: string, linkToFile: string, images: string[], views: number, downloads: number, updatedDate: Date, createdDate: Date) {
    super(updatedDate, createdDate);
    this.name = name;
    this.author = author;
    this.description = description;
    this.shortDescription = shortDescription;
    this.linkToFile = linkToFile;
    this.images = images;
  }
}
