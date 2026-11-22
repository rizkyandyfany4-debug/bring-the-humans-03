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
// VIDEO.json holds the real posted video's full address:
// https://www.tiktok.com/@rizkaa.adisty/video/7711001287151717652
//
// Before copying, the program checks that address is a TikTok video address
// (https://www.tiktok.com/@<handle>/video/<digits>, m.tiktok.com also
// allowed) and refuses to copy a file that is missing, unparseable, or
// names anything else, so a bad VIDEO.json fails loudly instead of
// reaching the gate.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// A TikTok video's full address: https://www.tiktok.com/@<handle>/video/<id>
// (m.tiktok.com also accepted; the id is digits only). Anything else — a
// short link, a photo post, another site — is refused here.
const VIDEO_URL =
  /^https:\/\/(www\.|m\.)?tiktok\.com\/@[A-Za-z0-9_.]+\/video\/[0-9]+\/?$/;

const source = join(BOT_DIR, 'VIDEO.json');

let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(source, 'utf8'));
} catch (err) {
  console.error(`VIDEO.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

const url = (parsed as { url?: unknown } | null)?.url;
if (typeof url !== 'string' || !VIDEO_URL.test(url)) {
  console.error(
    `VIDEO.json does not hold a TikTok video address (expected https://www.tiktok.com/@<handle>/video/<id>, got ${JSON.stringify(url)}); refusing to copy.`,
  );
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(source, join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
