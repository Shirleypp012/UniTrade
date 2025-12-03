import { GoogleGenAI } from "@google/genai";
import { Category } from "../types";

const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.warn("API Key not found in environment");
        return null;
    }
    return new GoogleGenAI({ apiKey });
}

export const generateProductDescription = async (title: string, category: Category, price: number): Promise<string> => {
    const ai = getClient();
    if (!ai) return "请配置 API KEY 以使用 AI 描述生成功能。";

    const prompt = `
    你是一个校园二手交易助手。请根据以下信息，生成一段吸引人的商品描述（中文，100字以内）。
    语气要诚恳、适合大学生，突出性价比。
    
    商品标题: ${title}
    分类: ${category}
    售价: ${price}
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text || "无法生成描述，请重试。";
    } catch (error) {
        console.error("AI Generation Error:", error);
        return "AI 服务暂时不可用。";
    }
};

export const estimatePrice = async (title: string, category: Category): Promise<string> => {
     const ai = getClient();
    if (!ai) return "";

    const prompt = `
    请根据商品 "${title}" (分类: ${category}) 估算一个合理的二手价格范围（人民币）。
    仅返回价格范围数字，例如 "50-100"。不要其他文字。
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text.trim();
    } catch (error) {
        return "";
    }
}