from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from config import Config
from database import db
from models import *  # noqa: F401,F403
from routes import register_blueprints
from utils.helpers import error_response


def create_app(config_class=Config):
    """Application factory for the Smart Vehicle Breakdown Assistance System."""
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    JWTManager(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    Migrate(app, db)

    register_blueprints(app)

    @app.errorhandler(404)
    def not_found(_error):
        return error_response("Resource not found", 404)

    @app.errorhandler(500)
    def internal_server_error(_error):
        return error_response("Internal server error", 500)

    with app.app_context():
        db.create_all()

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
