from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

import os

# Database URI (yes URI, not URL lol)
DATABASE_URI = "sqlite+pysqlite:///DB/fdb.db"

# Here I get an engine Reference
engine = create_engine(DATABASE_URI, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) # These two lines are from FastAPI docs

Base = declarative_base()

class UserModel(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    skills = Column(String, nullable=True) # List of comma-whitespace separated skills.

class User(BaseModel):
    username: str
    password: str

# Passwords are stored as a hash (ideally a salted hash). Given that this test doesn't need robustness...
# this function acts as just a placeholder.
def hash_the_pw(password: str):
    return password

# Initialize FastAPI app
app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get the database session (this is from FastAPI docs)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/")
async def authenticate_user(user: User, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).first()
    # get the user with that username
    if db_user.password == hash_the_pw(user.password): # I don't return a cookie or anything used to mantain a session.
        return {"auth": True, "name": db_user.name, "skills": db_user.skills} # Ideally, one should return a session cookie or a JWT token here, but the test doesn't require me to do so.
    else:
        return {"auth": False}
