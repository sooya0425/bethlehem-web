import os
import shutil
import glob

# source directory
src_dir = "C:/Users/User/.gemini/antigravity/brain/b80e45e5-37d9-443a-9259-abecd7179deb/"

# destination directory
dest_dir = "c:/Users/User/OneDrive/바탕 화면/coding/bethlehem/public/images/profiles/"

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

# move images 03 to 15
for i in range(3, 16):
    pattern = f"family_{i:02d}_*.png"
    matches = glob.glob(os.path.join(src_dir, pattern))
    if matches:
        # Get the latest generated image if there are multiple
        latest_file = max(matches, key=os.path.getctime)
        new_name = f"family_{i:02d}.png"
        shutil.copy2(latest_file, os.path.join(dest_dir, new_name))
        print(f"Copied {os.path.basename(latest_file)} to {new_name}")

print("Done moving images.")
