import os
import sys
import json
import shutil
import subprocess

SOURCE_DIR = r"C:\Users\admin\Documents\MY Documents\edits\BEST EDITS"
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_DIR = os.path.join(PROJECT_ROOT, "public")
VIDEOS_DIR = os.path.join(PUBLIC_DIR, "videos")
PROJECT_VIDEOS_DIR = os.path.join(VIDEOS_DIR, "projects")
THUMBNAILS_DIR = os.path.join(PUBLIC_DIR, "thumbnails", "projects")
IMAGES_DIR = os.path.join(PUBLIC_DIR, "images")

os.makedirs(VIDEOS_DIR, exist_ok=True)
os.makedirs(PROJECT_VIDEOS_DIR, exist_ok=True)
os.makedirs(THUMBNAILS_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR, exist_ok=True)

# 1. Copy Intro Video
intro_src = os.path.join(SOURCE_DIR, "00. Intro Video", "my intro.mp4")
intro_dst = os.path.join(VIDEOS_DIR, "intro.mp4")

if os.path.exists(intro_src):
    print(f"Copying intro video: {intro_src} -> {intro_dst}")
    shutil.copy2(intro_src, intro_dst)
    intro_thumb = os.path.join(PUBLIC_DIR, "thumbnails", "intro-poster.webp")
    subprocess.run([
        "ffmpeg", "-ss", "00:00:01", "-i", intro_dst,
        "-vframes", "1", "-vf", "scale='min(1920,iw)':-2", "-q:v", "85",
        intro_thumb, "-y"
    ], capture_output=True)
    print("Intro poster generated.")

categories = [
    "00. Intro Video",
    "01. Talking Head & Infotainment",
    "02. Product Demos & Retail",
    "03. Architecture & Interior Design",
    "04. Cinematic Commercials (16x9)",
    "05. Viral Trends & Culture",
    "06. Real Estate & Event Coverage"
]

project_catalog = []

def slugify(text):
    clean = "".join(c if c.isalnum() or c in "-_" else "_" for c in text.lower())
    while "__" in clean:
        clean = clean.replace("__", "_")
    return clean.strip("_")

for cat in categories:
    cat_dir = os.path.join(SOURCE_DIR, cat)
    if not os.path.isdir(cat_dir):
        continue
    
    files = sorted(os.listdir(cat_dir))
    for f in files:
        if not f.lower().endswith(('.mp4', '.mov', '.mkv', '.webm')):
            continue
        
        filepath = os.path.join(cat_dir, f)
        base_name, _ = os.path.splitext(f)
        slug = slugify(f"{cat[:2]}_{base_name}")
        
        # Probe video
        probe_cmd = [
            "ffprobe", "-v", "quiet", "-print_format", "json",
            "-show_format", "-show_streams", filepath
        ]
        probe_res = subprocess.run(probe_cmd, capture_output=True, text=True)
        try:
            info = json.loads(probe_res.stdout)
            video_stream = next((s for s in info.get("streams", []) if s.get("codec_type") == "video"), {})
            w = video_stream.get("width", 1080)
            h = video_stream.get("height", 1920)
            duration = float(info.get("format", {}).get("duration", 10))
        except Exception:
            w, h, duration = 1080, 1920, 10
            
        calc_ratio = w / h if h > 0 else 9/16
        if abs(calc_ratio - 9/16) < 0.05:
            aspect_type = "9:16"
            ratio_label = "Vertical Reel (9:16)"
        elif abs(calc_ratio - 16/9) < 0.05:
            aspect_type = "16:9"
            ratio_label = "Cinematic Widescreen (16:9)"
        elif abs(calc_ratio - 1.0) < 0.05:
            aspect_type = "1:1"
            ratio_label = "Square (1:1)"
        elif abs(calc_ratio - 4/5) < 0.05:
            aspect_type = "4:5"
            ratio_label = "Portrait (4:5)"
        else:
            aspect_type = f"{w}:{h}"
            ratio_label = f"Custom ({w}x{h})"

        # Thumbnail extraction
        thumb_filename = f"{slug}.webp"
        thumb_path = os.path.join(THUMBNAILS_DIR, thumb_filename)
        ss_time = 3.0 if duration > 15 else (1.5 if duration > 5 else 1.0)

        if not os.path.exists(thumb_path):
            thumb_cmd = [
                "ffmpeg", "-ss", str(ss_time), "-i", filepath,
                "-vframes", "1",
                "-vf", "scale='min(1080,iw)':-2",
                "-c:v", "libwebp", "-quality", "85",
                thumb_path, "-y"
            ]
            subprocess.run(thumb_cmd, capture_output=True)

        # 1. Generate lightweight hover preview (6 seconds)
        preview_filename = f"{slug}_preview.mp4"
        preview_path = os.path.join(PROJECT_VIDEOS_DIR, preview_filename)
        scale_filter = "scale=720:-2" if aspect_type == "9:16" else ("scale=1280:-2" if aspect_type == "16:9" else "scale=720:-2")
        
        if not os.path.exists(preview_path):
            preview_cmd = [
                "ffmpeg", "-ss", str(min(1.0, duration * 0.1)), "-t", "6",
                "-i", filepath,
                "-vf", scale_filter,
                "-c:v", "libx264", "-crf", "28", "-preset", "faster",
                "-an", "-movflags", "+faststart",
                preview_path, "-y"
            ]
            subprocess.run(preview_cmd, capture_output=True)

        # 2. Generate full-length video for modal viewer (entire duration + original audio + faststart)
        full_filename = f"{slug}_full.mp4"
        full_path = os.path.join(PROJECT_VIDEOS_DIR, full_filename)
        if not os.path.exists(full_path) or os.path.getsize(full_path) == 0:
            full_cmd = [
                "ffmpeg", "-i", filepath,
                "-c:v", "copy",
                "-c:a", "aac", "-b:a", "192k",
                "-movflags", "+faststart",
                full_path, "-y"
            ]
            subprocess.run(full_cmd, capture_output=True)

        project_catalog.append({
            "id": slug,
            "title": base_name.replace("_", " ").title(),
            "category": cat,
            "filename": f,
            "duration": round(duration, 1),
            "width": w,
            "height": h,
            "aspectRatio": aspect_type,
            "ratioLabel": ratio_label,
            "thumbnail": f"/thumbnails/projects/{thumb_filename}",
            "previewVideo": f"/videos/projects/{preview_filename}",
            "fullVideo": f"/videos/projects/{full_filename}" if cat != "00. Intro Video" else "/videos/intro.mp4",
            "featured": cat in ["00. Intro Video", "04. Cinematic Commercials (16x9)"] or f in ["ELA_001.mp4", "DR_AYUSHI_001.mp4", "Centre Table Info Meghdoot.mp4", "ELA_003.mp4", "BNI_001.mov"]
        })
        print(f"Processed: {cat} -> {f} ({aspect_type})")

catalog_path = os.path.join(PROJECT_ROOT, "public", "projects_data.json")
with open(catalog_path, "w", encoding="utf-8") as out:
    json.dump(project_catalog, out, indent=2)

print(f"Total projects processed: {len(project_catalog)}")
print(f"Catalog saved to {catalog_path}")
