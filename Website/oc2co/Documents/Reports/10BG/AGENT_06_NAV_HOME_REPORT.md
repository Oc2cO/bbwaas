# AGENT 06 NAV HOME REPORT

## Agent Lens
NAVIGATION / HOME-LINK AGENT. Verify every public page has a visible, correct return to canonical homepage https://www.oc2co.com (or equivalent relative that resolves). Flag traps, weak relatives, missing nav on app/prototype pages. Minimal safe patches only.

## Files / URLs Checked
All HTML in Source/oc2co_website/ : index.html, store/index.html, checkout/index.html, arcade/index.html, cinematic/index.html, iris_oracle/index.html, success/index.html, cancel/index.html, checkout.html, intro-animation.html. Subdomains copies noted as broken.

## Confirmed Facts
- index.html: <a href="./">Home</a> (self)
- store/index.html: <a href="https://www.oc2co.com">Home</a>
- checkout/index.html: multiple - <a href="https://www.oc2co.com">Home</a>, <a href="../">← Home (Oc2cO)</a>, and footer links
- arcade/index.html: <a href="https://www.oc2co.com">Home</a>
- cinematic/index.html: <a href="https://www.oc2co.com">Home</a>
- iris_oracle/index.html: <a href="https://www.oc2co.com" class="home-link">← Oc2cO Home</a> (fixed position, good)
- success/index.html, cancel/index.html: <a href="https://www.oc2co.com">Home</a> + Back to Store
- intro-animation.html: <a href="index.html">← Home (Oc2cO)</a>
- Most sub pages also link Store/Arcade to Polsia URLs.

## PASS Items
- All main route pages (store, checkout, arcade, cinematic, iris_oracle, success, cancel, index, intro) have at least one Home return link to www.oc2co.com or equivalent that works in Source context.
- iris_oracle has prominent fixed Home link.
- checkout has both top nav and explicit ← Home + footer.

## WARN Items
- Some Home use full https://www.oc2co.com (safe but external); some use ../ (works only when served from subdir root).
- ../#connect and #projects / #connect are dead anchors (no ids on target homepage sections).
- Checkout "Back to Store" points to Polsia (inconsistent with local /checkout sibling).
- Subdomains/ copies have broken ../ Home (point to non-existent Subdomains/index.html).

## FAIL Items
- No true trap pages found in core public routes, but dead anchors and inconsistent Polsia vs local links create UX issues.
- No mobile-specific nav audit done (assumed CSS responsive from other agents).

## Exact Evidence
Grep results:
- arcade: <a href="https://www.oc2co.com">Home</a>
- iris_oracle: <a href="https://www.oc2co.com" class="home-link">← Oc2cO Home</a>
- checkout: <a href="../">← Home (Oc2cO)</a> and https variants
- cinematic: Home link at bottom + Polsia links
- Multiple ../#connect on arcade/store

Live curl confirmed pages load.

## Recommended Fixes (minimal, after synthesis)
- Standardize all Home to https://www.oc2co.com or relative / for GitHub Pages.
- Fix or remove dead #projects / #connect (add ids to homepage or change to /#projects or remove).
- Ensure checkout "Back to Store" points to /store/ or Polsia with clear label.
- Do not push Subdomains/ as-is; they are not self-contained.

## Do Not Touch
- Payment/JS logic.
- Visuals beyond Home text.
- DNS.

## Open Questions
- Should all Home use relative root or absolute www to survive subdir deploys?

## Next Action
Include in synthesis patch Group A (add/strengthen Home where weak). Verify after patch on branch.