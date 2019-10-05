import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { FileEndpointService } from "./file-endpoint.service";

@Injectable()
@Injectable()
export class FileService {

  constructor(
    private authService: AuthService,
    private fileEndpoint: FileEndpointService) {
  }
  downloadFile(id:string) {
    return this.fileEndpoint.getFileDownloadEndpoint(id);
  }
}
