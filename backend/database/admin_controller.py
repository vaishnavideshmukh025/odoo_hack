from flask import g
from models.user import User
from models.mechanic import Mechanic
from models.breakdown_request import BreakdownRequest
from utils.helpers import success_response, error_response


def admin_dashboard():
    users_count = User.query.count()
    mechanics_count = Mechanic.query.count()
    requests_count = BreakdownRequest.query.count()
    pending_count = BreakdownRequest.query.filter_by(status="Pending").count()
    return success_response("Admin dashboard", {"users": users_count, "mechanics": mechanics_count, "breakdown_requests": requests_count, "pending_requests": pending_count})


def list_users():
    users = User.query.all()
    return success_response("Users retrieved", [{"id": u.id, "name": u.name, "email": u.email, "phone": u.phone} for u in users])


def list_mechanics_admin():
    mechanics = Mechanic.query.all()
    return success_response("Mechanics retrieved", [{"id": m.id, "name": m.name, "email": m.email, "phone": m.phone, "is_available": m.is_available} for m in mechanics])


def list_requests_admin():
    requests = BreakdownRequest.query.all()
    return success_response("Breakdown requests retrieved", [{"id": r.id, "user_id": r.user_id, "vehicle_id": r.vehicle_id, "status": r.status, "issue_description": r.issue_description} for r in requests])
