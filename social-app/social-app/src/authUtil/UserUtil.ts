export class UserUtil {

    public static isAuthenticated():boolean{
        let storageKey:string | undefined = process.env.REACT_APP_STORAGE_KEY;
        if(storageKey){
            return !!sessionStorage.getItem(storageKey);
        }
        return false;
    }

    public static getStorageKey():string | null{
        let storageKey:string | undefined = process.env.REACT_APP_STORAGE_KEY;
        if(storageKey){
            return sessionStorage.getItem(storageKey);
        }
        return null;
    }
}