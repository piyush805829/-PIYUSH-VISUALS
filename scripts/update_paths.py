import re
import json

ts_path = r"data/projects.ts"
with open(ts_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace fullVideo preview path with full path
updated = re.sub(
    r'fullVideo:\s*"/videos/projects/([a-zA-Z0-9_]+)_preview\.mp4"',
    r'fullVideo: "/videos/projects/\1_full.mp4"',
    content
)

with open(ts_path, "w", encoding="utf-8") as f:
    f.write(updated)

# Also update projects_data.json
json_path = r"public/projects_data.json"
try:
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    for p in data:
        if p.get("id") != "00_my_intro":
            p["fullVideo"] = f"/videos/projects/{p['id']}_full.mp4"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
except Exception as e:
    print(f"JSON update error: {e}")

print("Updated data/projects.ts and public/projects_data.json successfully!")

