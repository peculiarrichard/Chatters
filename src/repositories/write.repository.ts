import Article from "@/schema/write/ArticleSchema";
import { article } from "@/models/apiTypes/write";

export default class WriteRepository {
  static async createNewArticle(article: article) {
    try {
      const newArticle = new Article(article);
      await newArticle.save();
      return newArticle;
    } catch (error: any) {
      throw new Error(`Error retrieving onboarding details, ${error.message}`);
    }
  }

  static async findExistingArticle(title: string, userId: string) {
    try {
      const existingArticle = await Article.findOne({ title: title, userId: userId });
      return existingArticle;
    } catch (error: any) {
      throw new Error(`Error retrieving onboarding details, ${error.message}`);
    }
  }
}
