import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { id, password } = await request.json()

  if (id === process.env.ADMIN_ID && password === process.env.ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_auth', process.env.ADMIN_SECRET ?? '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: '/',
    })
    return response
  }

  return NextResponse.json({ success: false, message: '아이디 또는 비밀번호가 일치하지 않습니다.' }, { status: 401 })
}
