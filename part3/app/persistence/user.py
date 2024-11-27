from app.models.user import User
from app.persistence.repository import SQLAlchemyRepository
from app import db

class UserRepository(SQLAlchemyRepository):
    def __init__(self):
        super().__init__(User)

    def get_user_by_email(self, email):
        return self.model.query.filter_by(_email=email).first()