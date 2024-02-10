#start flask project
from flask import Flask, render_template
import random

app = Flask(__name__)

def create_random_latLng(lat_range, lng_range):
    LatLng = []
    for _ in range(1000):
        lat = random.uniform(lat_range[0], lat_range[1])
        lng = random.uniform(lng_range[0], lng_range[1])
        LatLng.append((lat, lng))
    return LatLng

lat_range = [40.988473, 41.007583]
lng_range = [29.167413, 29.139262]

# lat_range = [35.988473, 45.007583]
# lng_range = [29.167413, 25.139262]

@app.route('/')
def index():
    random_latLng = create_random_latLng(lat_range, lng_range)
    
    return render_template('index.html', random_latLng=random_latLng)

if __name__ == '__main__':
    app.run(debug=True)