#!/bin/bash
# orgframework — Install into a Claude Code project
# Usage: bash bin/install.sh [target-dir]
# If no target-dir given, installs in current directory.

set -e

TARGET="${1:-$(pwd)}"
CLAUDE_DIR="$TARGET/.claude"
SKILL_DIR="$CLAUDE_DIR/skills"
ORG_DIR="$CLAUDE_DIR/orgframework"

# Read version from package.json
VERSION=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$(dirname "$0")/../package.json','utf-8')).version)")

echo "Installing orgframework v$VERSION into $TARGET..."

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Create directories
mkdir -p "$SKILL_DIR/orgframework"
mkdir -p "$ORG_DIR/styles"
mkdir -p "$ORG_DIR/regions"
mkdir -p "$ORG_DIR/industries"
mkdir -p "$ORG_DIR/stages"
mkdir -p "$ORG_DIR/presets"
mkdir -p "$ORG_DIR/definitions"
mkdir -p "$ORG_DIR/adaptations"
mkdir -p "$ORG_DIR/diagnostics"
mkdir -p "$ORG_DIR/visualizer"
mkdir -p "$ORG_DIR/comparison"
mkdir -p "$ORG_DIR/relationship-map"
mkdir -p "$ORG_DIR/compensation"
mkdir -p "$ORG_DIR/maturity"
mkdir -p "$ORG_DIR/expansion"
mkdir -p "$ORG_DIR/hiring"
mkdir -p "$ORG_DIR/role-to-task"
mkdir -p "$ORG_DIR/crisis"
mkdir -p "$ORG_DIR/raci"
mkdir -p "$ORG_DIR/reverse-org"
mkdir -p "$ORG_DIR/budget"
mkdir -p "$ORG_DIR/similarity"
mkdir -p "$ORG_DIR/timeline"
mkdir -p "$ORG_DIR/culture"
mkdir -p "$ORG_DIR/vacancy"
mkdir -p "$ORG_DIR/health-monitor"

# Copy skill definition
if [ -f "$SCRIPT_DIR/.claude/skills/orgframework/SKILL.md" ]; then
  cp "$SCRIPT_DIR/.claude/skills/orgframework/SKILL.md" "$SKILL_DIR/orgframework/SKILL.md"
  echo "  ✓ Skill: .claude/skills/orgframework/SKILL.md"
fi

# Copy index and additions
cp "$SCRIPT_DIR/.claude/orgframework/index.json" "$ORG_DIR/index.json" 2>/dev/null && echo "  ✓ Index: index.json (v$VERSION)" || true
cp "$SCRIPT_DIR/.claude/orgframework/additions.json" "$ORG_DIR/additions.json" 2>/dev/null && echo "  ✓ Additions: additions.json" || true

# Copy region profiles
cp "$SCRIPT_DIR/.claude/orgframework/regions/"*.json "$ORG_DIR/regions/" 2>/dev/null
RCOUNT=$(ls "$ORG_DIR/regions/"*.json 2>/dev/null | wc -l | tr -d ' ')
echo "  ✓ Regions: $RCOUNT region profiles"

# Copy industry profiles
cp "$SCRIPT_DIR/.claude/orgframework/industries/"*.json "$ORG_DIR/industries/" 2>/dev/null
ICOUNT=$(ls "$ORG_DIR/industries/"*.json 2>/dev/null | wc -l | tr -d ' ')
echo "  ✓ Industries: $ICOUNT industry profiles"

# Copy stage profiles
cp "$SCRIPT_DIR/.claude/orgframework/stages/"*.json "$ORG_DIR/stages/" 2>/dev/null
SCOUNT=$(ls "$ORG_DIR/stages/"*.json 2>/dev/null | wc -l | tr -d ' ')
echo "  ✓ Stages: $SCOUNT stage profiles"

# Copy preset org structures
cp "$SCRIPT_DIR/.claude/orgframework/presets/"*.json "$ORG_DIR/presets/" 2>/dev/null
PCOUNT=$(ls "$ORG_DIR/presets/"*.json 2>/dev/null | wc -l | tr -d ' ')
echo "  ✓ Presets: $PCOUNT org structure templates"

# Copy role definitions
cp "$SCRIPT_DIR/.claude/orgframework/definitions/definitions.json" "$ORG_DIR/definitions/definitions.json" 2>/dev/null
echo "  ✓ Definitions: loaded"

