export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    const APPS_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbyEJCnEl9l4XMd0S7CHTUFdyq7gRthpqrRygWlI3tm4-ykJWTc9wW6oY9dKI9K-fiJL/exec";

    const body = req.body || {};
    const forward = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await forward.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ ok: false, error: e?.message || String(e) });
  }
}
