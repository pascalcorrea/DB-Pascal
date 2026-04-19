export default function handler(req, res) {
  res.setHeader(
    'Set-Cookie',
    'brootal_auth=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0'
  );
  res.redirect(302, '/login.html');
}
