from flask import Flask, request, jsonify
from geocoding import geocode_and_store_addresses  # Import the geocoding function

app = Flask(__name__)

@app.route('/geocode', methods=['POST'])
def geocode():
    data = request.get_json()
    addresses = data.get('addresses')
    geocode_and_store_addresses(addresses)
    return jsonify({"message": "Geocoding completed"})

if __name__ == '__main__':
    app.run(debug=True)
