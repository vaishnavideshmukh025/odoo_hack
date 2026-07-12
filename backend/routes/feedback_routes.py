from flask import Blueprint
from controllers.feedback_controller import create_feedback
from middleware.auth import require_user

feedback_bp = Blueprint("feedback_bp", __name__)

feedback_bp.add_url_rule("", view_func=require_user(create_feedback), methods=["POST"])
