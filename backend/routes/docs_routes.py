from flask import Blueprint, jsonify

docs_bp = Blueprint("docs_bp", __name__)


docs_bp.add_url_rule("", view_func=lambda: jsonify({
    "message": "Smart Vehicle Breakdown Assistance System API",
    "endpoints": {
        "auth": ["POST /api/auth/register", "POST /api/auth/login", "GET /api/auth/me"],
        "vehicles": ["GET /api/vehicles", "POST /api/vehicles", "PUT /api/vehicles/<id>", "DELETE /api/vehicles/<id>"],
        "breakdown": ["GET /api/breakdown-requests", "POST /api/breakdown-requests", "GET /api/breakdown-requests/<id>", "PUT /api/breakdown-requests/<id>"],
        "mechanics": ["POST /api/mechanics/register", "POST /api/mechanics/login", "GET /api/mechanics"],
        "admin": ["GET /api/admin/dashboard", "GET /api/admin/users", "GET /api/admin/mechanics", "GET /api/admin/breakdown-requests"],
        "payments": ["GET /api/payments", "POST /api/payments"],
        "feedback": ["POST /api/feedback"]
    },
    "sample_request": {
        "register": {"name": "John", "email": "john@example.com", "password": "secret123", "phone": "9999999999"}
    }
}), methods=["GET"])
