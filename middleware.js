export const config = {
  matcher: ['/((?!login\\.html|api/).*)'],
};

export default function middleware(request) {
  const cookie = request.headers.get('cookie') || '';
  const isAuthed = cookie.split(';').some((c) => c.trim() === 'brootal_auth=1');

  if (!isAuthed) {
    return Response.redirect(new URL('/login.html', request.url), 302);
  }
}
