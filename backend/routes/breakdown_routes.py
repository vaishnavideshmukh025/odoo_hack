from flask import Blueprint
from controllers.breakdown_controller import create_breakdown_request, list_breakdown_requests, get_breakdown_request, update_breakdown_request
from middleware.auth import require_user

breakdown_bp = Blueprint("breakdown_bp", __name__)

breakdown_bp.add_url_rule("", view_func=require_user(list_breakdown_requests), methods=["GET"])
breakdown_bp.add_url_rule("", view_func=require_user(create_breakdown_request), methods=["POST"])
breakdown_bp.add_url_rule("/<int:request_id>", view_func=require_user(get_breakdown_request), methods=["GET"])
breakdown_bp.add_url_rule("/<int:request_id>", view_func=require_user(update_breakdown_request), methods=["PUT"])
