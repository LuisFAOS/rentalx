import fs from "fs"
import {resolve} from "path"
import upload from "../../../../../config/upload";

import { IStorageProvider } from "../IStorageProvider";


export class LocalStorageProvider implements IStorageProvider{
   async save(file: string, folderName: string): Promise<string> {
      await fs.promises.rename(
         resolve(upload.tmpFolder, file),
         resolve(`${upload.tmpFolder}/${folderName}`, file)
      )

      return file
   }

   async delete(file: string, folderName: string): Promise<void> {
      const filepath = resolve(`${upload.tmpFolder}/${folderName}`, file)

      try {
         await fs.promises.stat(filepath)
      } catch (error) {
         return
      }
   
      await fs.promises.unlink(filepath)
   }
   
}