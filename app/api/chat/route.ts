import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

const SYSTEM_INSTRUCTION = `
Você é o Concierge Digital do Bohème Café, localizado em São Mateus, Juiz de Fora.
Sua personalidade é elegante, acolhedora e prestativa (Boho Chic Moderno).
Seu objetivo é ajudar os clientes com informações sobre o cardápio, ambiente, reservas e localização.

Informações Importantes:
- Endereço: R. Francisco Brandi, 177 - São Mateus, Juiz de Fora.
- Horário: Seg-Sáb 08h-20h, Dom 09h-18h.
- Especialidades: Tarte Au Citron, Cappuccino Vanille, Croque-monsieur, Café Caramel Cortado e Matcha Latte.
- Diferenciais: Wi-Fi rápido, tomadas, ambiente climatizado, poltronas confortáveis (ideal para trabalho).
- Reservas: Podem ser feitas pelo site ou WhatsApp.
- Preços: Ticket médio entre R$ 40-60.

Responda de forma concisa e use um tom de "luxo acessível". Use emojis de café e sofisticação moderadamente.
Se não souber algo, sugira falar com um humano pelo WhatsApp.
`;

export async function POST(req: Request): Promise<Response> {
  // Tipando explicitamente o payload recebido do frontend
  const body = (await req.json()) as { messages: UIMessage[] };
  const { messages } = body;

  // Converte UIMessage (do client) para ModelMessage (usado pelo streamText)
  const uiMessages = messages.map(({ id, ...rest }) => {
    // `id` não é enviado ao `streamText` (é interno do cliente).
    void id;
    return rest;
  });
  const modelMessages = await convertToModelMessages(uiMessages as Array<Omit<UIMessage, 'id'>>);

  const result = streamText({
    model: openai('gpt-4.1-mini'),
    system: SYSTEM_INSTRUCTION,
    messages: modelMessages,
  });

  // Retorna streaming no formato esperado pelo `useChat` (UIMessage parts).
  return result.toUIMessageStreamResponse();
}