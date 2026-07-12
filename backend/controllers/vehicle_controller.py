def create_vehicle():
    return {"message": "Vehicle created"}

def list_vehicles():
    return {"vehicles": []}

def update_vehicle(id):
    return {"message": f"Vehicle {id} updated"}

def delete_vehicle(id):
    return {"message": f"Vehicle {id} deleted"}