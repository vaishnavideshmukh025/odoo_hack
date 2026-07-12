from flask import Blueprint
from controllers.vehicle_controller import create_vehicle, list_vehicles, update_vehicle, delete_vehicle
from middleware.auth import require_user

vehicle_bp = Blueprint("vehicle_bp", __name__)

vehicle_bp.add_url_rule("", view_func=require_user(list_vehicles), methods=["GET"])
vehicle_bp.add_url_rule("", view_func=require_user(create_vehicle), methods=["POST"])
vehicle_bp.add_url_rule("/<int:vehicle_id>", view_func=require_user(update_vehicle), methods=["PUT"])
vehicle_bp.add_url_rule("/<int:vehicle_id>", view_func=require_user(delete_vehicle), methods=["DELETE"])
