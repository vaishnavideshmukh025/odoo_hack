from flask import request, g
from database import db
from models.vehicle import Vehicle
from utils.helpers import success_response, error_response


def create_vehicle():
    data = request.get_json(silent=True) or {}
    make = data.get("make", "").strip()
    model = data.get("model", "").strip()
    year = data.get("year")
    plate_number = data.get("plate_number", "").strip()
    color = data.get("color", "").strip()

    if not all([make, model, plate_number]) or not isinstance(year, int):
        return error_response("Make, model, plate number and valid year are required", 400)

    vehicle = Vehicle(user_id=g.user.id, make=make, model=model, year=year, plate_number=plate_number, color=color)
    db.session.add(vehicle)
    db.session.commit()
    return success_response("Vehicle added", {"id": vehicle.id}, 201)


def list_vehicles():
    vehicles = Vehicle.query.filter_by(user_id=g.user.id).all()
    return success_response("Vehicles retrieved", [{"id": v.id, "make": v.make, "model": v.model, "plate_number": v.plate_number, "year": v.year, "color": v.color} for v in vehicles])


def update_vehicle(vehicle_id):
    vehicle = Vehicle.query.filter_by(id=vehicle_id, user_id=g.user.id).first()
    if not vehicle:
        return error_response("Vehicle not found", 404)

    data = request.get_json(silent=True) or {}
    if data.get("make"):
        vehicle.make = data["make"]
    if data.get("model"):
        vehicle.model = data["model"]
    if data.get("year"):
        vehicle.year = data["year"]
    if data.get("plate_number"):
        vehicle.plate_number = data["plate_number"]
    if data.get("color") is not None:
        vehicle.color = data["color"]
    db.session.commit()
    return success_response("Vehicle updated", {"id": vehicle.id})


def delete_vehicle(vehicle_id):
    vehicle = Vehicle.query.filter_by(id=vehicle_id, user_id=g.user.id).first()
    if not vehicle:
        return error_response("Vehicle not found", 404)
    db.session.delete(vehicle)
    db.session.commit()
    return success_response("Vehicle deleted", None, 200)
