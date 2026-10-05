export const meta = {
  name: 'photon-app-port-swarm-v2',
  description: 'Port 20 existing Photon interactive pages into the iOS app bundle (sonnet workers), each checked for fidelity against its source',
  phases: [
    { title: 'Audition', detail: 'one unit, sonnet worker, checker primed to reject', model: 'sonnet' },
    { title: 'Port', detail: 'one sonnet worker per piece', model: 'sonnet' },
    { title: 'Fidelity', detail: 'diff each port against its source (Article A, D)' },
    { title: 'Rework', detail: 'fix named findings in place', model: 'sonnet' },
  ],
}

const ROOT = '/Users/ciamac/Developer/photon-to-phenomenology'
const SANDBOX = '/Users/ciamac/Developer/ciamac-gallery-stage/experiments/photon-to-phenomenology'
const CONST = `${ROOT}/ios/CONSTITUTION_APP_v2.md`
const PARENT = `${SANDBOX}/PHOTON_CONSTITUTION_v2.md`
const PIECES = `${ROOT}/ios/Photon/Pieces`

const G = s => ({ slug: s, src: `${ROOT}/public/photon/${s}.html`, kind: 'gallery' })
const B = s => ({ slug: s, src: `${ROOT}/public/photon/book/${s}.html`, kind: 'book' })
const L = s => ({ slug: s, src: `${SANDBOX}/${s}/index.html`, kind: 'lab' })
const AUDITION = G('motion-aftereffect')
const UNITS = [
  G('scintillating-grid'), G('ebbinghaus'), G('cornsweet'), G('cafe-wall'), G('ponzo'), G('muller-lyer'),
  B('inverse-problem'), B('checker-shadow'), B('aperture-problem'), B('apparent-motion'), B('troxler-fading'), B('motion-induced-blindness'), B('change-blindness'),
  L('contrast-sensitivity'), L('gestalt-grouping'), L('opponent-afterimage'), L('receptive-field'), L('trichromatic-mixing'),
]

const VERDICT = { type: 'object', required: ['pass', 'findings'], properties: {
  pass: { type: 'boolean' },
  findings: { type: 'array', items: { type: 'object', required: ['severity', 'detail', 'fix'], properties: {
    severity: { enum: ['blocker', 'major', 'minor'] }, detail: { type: 'string' }, fix: { type: 'string' } } } } } }

const BUILD_REPORT = { type: 'object', required: ['written', 'haptic_at', 'changes', 'unsure'], properties: {
  written: { type: 'boolean' },
  haptic_at: { type: 'string', description: 'the exact condition in the code where PhotonApp.haptic fires' },
  changes: { type: 'array', items: { type: 'string' } },
  unsure: { type: 'array', items: { type: 'string' }, description: 'anything you could not decide from the constitution' } } }

