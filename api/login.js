export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  let email, password;

  if (req.body && typeof req.body === 'object') {
    // Auto-parsed by Vercel
    email = req.body.email;
    password = req.body.password;
  } else if (typeof req.body === 'string') {
    // Raw form-encoded string — parse manually
    const params = new URLSearchParams(req.body);
    email = params.get('email');
    password = params.get('password');
  }

  if (
    email && password &&
    email.trim() === process.env.AUTH_EMAIL &&
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
