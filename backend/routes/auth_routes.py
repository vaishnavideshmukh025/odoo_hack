from flask import Blueprint
from controllers.auth_controller import login_user, register_user, get_profile
from middleware.auth import require_user

auth_bp = Blueprint("auth_bp", __name__)


auth_bp.add_url_rule("/register", view_func=register_user, methods=["POST"])
auth_bp.add_url_rule("/login", view_func=login_user, methods=["POST"])
auth_bp.add_url_rule("/me", view_func=require_user(get_profile), methods=["GET"])
