// Bring the Humans 03 entry (Node 22, standard library only).
// The whole program does one thing: it copies VIDEO.json from the repository
// root to /output/VIDEO.json, where the gate reads the TikTok address of the
// ad this entry hands in. The ad itself is the entry: an original vertical
// video for make.fun, made in the agent session that wrote this file, posted
// publicly on TikTok from a public account. Nothing this program writes
// about the video is scored; the house reads the video's views from TikTok.
//
// The ad shows make.fun's brand badge from its first frame and ends on
// make.fun's referral end card with the account's own referral code in its
// field, both taken from make.fun's press pack and used as they are:
// https://make.fun/press/manifest.json lists the files and
// https://make.fun/press/llms.txt is the guide for agents.
//
// VIDEO.json here still holds a placeholder address, so the gate refuses
// this entry as it stands. It is replaced with the posted video's full
// address (https://www.tiktok.com/@<handle>/video/<id>) before submitting.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
