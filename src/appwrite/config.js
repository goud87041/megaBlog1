import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint("https://fra.cloud.appwrite.io/v1")
            .setProject("682d848100220c6154b0");
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                "682d85de002ecbf099db",
                "682d860d000d0b04117d",
                ID.unique(),
                {
                    title,
                    
                    content,
                    featuredImage,
                    status,
                    userId,
                    

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                "682d85de002ecbf099db",
                "682d860d000d0b04117d",
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                "682d85de002ecbf099db",
                "682d860d000d0b04117d",
                slug

            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                "682d85de002ecbf099db",
                "682d860d000d0b04117d",
                slug

            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                "682d85de002ecbf099db",
                "682d860d000d0b04117d",
                queries,


            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                "682d87fb000dac25273b",
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                "682d87fb000dac25273b",
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    // getFilePreview(fileId) {
    //     return this.bucket.getFilePreview(
    //         "682d87fb000dac25273b",
    //         fileId
    //     )
    // }
    getFilePreview(fileId) {
        return this.bucket.getFileView("682d87fb000dac25273b", fileId);
    }


}


const service = new Service()
export default service