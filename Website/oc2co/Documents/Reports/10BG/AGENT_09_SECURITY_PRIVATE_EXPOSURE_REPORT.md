# AGENT 09 SECURITY PRIVATE EXPOSURE REPORT

## Agent Lens
SECURITY / PRIVATE EXPOSURE AGENT. Scan for BrainHub, BBWAAS, /mnt/c/, localhost, .env, tokens, secrets, private paths in public website source. Check if agw/ or agent reports would be exposed on GitHub Pages. Recommend privacy cleanup. Do not print secrets.

## Files / URLs Checked
Full Source/oc2co_website/ grep for patterns. Sub pages, sidepanel, mcp server, JS, HTML, MD. Cross with GitHub tree (agw/ present on branch).

## Confirmed Facts
- Hardcoded private paths in bbwaas_mcp/server.js: BRAINHUB = '/mnt/c/Users/Sagou/Documents/BrainHub', many absolute paths.
- sidepanel.js: window.open with /mnt/c/... paths to iris_oracle etc.; MCP_BASE = 'http://localhost:8787'
- sidepanel.html and JS contain "BBWAAS", "AGENT_WORKSPACE", "Source: local BrainHub"
- server.js has localhost:8787, ngrok tunnel refs, full BrainHub paths.
- No actual secret strings (OPENAI_*, STRIPE_SECRET, tokens) in static client files (good).
- agw/ folder with PACKETS, AGENT_REPORTS, WORKSPACE present on GitHub branch (will be served publicly on Pages).
- Polsia and www.oc2co.com hardcodes are public OK.
- Some localhost examples in payments comments (dev).

## PASS Items
- No credential/secret keys reproduced in static HTML/CSS/JS.
- Comments in payments files warn "NEVER put secret keys".
- Public routes do not leak payment logic.

## WARN Items
- agw/ on public repo → private agent packets, BBWAAS internal reports will be world readable on www.oc2co.com/agw/...
- Absolute /mnt/c/ paths and localhost in JS will break or expose private FS when viewed.
- sidepanel and mcp server code is dev tooling; should not be in public site root.

## FAIL Items
- Private BrainHub/BBWAAS paths and localhost hardcodes in source that ships to GH Pages.
- Risk of internal agent workflows and local workspace structure exposed.

## Exact Evidence
Grep hits:
- '/mnt/c/Users/Sagou/Documents/BrainHub' in server.js and sidepanel.js
- 'localhost:8787' multiple
- 'BBWAAS' strings in HTML/JS
- agw/ confirmed in GitHub tree from AG2.

## Recommended Fixes
- Remove or .gitignore agw/, bbwaas_*, sidepanel, mcp/ from public repo root (keep only in BBWAAS internal).
- Replace all /mnt/c/ and localhost with relative or config placeholders in any public files.
- Never include BBWAAS command center or packet files in the oc2co_website Source for deploy.
- Audit future pushes; use clean subtree or separate public dir if needed.
- For PR branch: clean before any visual patch.

## Do Not Touch
- Actual secrets (none printed).
- Payment backend code.

## Open Questions
- Is agw/ intended to be public documentation or internal only?

## Next Action
Flag in synthesis: high priority cleanup before or with Patch Group A. Do not expose private files on live site. Steven approval for any deletion.