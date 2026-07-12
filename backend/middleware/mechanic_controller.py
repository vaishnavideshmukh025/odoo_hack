from flask import request
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from database import db
from models.mechanic import Mechanic
from utils.helpers import success_response, error_response


def register_mechanic():
    data = request.get_json(silent=True) or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    phone = data.get("phone", "").strip()

    if not all([name, email, password, phone]):
        return error_response("All fields are required", 400)

    if Mechanic.query.filter_by(email=email).first():
        return error_response("Email already exists", 409)

    mechanic = Mechanic(name=name, email=email, password_hash=generate_password_hash(password).decode("utf-8"), phone=phone)
    db.session.add(mechanic)
    db.session.commit()
    return success_response("Mechanic registered", {"id": mechanic.id}, 201)


def login_mechanic():
    data = request.get_json(silent=True) or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    mechanic = Mechanic.query.filter_by(email=email).first()

    if not mechanic or not check_password_hash(mechanic.password_hash, password):
        return error_response("Invalid credentials", 401)

    token = create_access_token(identity=mechanic.id)
    return success_response("Login successful", {"token": token, "mechanic": {"id": mechanic.id, "name": mechanic.name, "email": mechanic.email}})


def list_mechanics():
    mechanics = Mechanic.query.all()
    return success_response("Mechanics retrieved", [{"id": m.id, "name": m.name, "phone": m.phone, "specialization": m.specialization, "is_available": m.is_available} for m in mechanics])
