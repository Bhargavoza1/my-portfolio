#!/usr/bin/env bash
# Make the web versions of one video for the site, full length (no trimming):
#   <out>.mp4 (H.264), <out>.webm (VP9) and <out>-poster.jpg, 960 px wide, no audio.
# Usage: tools/make_clip.sh <source video> <output path without extension>
# Example: tools/make_clip.sh ~/Videos/g1_rough_full.mp4 public/projects/crucible/g1-rough
set -euo pipefail
src="$1"
out="$2"
mkdir -p "$(dirname "$out")"
vf="scale=960:-2:flags=lanczos,fps=30,format=yuv420p"
ffmpeg -y -i "$src" -an -vf "$vf" -c:v libx264 -preset veryfast -crf 26 -movflags +faststart "$out.mp4"
ffmpeg -y -i "$src" -an -vf "$vf" -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 -deadline good -cpu-used 4 "$out.webm"
ffmpeg -y -ss 1 -i "$src" -frames:v 1 -vf "scale=960:-2:flags=lanczos" -q:v 4 "$out-poster.jpg"
for f in "$out.mp4" "$out.webm" "$out-poster.jpg"; do
  echo "$f  $(du -h "$f" | cut -f1)  $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f" 2>/dev/null) s"
done
