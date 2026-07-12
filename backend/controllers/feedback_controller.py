from flask import request, g
from database import db
from models.feedback import Feedback
from models.breakdown_request import BreakdownRequest
from utils.helpers import success_response, error_response


def create_feedback():
    data = request.get_json(silent=True) or {}
    breakdown_request_id = data.get("breakdown_request_id")
    mechanic_id = data.get("mechanic_id")
    rating = data.get("rating")
    comment = data.get("comment", "").strip()

    if not all([breakdown_request_id, mechanic_id, rating is not None]):
        return error_response("Breakdown request, mechanic and rating are required", 400)

    request_obj = BreakdownRequest.query.filter_by(id=breakdown_request_id, user_id=g.user.id).first()
    if not request_obj:
        return error_response("Breakdown request not found", 404)

    feedback = Feedback(user_id=g.user.id, mechanic_id=mechanic_id, breakdown_request_id=request_obj.id, rating=int(rating), comment=comment)
    db.session.add(feedback)
    db.session.commit()
    return success_response("Feedback submitted", {"id": feedback.id, "rating": feedback.rating}, 201)
