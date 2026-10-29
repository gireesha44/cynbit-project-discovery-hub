const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");
const inquiries = [];

const serviceMap = {
  "AI Automation": ["Autonomous AI Agents", "LLM Automation", "AI Stack Integration"],
  "Full-Stack Product": ["Full-Stack Development", "Backend Systems", "Cloud Infrastructure"],
  "SaaS Platform": ["Full-Stack Development", "Backend Systems", "Cloud Infrastructure"],
  "Cloud & Scale": ["Cloud Infrastructure", "Backend Systems", "Legacy Migration"],
  "Growth & SEO": ["Technical SEO", "CRM Automation", "Funnel Optimization"]
};

function send(res, status, data, type = "application/json") {
  res.writeHead(status, {
    "Content-Type": type,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  });
  res.end(type.includes("json") ? JSON.stringify(data) : data);
}

function safeText(value, max = 1200) {
  return String(value || "").trim().replace(/[<>]/g, "").slice(0, max);
}

function serveStatic(req, res) {
  const raw = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  const filePath = path.normalize(path.join(PUBLIC_DIR, raw));
  if (!filePath.startsWith(PUBLIC_DIR)) return send(res, 403, "Forbidden", "text/plain");
  fs.readFile(filePath, (err, data) => {
    if (err) return send(res, 404, "Not found", "text/plain");
    const ext = path.extname(filePath);
    const types = {".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".svg":"image/svg+xml"};
    send(res, 200, data, types[ext] || "application/octet-stream");
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") return send(res, 204, {});

  if (req.url === "/api/health" && req.method === "GET") {
    return send(res, 200, { ok: true, service: "Cynbit Discovery API" });
  }

  if (req.url === "/api/recommend" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 20_000) req.destroy();
    });
    req.on("end", () => {
      try {
        const input = JSON.parse(body || "{}");
        const category = safeText(input.category, 80);
        const goal = safeText(input.goal);
        const budget = safeText(input.budget, 80);
        const timeline = safeText(input.timeline, 80);

        if (!category || !goal || goal.length < 15 || !budget || !timeline) {
          return send(res, 400, { error: "Please complete all required fields and provide a little more project context." });
        }

        const services = serviceMap[category] || ["Full-Stack Development", "Backend Systems"];
        const complexity =
          timeline.includes("2–4") || timeline.includes("ASAP") ? "Accelerated" :
          goal.length > 350 ? "Advanced" : "Standard";

        return send(res, 200, {
          category, services, complexity,
          blueprint: `Start with a focused discovery sprint for ${category.toLowerCase()}, validate the highest-impact workflow, then ship an MVP with measurable success criteria.`,
          nextStep: "A 30-minute technical discovery call to confirm scope, architecture, integrations, and delivery milestones."
        });
      } catch {
        return send(res, 400, { error: "Invalid request." });
      }
    });
    return;
  }

  if (req.url === "/api/inquiries" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try {
        const input = JSON.parse(body || "{}");
        const name = safeText(input.name, 100);
        const email = safeText(input.email, 180);
        const goal = safeText(input.goal);
        if (!name || !email.includes("@") || !goal) return send(res, 400, { error: "Valid name, email, and project goal are required." });

        const ref = "CYN-" + crypto.randomBytes(3).toString("hex").toUpperCase();
        inquiries.push({ ref, createdAt: new Date().toISOString(), ...input, name, email, goal });
        return send(res, 201, { success: true, ref, message: "Discovery brief captured successfully." });
      } catch {
        return send(res, 400, { error: "Invalid request." });
      }
    });
    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, () => console.log(`Cynbit Discovery Hub running on http://localhost:${PORT}`));
