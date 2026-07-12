from flask import request, g
from database import db
from models.breakdown_request import BreakdownRequest
from models.vehicle import Vehicle
from utils.helpers import success_response, error_response


def create_breakdown_request():
    data = request.get_json(silent=True) or {}
    vehicle_id = data.get("vehicle_id")
    latitude = data.get("latitude")
    longitude = data.get("longitude")
    issue_description = data.get("issue_description", "").strip()

    if not all([vehicle_id, latitude is not None, longitude is not None, issue_description]):
        return error_response("Vehicle, location and issue description are required", 400)

    vehicle = Vehicle.query.filter_by(id=vehicle_id, user_id=g.user.id).first()
    if not vehicle:
        return error_response("Vehicle not found", 404)

    req = BreakdownRequest(user_id=g.user.id, vehicle_id=vehicle.id, latitude=float(latitude), longitude=float(longitude), issue_description=issue_description)
    db.session.add(req)
    db.session.commit()
    return success_response("Breakdown request created", {"id": req.id, "status": req.status}, 201)


def list_breakdown_requests():
    requests = BreakdownRequest.query.filter_by(user_id=g.user.id).all()
    return success_response("Breakdown requests retrieved", [{"id": r.id, "status": r.status, "issue_description": r.issue_description, "latitude": r.latitude, "longitude": r.longitude} for r in requests])


def get_breakdown_request(request_id):
    req = BreakdownRequest.query.filter_by(id=request_id, user_id=g.user.id).first()
    if not req:
        return error_response("Breakdown request not found", 404)
    return success_response("Breakdown request retrieved", {"id": req.id, "status": req.status, "issue_description": req.issue_description, "latitude": req.latitude, "longitude": req.longitude})


def update_breakdown_request(request_id):
    req = BreakdownRequest.query.filter_by(id=request_id, user_id=g.user.id).first()
    if not req:
        return error_response("Breakdown request not found", 404)

    data = request.get_json(silent=True) or {}
    if data.get("status"):
        req.status = data["status"]
    db.session.commit()
    return success_response("Breakdown request updated", {"id": req.id, "status": req.status})
