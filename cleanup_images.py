import os
import shutil

# directory paths
src_dir = "c:/Users/User/OneDrive/바탕 화면/coding/bethlehem/public/images"
archive_dir = os.path.join(src_dir, "archive")

# make archive directory if it doesn't exist
if not os.path.exists(archive_dir):
    os.makedirs(archive_dir)

# the 61 used images
used_images = {
    "activity_room.png",
    "altar.png",
    "bedroom.png",
    "center_exterior.png",
    "chapel_exterior.png",
    "chapel_interior.png",
    "common_area.png",
    "facility_map.png",
    "gym_zone.png",
    "intro_bedroom.png",
    "intro_garden.png",
    "intro_greetings.png",
    "intro_hall.png",
    "intro_living.png",
    "intro_program.png",
    "intro_relax.png",
    "intro_training.png",
    "living_room.png",
    "lobby_area.png",
    "main_office.png",
    "photo_gallery_1.png",
    "photo_gallery_2.png",
    "photo_gallery_3.png",
    "photo_gallery_4.png",
    "photo_gallery_5.png",
    "photo_gallery_6.png",
    "residence_a.png",
    "residence_b.png",
    "soulstay_hero.png",
    "therapy_center.png",
    "therapy_room.png",
    # those below are the new ones
    "history_hero.png",
    "location_hero.png",
    "notice_hero.png",
    "community_hero.png"
}

# we don't clean the profiles subfolder directly here because it was recently updated, but we can clean the top level public/images
moved_count = 0
for filename in os.listdir(src_dir):
    file_path = os.path.join(src_dir, filename)
    
    # skip directories like 'archive' and 'profiles'
    if os.path.isdir(file_path):
        continue
        
    if filename not in used_images:
        shutil.move(file_path, os.path.join(archive_dir, filename))
        moved_count += 1
        print(f"Archived: {filename}")

print(f"Cleanup complete. Archived {moved_count} unused images.")
