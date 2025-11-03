import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";

// Gemini API configuration  
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

// System prompt for Wayaak
const WAYAAK_SYSTEM_PROMPT = `أنت وياك، المساعد الذكي لمنصة "بيت الريف" في مدينة العين، الإمارات العربية المتحدة.

دورك:
- مساعدة المستخدمين في جميع احتياجاتهم المتعلقة بالبناء والتصميم
- تقديم نصائح احترافية حول البناء والتشطيبات
- مساعدة في اختيار المواد والمقاولين
- الإجابة على الأسئلة حول الأسعار والتكاليف
- تقديم معلومات عن العقارات والحرفيين

أسلوبك:
- احترافي ودود
- استخدم اللغة العربية الفصحى المبسطة
- كن واضحاً ومباشراً
- قدم معلومات دقيقة ومفيدة
- استخدم الرموز التعبيرية بشكل معتدل

معلومات عن المنصة:
- الموقع: مدينة العين، الإمارات
- الخدمات: حاسبة التكلفة، حاسبة المساحات، اختيار المواد، العقارات، الحرفيين
- جميع الأدوات مجانية
- نظام مصادقة آمن
- مقاولون وحرفيون معتمدون

تذكر: أنت تمثل "بيت الريف" وتساعد في تحقيق حلم البناء للجميع!`;

export const chatRouter = router({
  sendMessage: publicProcedure
    .input(
      z.object({
        message: z.string().min(1),
        conversationHistory: z.array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string(),
          })
        ).optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const history = input.conversationHistory || [];
        const messages = [
          {
            role: "user",
            parts: [{ text: WAYAAK_SYSTEM_PROMPT }],
          },
          ...history.map((msg) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
          })),
          {
            role: "user",
            parts: [{ text: input.message }],
          },
        ];

        const response = await fetch(\`\${GEMINI_API_URL}?key=\${GEMINI_API_KEY}\`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: messages,
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        });

        if (!response.ok) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "فشل في الاتصال بالمساعد الذكي",
          });
        }

        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!reply) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "لم يتم الحصول على رد من المساعد الذكي",
          });
        }

        return {
          message: reply,
          timestamp: new Date().toISOString(),
        };
      } catch (error) {
        console.error("Chat error:", error);
        
        if (error instanceof TRPCError) {
          throw error;
        }
        
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "حدث خطأ أثناء معالجة رسالتك",
        });
      }
    }),

  getWelcomeMessage: publicProcedure.query(() => {
    return {
      message: "مرحباً بك في بيت الريف! أنا وياك، مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟",
      timestamp: new Date().toISOString(),
    };
  }),
});
