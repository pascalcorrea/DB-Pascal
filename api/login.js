export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  if (
    email === process.env.AUTH_EMAIL &&
    password === process.env.AUTH_PASSWORD
  ) {
    res.setHeader(
      'Set-Cookie',
      'brootal_auth=1; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400'
    );
    res.redirect(302, '/');
  } else {
    res.redirect(302, '/login.html?error=1');
  }
}
