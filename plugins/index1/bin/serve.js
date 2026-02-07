#!/usr/bin/env node
'use strict';

const { spawnSync } = require('child_process');
const os = require('os');
const path = require('path');

const isWin = os.platform() === 'win32';

function run(cmd, cmdArgs, opts) {
  return spawnSync(cmd, cmdArgs, { stdio: 'inherit', shell: isWin, ...opts });
}

function hasCmd(cmd) {
  const r = spawnSync(isWin ? 'where' : 'which', [cmd], { stdio: 'pipe', shell: isWin });
  return r.status === 0;
}

function fail(msg) {
  process.stderr.write(msg + '\n');
  process.exit(1);
}

// 1. Already installed? Start MCP server directly.
if (hasCmd('index1')) {
  const r = run('index1', ['serve']);
  process.exit(r.status || 0);
}

// Also check ~/.local/bin (pipx default)
const pipxBin = path.join(os.homedir(), '.local', 'bin', 'index1');
try {
  require('fs').accessSync(pipxBin, require('fs').constants.X_OK);
  const r = run(pipxBin, ['serve']);
  process.exit(r.status || 0);
} catch {}

// 2. Not installed. Try auto-install.
process.stderr.write('index1 not found, auto-installing...\n');

if (hasCmd('pipx')) {
  process.stderr.write('→ pipx install index1\n');
  const install = run('pipx', ['install', 'index1']);
  if (install.status !== 0) {
    fail('❌ pipx install failed. Run manually: pipx install index1');
  }
} else if (hasCmd('pip3')) {
  process.stderr.write('→ pip3 install index1\n');
  const install = run('pip3', ['install', 'index1']);
  if (install.status !== 0) {
    fail('❌ pip3 install failed. Run manually: pip3 install index1');
  }
} else if (hasCmd('pip')) {
  process.stderr.write('→ pip install index1\n');
  const install = run('pip', ['install', 'index1']);
  if (install.status !== 0) {
    fail('❌ pip install failed. Run manually: pip install index1');
  }
} else {
  fail(
    '❌ Python not found. Please install Python 3.10+ first:\n' +
    '   macOS:   brew install python\n' +
    '   Ubuntu:  sudo apt install python3-pip\n' +
    '   Windows: https://python.org/downloads\n\n' +
    '   Then run: pipx install index1'
  );
}

// 3. Start MCP server after installation.
if (hasCmd('index1')) {
  const r = run('index1', ['serve']);
  process.exit(r.status || 0);
}

try {
  require('fs').accessSync(pipxBin, require('fs').constants.X_OK);
  const r = run(pipxBin, ['serve']);
  process.exit(r.status || 0);
} catch {}

fail(
  '❌ Installed but index1 not found in PATH.\n' +
  '   Try: pipx ensurepath && source ~/.bashrc\n' +
  '   Then restart Claude Code.'
);
