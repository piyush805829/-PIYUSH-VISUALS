import os
import subprocess
import time

PROJECT_ROOT = r"C:\Users\admin\Documents\MY Documents\Programing\my projects\PIYUSH VISUALS"
SOURCE_DIR = r"C:\Users\admin\Documents\MY Documents\edits\BEST EDITS"
PROJECT_VIDEOS_DIR = os.path.join(PROJECT_ROOT, "public", "videos", "projects")

categories = [
    "00. Intro Video",
    "01. Talking Head & Infotainment",
    "02. Product Demos & Retail",
    "03. Architecture & Interior Design",
    "04. Cinematic Commercials (16x9)",
    "05. Viral Trends & Culture",
    "06. Real Estate & Event Coverage"
]

def slugify(text):
    clean = "".join(c if c.isalnum() or c in "-_" else "_" for c in text.lower())
    while "__" in clean:
        clean = clean.replace("__", "_")
    return clean.strip("_")

start_time = time.time()
optimized_count = 0

for cat in categories:
    cat_dir = os.path.join(SOURCE_DIR, cat)
    if not os.path.isdir(cat_dir):
        continue
    for f in sorted(os.listdir(cat_dir)):
        if not f.lower().endswith(('.mp4', '.mov', '.mkv', '.webm')):
            continue
        filepath = os.path.join(cat_dir, f)
        base_name, _ = os.path.splitext(f)
        slug = slugify(f"{cat[:2]}_{base_name}")
        full_dst = os.path.join(PROJECT_VIDEOS_DIR, f"{slug}_full.mp4")

        # Check if file is > 45 MB (GitHub limit is 100MB, 45MB is ideal for fast web streaming)
        current_sz = os.path.getsize(full_dst) / (1024*1024) if os.path.exists(full_dst) else 999
        if current_sz > 45.0:
            print(f"Optimizing {f} ({current_sz:.1f} MB -> target < 25 MB)...")
            tmp_dst = full_dst + ".tmp.mp4"
            cmd = [
                "ffmpeg", "-i", filepath,
                "-vf", "scale='min(1920,iw)':-2",
                "-c:v", "libx264", "-crf", "26", "-preset", "veryfast",
                "-c:a", "aac", "-b:a", "128k",
                "-movflags", "+faststart",
                tmp_dst, "-y"
            ]
            t_file = time.time()
            subprocess.run(cmd, check=True, capture_output=True)
            new_sz = os.path.getsize(tmp_dst) / (1024*1024)
            os.replace(tmp_dst, full_dst)
            optimized_count += 1
            print(f"Optimized {slug}_full.mp4: {current_sz:.1f} MB -> {new_sz:.1f} MB in {time.time()-t_file:.1f}s")

print(f"\nAll done! Optimized {optimized_count} videos in {time.time()-start_time:.1f}s.")
