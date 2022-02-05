export interface IStorageProvider {
   save(file: string, folderName: string): Promise<string>;
   delete(file: string, folderName: string): Promise<void>;
}