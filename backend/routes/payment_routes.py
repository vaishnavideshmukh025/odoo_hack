from flask import Blueprint
from controllers.payment_controller import create_payment, list_payments
from middleware.auth import require_user

payment_bp = Blueprint("payment_bp", __name__)

payment_bp.add_url_rule("", view_func=require_user(list_payments), methods=["GET"])
payment_bp.add_url_rule("", view_func=require_user(create_payment), methods=["POST"])
