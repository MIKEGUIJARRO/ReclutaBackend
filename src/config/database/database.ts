export interface Database {
  testConnection: Function;
  closeConnection: Function;
  syncAllModels: Function;
  getDatabaseInstance: Function;
}
