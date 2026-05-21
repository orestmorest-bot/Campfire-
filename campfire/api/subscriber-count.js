export default async function handler(req, res) {
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;
  const apiKey = process.env.BEEHIIV_API_KEY;

  if (!pubId || !apiKey) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions?status=active&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return res.status(500).json({ error: 'Fetch failed' });
    }

    const data = await response.json();
    const count = data.total_results ?? 0;

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json({ count });
  } catch (err) {
    console.error('Subscriber count error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
