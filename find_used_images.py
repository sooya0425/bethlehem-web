import os
import re

pattern = re.compile(r"/images/[\w/.-]+")
used_images = set()

for root, _, files in os.walk("src"):
    for file in files:
        if file.endswith((".tsx", ".ts", ".css")):
            with open(os.path.join(root, file), "r", encoding="utf-8") as f:
                content = f.read()
                used_images.update(pattern.findall(content))

for img in sorted(used_images):
    print(img)
