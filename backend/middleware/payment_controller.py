from flask import request, g
from database import db
from models.payment import Payment
from models.breakdown_request import BreakdownRequest
from utils.helpers import success_response, error_response


def create_payment():
    data = request.get_json(silent=True) or {}
    breakdown_request_id = data.get("breakdown_request_id")
    amount = data.get("amount")
    status = data.get("status", "Pending")

    if breakdown_request_id is None or amount is None:
        return error_response("Breakdown request and amount are required", 400)

    request_obj = BreakdownRequest.query.filter_by(id=breakdown_request_id, user_id=g.user.id).first()
    if not request_obj:
        return error_response("Breakdown request not found", 404)

    payment = Payment(breakdown_request_id=request_obj.id, amount=float(amount), status=status)
    db.session.add(payment)
    db.session.commit()
    return success_response("Payment record created", {"id": payment.id, "amount": payment.amount, "status": payment.status}, 201)


def list_payments():
    payments = Payment.query.join(BreakdownRequest).filter(BreakdownRequest.user_id == g.user.id).all()
    return success_response("Payments retrieved", [{"id": p.id, "breakdown_request_id": p.breakdown_request_id, "amount": p.amount, "status": p.status} for p in payments])
