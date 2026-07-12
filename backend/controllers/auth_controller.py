from flask import request, g
from flask_jwt_extended import create_access_token
from flask_bcrypt import generate_password_hash, check_password_hash
from models.user import User
from utils.helpers import success_response, error_response
from database import db


def register_user():
    data = request.get_json(silent=True) or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    phone = data.get("phone", "").strip()

    if not all([name, email, password, phone]):
        return error_response("All fields are required", 400)

    if User.query.filter_by(email=email).first():
        return error_response("Email already exists", 409)

    user = User(name=name, email=email, password_hash=generate_password_hash(password).decode("utf-8"), phone=phone)
    db.session.add(user)
    db.session.commit()
    return success_response("User registered successfully", {"user_id": user.id, "email": user.email}, 201)


def login_user():
    data = request.get_json(silent=True) or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return error_response("Email and password are required", 400)

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return error_response("Invalid credentials", 401)

    token = create_access_token(identity=user.id)
    return success_response("Login successful", {"token": token, "user": {"id": user.id, "name": user.name, "email": user.email}}, 200)


def get_profile():
    return success_response("Profile retrieved", {"id": g.user.id, "name": g.user.name, "email": g.user.email, "phone": g.user.phone})
