import os
import glob
import xml.etree.ElementTree as ET
import urllib.request

desktop_dir = "/Users/elamine/Desktop/rennova"
public_dir = "/Users/elamine/Desktop/rennova/webapp/public/portfolio"

if not os.path.exists(public_dir):
    os.makedirs(public_dir)

weblocs = glob.glob(os.path.join(desktop_dir, "*.webloc"))
weblocs.sort()

images = []

for idx, file in enumerate(weblocs):
    try:
        tree = ET.parse(file)
        root = tree.getroot()
        url = root.find('.//dict/string').text
        
        # Download the image
        filename = f"p-{idx+1}.jpg"
        filepath = os.path.join(public_dir, filename)
        
        # Adding a User-Agent header to avoid 403 Forbidden
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
            out_file.write(response.read())
            
        images.append(f"/portfolio/{filename}")
        
        # Clean up the webloc file
        os.remove(file)
        print(f"Downloaded {url} to {filename}")
    except Exception as e:
        print(f"Error processing {file}: {e}")

# Output the JS array elements to easily copy into page.js
print("\n// JS Array:")
for i, img in enumerate(images):
    print(f"{{ id: {10 + i}, cat: 'Rénovation Complète', title: 'Projet de Rénovation', sub: 'Occitanie', img: '{img}' }},")