# Copy adaptive learning files
cp "$SCRIPT_DIR/.claude/orgframework/adaptations/profile.json" "$ORG_DIR/adaptations/profile.json" 2>/dev/null || true
cp "$SCRIPT_DIR/.claude/orgframework/adaptations/resolver.guidance.md" "$ORG_DIR/adaptations/resolver.guidance.md" 2>/dev/null || true
echo "  ✓ Adaptations: profile + resolver"

# Copy diagnostics
cp "$SCRIPT_DIR/.claude/orgframework/diagnostics/troubleshoot.json" "$ORG_DIR/diagnostics/troubleshoot.json" 2>/dev/null || true
echo "  ✓ Diagnostics: troubleshoot engine"

# Copy org systems
cp "$SCRIPT_DIR/.claude/orgframework/visualizer/"*.json "$ORG_DIR/visualizer/" 2>/dev/null; cp "$SCRIPT_DIR/.claude/orgframework/visualizer/"*.js "$ORG_DIR/visualizer/" 2>/dev/null || true
cp "$SCRIPT_DIR/.claude/orgframework/comparison/"* "$ORG_DIR/comparison/" 2>/dev/null || true
cp "$SCRIPT_DIR/.claude/orgframework/relationship-map/"*.js "$ORG_DIR/relationship-map/" 2>/dev/null || true
cp "$SCRIPT_DIR/.claude/orgframework/compensation/"*.json "$ORG_DIR/compensation/" 2>/dev/null || true
cp "$SCRIPT_DIR/.claude/orgframework/maturity/"* "$ORG_DIR/maturity/" 2>/dev/null || true
cp "$SCRIPT_DIR/.claude/orgframework/expansion/"*.json "$ORG_DIR/expansion/" 2>/dev/null || true
cp "$SCRIPT_DIR/.claude/orgframework/hiring/"* "$ORG_DIR/hiring/" 2>/dev/null || true
cp "$SCRIPT_DIR/.claude/orgframework/role-to-task/"*.js "$ORG_DIR/role-to-task/" 2>/dev/null || true
cp "$SCRIPT_DIR/.claude/orgframework/crisis/"*.json "$ORG_DIR/crisis/" 2>/dev/null || true
cp "$SCRIPT_DIR/.claude/orgframework/raci/"* "$ORG_DIR/raci/" 2>/dev/null || true
cp "$SCRIPT_DIR/.claude/orgframework/reverse-org/"*.js "$ORG_DIR/reverse-org/" 2>/dev/null || true
cp "$SCRIPT_DIR/.claude/orgframework/budget/"* "$ORG_DIR/budget/" 2>/dev/null || true
cp "$SCRIPT_DIR/.claude/orgframework/similarity/"*.js "$ORG_DIR/similarity/" 2>/dev/null || true
cp "$SCRIPT_DIR/.claude/orgframework/timeline/"* "$ORG_DIR/timeline/" 2>/dev/null || true
cp "$SCRIPT_DIR/.claude/orgframework/culture/"* "$ORG_DIR/culture/" 2>/dev/null || true
cp "$SCRIPT_DIR/.claude/orgframework/vacancy/"*.js "$ORG_DIR/vacancy/" 2>/dev/null || true
cp "$SCRIPT_DIR/.claude/orgframework/health-monitor/"* "$ORG_DIR/health-monitor/" 2>/dev/null || true
echo "  ✓ Systems: visualizer, comparison, relationship-map, compensation, maturity, expansion, hiring, role-to-task, crisis, raci, reverse-org, budget, similarity, timeline, culture, vacancy, health-monitor"

# Copy recommendations
cp "$SCRIPT_DIR/.claude/orgframework/recommendations.md" "$ORG_DIR/recommendations.md" 2>/dev/null || true
echo "  ✓ Roadmap: recommendations for next 10 features"

# Copy role files
echo "  → Copying reference roles (11,277+ files)..."
cp "$SCRIPT_DIR/.claude/orgframework/styles/"*.md "$ORG_DIR/styles/" 2>/dev/null
COUNT=$(ls "$ORG_DIR/styles/"*.md 2>/dev/null | wc -l | tr -d ' ')
echo "  ✓ Roles: $COUNT reference role files"

echo ""
echo "Done! orgframework v$VERSION installed."
echo ""
echo "Quick start:"
echo "  /orgframework I need to hire a senior backend engineer in Berlin"
echo "  /orgframework we're launching a new product in Brazil, what's the org plan"
echo "  /orgframework our Series B fintech needs a compliance structure"
echo "  /orgframework design a hospital respiratory therapy department"
echo "  /orgframework what team structure for a remote-first design agency"
