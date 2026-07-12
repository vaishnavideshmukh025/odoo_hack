from flask import Blueprint
from controllers.mechanic_controller import register_mechanic, login_mechanic, list_mechanics

mechanic_bp = Blueprint("mechanic_bp", __name__)

mechanic_bp.add_url_rule("/register", view_func=register_mechanic, methods=["POST"])
mechanic_bp.add_url_rule("/login", view_func=login_mechanic, methods=["POST"])
mechanic_bp.add_url_rule("", view_func=list_mechanics, methods=["GET"])