function buildPrompt(u) {
  const dest = `${PIECES}/${u.slug}.html`
  const lab = u.kind === 'lab'
    ? `This source is a sandbox page that does NOT use the shared site chrome. It has its own layout and controls. Add <link rel="stylesheet" href="chrome_app.css"> in <head> and <script src="chrome_app.js"></script> before the page's own script so the shell variables and window.PhotonApp exist. Do not add a guided walk. Remove any link that leaves the page (for example a link to a constitution or README file). The page was designed for a desktop browser: make its existing layout fit 402 px wide and 1032 px wide without changing the figure or the words (stack columns, let controls wrap, keep sliders real <input type=range> with min-height 44px).`
    : `This source uses the shared site chrome. Keep its PhotonChrome.init({here, walk ...}) call exactly as written; chrome_app.js provides the same API without navigation.`
  return `You are porting ONE existing interactive web page into an iOS app bundle. This is a port, never a rewrite.

Read these first, in full:
1. ${CONST}  (the standard you are checked against)
2. ${PIECES}/chrome_app.css and ${PIECES}/chrome_app.js  (shared assets; do NOT edit them)
3. The worked example. Run: diff ${ROOT}/public/photon/kanizsa.html ${PIECES}/kanizsa.html   That diff is exactly the size and kind of change expected for a gallery or book page.
4. ${ROOT}/ios/tools/verify_piece.mjs  (the measuring script the orchestrator will run on your file; you cannot run it yourself because the sandbox blocks browsers, so read what it measures and satisfy it by construction)

Your piece: slug "${u.slug}".
Source (read only, never modify): ${u.src}
Write exactly one file: ${dest}

${lab}

Do this:
- Start from a byte copy of the source (cp), then edit the copy.
- Article B: remove the a.ciamac.com analytics script tag; no network URLs; no /photon/ absolute paths; link chrome_app.css and chrome_app.js as siblings; remove page-to-page navigation.
- Article C: viewport meta gains viewport-fit=cover. Any text or control positioned near the top must sit at or below var(--shell-top) (62 px plus the safe area), sides use var(--shell-side), bottom-anchored text sits at calc(var(--shell-bottom) + 62px) or higher. At 402 px wide, text blocks must not overlap each other: stack them (see how the kanizsa port moves #readout under the title at max-width:680px). Every button, link, input and slider needs a 44x44 px hit area. Every mouse handler needs a touch or pointer equivalent, and dragging the figure must not scroll the page.
- Article D: add PhotonApp.haptic('reveal') at the ONE moment the percept appears or breaks, using a threshold the page already computes (usually the same condition that changes the readout text). Fire on the crossing only, guarded by a boolean, never every frame. ${['afterimage','motion-aftereffect','troxler-fading','motion-induced-blindness','opponent-afterimage'].includes(u.slug) ? 'This is a FIXATION piece: also call PhotonApp.hold(true) when the fixation or adaptation period begins and PhotonApp.hold(false) when it ends or is cancelled.' : ''}
- Article A, the one that fails ports: do NOT change figure geometry, colours, luminance values, timings, thresholds, or any sentence a reader sees. Do not "improve" anything. No em dashes anywhere in strings or markup.
- Article A2 exception: if an instruction string tells the reader to click, use a mouse, or use arrow keys, swap ONLY that input word for the touch equivalent and list each swap under changes, prefixed with COPY-SWAP. Change no other wording.
- Article D1 gating: if the percept needs adaptation or fixation time, gate the haptic on the page's own readiness threshold, not on the mode switch. An early tap and the guided walk's timed act() calls must be silent.
- Touch nothing except ${dest}.

When finished, run: diff ${u.src} ${dest}   and confirm every changed line is one of the changes above. Then report.`
}

