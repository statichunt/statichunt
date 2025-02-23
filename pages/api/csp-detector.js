export default async function detectFrameAncestorsCSP(req, res) {
  let hasFrameAncestorsCSP = false;
  try {
    const response = await fetch(JSON.parse(req.body).url, {
      method: "HEAD",
      mode: "cors",
    });

    // Get all response headers
    const cspHeader = response.headers.get("content-security-policy");
    if (cspHeader) {
      hasFrameAncestorsCSP = cspHeader.includes("frame-ancestors");
    }

    // Check for CSP-Report-Only header as well
    if (!hasFrameAncestorsCSP) {
      const cspReportHeader = response.headers.get(
        "content-security-policy-report-only",
      );
      if (cspReportHeader) {
        hasFrameAncestorsCSP = cspReportHeader.includes("frame-ancestors");
      }
    }

    res.status(200).json({ hasFrameAncestorsCSP });
  } catch (error) {
    console.error("Error detecting CSP:", error);
    res.status(500).json({ error: error });
  }
}
