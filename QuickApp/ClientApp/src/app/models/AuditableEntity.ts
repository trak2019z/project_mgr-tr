export class AuditableEntity {
  public updatedDate:Date;
  public createdDate: Date;

  constructor(updatedDate: Date,  createdDate: Date) {
    this.updatedDate = updatedDate;
    this.createdDate = createdDate;
  }
}
