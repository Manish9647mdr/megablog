import conf from '../conf/conf'
import { Client, ID, Databases, Storage, Query } from 'appwrite'

export class Service{
    client = new Client();
    databases;
    bucket;         // storage

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    // method for the create post (`https://appwrite.io/docs/products/databases/documents`)⇒CreateDocument
    async createPost ({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectioId,
                slug,
                {
                    title, 
                    content, 
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }
    // method for the update post(`https://appwrite.io/docs/references/cloud/client-web/databases#updateDocument`)⇒Update Document
    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectioId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error); 
        }
    }
    // method for the delete post (`https://appwrite.io/docs/references/cloud/client-web/databases`)=>Delete Document
    async deletePost({slug}){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectioId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error); 
            return false 
        }
    }
    // method for the get 1 post (`https://appwrite.io/docs/references/cloud/client-web/databases#getDocument`) ⇒Get Document
    async getPost({slug}){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectioId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error); 
            return false
        }
    }
    // method for the get all post which is actived(`https://appwrite.io/docs/references/cloud/client-web/databases#listDocuments`) and (https://appwrite.io/docs/products/databases/queries#query-class)⇒List Document
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectioId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts queries:: error", error); 
            return false
        }
    }
    // file upload services

    // method for the upload file(`https://appwrite.io/docs/references/cloud/client-web/storage#createFile`)⇒Create File
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile:: error", error); 
            return false 
        }
    }
    // mehtod for the delete file (`https://appwrite.io/docs/references/cloud/client-web/storage#deleteFile`)⇒Delete File
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile:: error", error); 
            return false 
        }
    }
    // method for the preview file (`https://appwrite.io/docs/references/cloud/client-web/storage#getFilePreview`)⇒Get File Preview
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service()

export default service