import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { getRandomInterviewCover } from '@/lib/utils';
import { db } from '@/firebase/admin';

export async function GET() {
  return NextResponse.json({ success: true, data: 'THANK YOU!' }, { status: 200 });
}

export async function POST(request: Request) {
  try {
    // ✅ Validate content type
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { success: false, error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    // ✅ Safely read body
    const bodyText = await request.text();
    if (!bodyText) {
      return NextResponse.json(
        { success: false, error: 'Request body is missing' },
        { status: 400 }
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(bodyText);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON format' },
        { status: 400 }
      );
    }

    const { type, role, level, techstack, amount, userid } = parsed;

    // ✅ Required field check
    if (!type || !role || !level || !techstack || !amount || !userid) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // ✅ Call Gemini model
    const { text: questions } = await generateText({
      model: google('gemini-2.0-flash-001'),
      prompt: `Prepare questions for a job interview.
The job role is ${role}.
The job experience level is ${level}.
The tech stack used in the job is: ${techstack}.
The focus between behavioural and technical questions should lean towards: ${type}.
The amount of questions required is: ${amount}.
Please return only the questions, without any additional text.
The questions are going to be read by a voice assistant, so do not use "/" or "*" or any other special characters which might break the voice assistant.
Return the questions formatted like this:
["Question 1", "Question 2", "Question 3"]

Thank You <3`
    });

    // ✅ Save to Firestore
    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(','),
      questions: JSON.parse(questions),
      userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString()
    };

    await db.collection('interview').add(interview);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[INTERVIEW_GENERATION_ERROR]', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
