import conf from '../conf/conf'
import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client();
    account;
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }
    // method of create account (`https://appwrite.io/docs/references/cloud/client-web/account#create`)
    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // call another method
                return this.login({email, password})
            } else {
               return userAccount; 
            }
        } catch (error) {
            throw error;
        }
    }
    // method for login (`https://appwrite.io/docs/products/auth/email-password`) note: please check the login part
    async login({email, password}){
        try {
           return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    // method for get current user(`https://appwrite.io/docs/references/cloud/client-web/account#get`) note: please check the GetAccount part
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser ::error",error);
        }
        return null;
    }
    // method for logout (`https://appwrite.io/docs/references/cloud/client-web/account#deleteSessions`) note: please check the Delete Sessions part
    async logout(){
        try {
           return await this.account.deleteSessions() 
        } catch (error) {
            console.log("Appwrite service :: logout ::error",error);
        }
    }
}

const authService = new AuthService()

export default authService;