function checkPrompt(u, primed) {
  const dest = `${PIECES}/${u.slug}.html`
  return `You are the fidelity checker for one ported piece of the Photon iOS app. ${primed ? 'This is an audition of a new, cheaper worker tier: assume the port is wrong until the file itself proves otherwise, and reject on any real defect.' : ''} Never trust the builder's report; read the artifact.

Standard: ${CONST} (read it in full; its parent is ${PARENT}).
Source: ${u.src}
Port: ${dest}

Do this yourself:
1. Run: diff ${u.src} ${dest}   Account for EVERY changed line. A changed line is legitimate only if an article of the constitution requires it (B: network, paths, navigation removed; C: viewport, shell-frame positioning, small-screen stacking, 44 px hit areas, touch equivalents; D: PhotonApp.haptic / PhotonApp.hold).
2. Article A, checked first and hardest: has ANY figure geometry, colour, luminance value, timing, threshold, animation rate, or reader-visible sentence changed, been dropped, or been added? Compare the drawing code and every visible string. A changed stimulus or changed copy is a blocker. Layout-only CSS moves of text blocks are allowed.
3. Article D: find where PhotonApp.haptic fires. It must fire on a threshold crossing tied to the percept (not every frame, not on a decorative timer, not on plain taps), guarded so it fires once per crossing, and must not fire on initial load. For fixation pieces (afterimage, motion-aftereffect, troxler-fading, motion-induced-blindness, opponent-afterimage) PhotonApp.hold(true) must begin with the fixation period and PhotonApp.hold(false) must be reachable on every exit path.
4. Article B3: no leftover navigation, links out, or analytics.
5. Article C4 by reading: every mouse handler has a touch or pointer equivalent; nothing depends on hover.
6. Cosmetic cheating: hidden text, elements shrunk or made transparent to dodge the layout measurements, a haptic call in dead code, or text removed instead of repositioned. Any of these is a blocker.
7. Confirm the shared files are untouched: run   shasum ${PIECES}/chrome_app.js ${PIECES}/chrome_app.css ${PIECES}/catalog.json   and compare with 0091d67ed937196eb479dd874e699a8dc7320c0f (chrome_app.js), 2e939e47f4a6c9de70ef576f3ecb6947b3e66896 (chrome_app.css), d37c65e8d59aeb99b27fd4dde7db78cf4893d315 (catalog.json). A mismatch is a blocker. Also run   git -C ${ROOT} status --short public   which must print nothing.
8. Article A2 exception: the only permitted wording change is swapping a mouse or keyboard input word for its touch equivalent. List every such swap you find as a minor finding so the human can read them; any other wording change is a blocker.

Layout at real sizes is measured separately by a script; do not guess at pixel overlaps. Report only defects you can point to in the file, each with the exact fix. pass=true only with zero blocker and zero major findings.`
}

async function portUnit(u, primed) {
  const dest = `${PIECES}/${u.slug}.html`
  const report = await agent(buildPrompt(u), { label: `port:${u.slug}`, phase: primed ? 'Audition' : 'Port', model: 'sonnet', schema: BUILD_REPORT })
  let verdict = null
  for (let round = 0; round < 2; round++) {
    verdict = await agent(checkPrompt(u, primed), { label: `fidelity:${u.slug}${round ? ':r' + round : ''}`, phase: primed ? 'Audition' : 'Fidelity', schema: VERDICT, effort: 'medium' })
    if (!verdict) return { slug: u.slug, status: 'unverified', report, findings: [{ severity: 'blocker', detail: 'fidelity checker returned no verdict', fix: 're-check' }] }
    const bad = verdict.findings.filter(f => f.severity !== 'minor')
    if (verdict.pass && !bad.length) return { slug: u.slug, status: 'fidelity-passed', rounds: round, report, minor: verdict.findings }
    if (round === 1) return { slug: u.slug, status: 'dispute', report, findings: verdict.findings }
    const findings = bad.length ? bad : verdict.findings
    await agent(`Fix these findings in ${dest}, in place. Correct them, do not dodge them (no hiding, shrinking or deleting text to make a finding go away). The standard is ${CONST}; the source you ported from is ${u.src} and must not be modified. Restore from the source anything the findings say was changed without warrant. Touch no other file. Findings: ${JSON.stringify(findings)}`,
      { label: `rework:${u.slug}`, phase: 'Rework', model: 'sonnet' })
  }
}

phase('Audition')
const audition = await portUnit(AUDITION, true)
log(`audition ${AUDITION.slug}: ${audition.status}`)
if (audition.status !== 'fidelity-passed') {
  return { audition, note: 'sonnet worker did not survive the audition; orchestrator to re-pin workers before fan-out', results: [] }
}

const results = await pipeline(UNITS, u => portUnit(u, false))
const done = [audition, ...results.map((r, i) => r || { slug: UNITS[i].slug, status: 'died' })]
return {
  passed: done.filter(r => r.status === 'fidelity-passed').map(r => ({ slug: r.slug, rounds: r.rounds, haptic_at: r.report && r.report.haptic_at, unsure: r.report && r.report.unsure, minor: r.minor })),
  disputed: done.filter(r => r.status === 'dispute'),
  unverified: done.filter(r => r.status === 'unverified' || r.status === 'died'),
}