from geopy.geocoders import Nominatim
import pymongo

def geocode_and_store_addresses(addresses):
    # Initialize geolocator
    geolocator = Nominatim(user_agent="nightclub_geocoding")

    # MongoDB connection
    #Waiting for the MongoDB connection details, including 
    # the connection URL, and database name
    client = pymongo.MongoClient("mongodb://localhost:27017/")#Will replace this after talking with Benu
    db = client["nightclubs"]
    collection = db["coordinates"]

    for address in addresses:
        location = geolocator.geocode(address)
        if location:
            coordinates = {
                "address": address,
                "latitude": location.latitude,
                "longitude": location.longitude,
            }
            collection.insert_one(coordinates)

if __name__ == "__main__":
    nightclub_addresses = [
        #i will add addresses in this format after i get the mongoDB data
        "Nightclub Address 1, San Marcos, TX",
        "Nightclub Address 2, San Marcos, TX",
        # Add more addresses here
    ]

    geocode_and_store_addresses(nightclub_addresses)
