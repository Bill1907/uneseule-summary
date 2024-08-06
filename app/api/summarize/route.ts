import { NextRequest, NextResponse } from 'next/server';
import openai from '@/utils/openai/openai';

export async function POST(req: NextRequest) {
  try {
    const { text, maxLength } = await req.json();

    const prompt = `
다음 텍스트를 요약해주세요. 요약은 다음 지침을 따라야 합니다:
1. 원문의 주요 아이디어와 핵심 포인트를 포함해야 합니다.
2. 불필요한 세부사항이나 반복되는 정보는 제외하세요.
3. 요약의 길이는 약 ${maxLength || 150}단어를 넘지 않아야 합니다.
4. 명확하고 간결한 문장을 사용하세요.
5. 원문의 톤과 스타일을 유지하되, 객관적인 관점을 유지하세요.

텍스트:
${text}

요약:`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant that summarizes text accurately and concisely." },
        { role: "user", content: prompt }
      ],
      temperature: 0.5, // 적절한 창의성과 일관성의 균형
      max_tokens: 300, // 요약의 최대 길이 제한
    });

    const summary = response.choices[0].message.content;

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while summarizing the text.' }, { status: 500 });
  }
}