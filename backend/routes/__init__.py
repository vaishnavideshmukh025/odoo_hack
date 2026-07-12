from flask import Blueprint
from .auth_routes import auth_bp
from .vehicle_routes import vehicle_bp
from .breakdown_routes import breakdown_bp
from .mechanic_routes import mechanic_bp
from .admin_routes import admin_bp
from .payment_routes import payment_bp
from .feedback_routes import feedback_bp
from .docs_routes import docs_bp


def register_blueprints(app):
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(vehicle_bp, url_prefix="/api/vehicles")
    app.register_blueprint(breakdown_bp, url_prefix="/api/breakdown-requests")
    app.register_blueprint(mechanic_bp, url_prefix="/api/mechanics")
    app.register_blueprint(admin_bp, url_prefix="/api/admin")
    app.register_blueprint(payment_bp, url_prefix="/api/payments")
    app.register_blueprint(feedback_bp, url_prefix="/api/feedback")
    app.register_blueprint(docs_bp, url_prefix="/api/docs")
