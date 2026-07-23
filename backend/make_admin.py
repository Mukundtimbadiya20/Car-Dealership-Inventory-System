from app.database import SessionLocal
from app.models.user import User

db = SessionLocal()

user = db.query(User).filter(User.email == "mukund@gmail.com").first()

if user:
    user.is_admin = True
    db.commit()
    print("User is now Admin ✅")
else:
    print("User not found")