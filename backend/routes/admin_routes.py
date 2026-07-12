from flask import Blueprint
from controllers.admin_controller import admin_dashboard, list_users, list_mechanics_admin, list_requests_admin

admin_bp = Blueprint("admin_bp", __name__)

admin_bp.add_url_rule("/dashboard", view_func=admin_dashboard, methods=["GET"])
admin_bp.add_url_rule("/users", view_func=list_users, methods=["GET"])
admin_bp.add_url_rule("/mechanics", view_func=list_mechanics_admin, methods=["GET"])
admin_bp.add_url_rule("/breakdown-requests", view_func=list_requests_admin, methods=["GET"])
