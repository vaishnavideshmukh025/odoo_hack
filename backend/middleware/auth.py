from functools import wraps
from flask import request, g
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from models.user import User
from utils.helpers import error_response


def require_user(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
            identity = get_jwt_identity()
            user = User.query.get(identity)
            if not user:
                return error_response("User not found", 401)
            g.user = user
            return fn(*args, **kwargs)
        except Exception as exc:
            return error_response("Authentication failed", 401)

    return wrapper
