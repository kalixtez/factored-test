FROM python:alpine

WORKDIR /api
COPY . /api/

RUN pip install -r requirements.txt;
CMD [ "fastapi", "run", "./backend.py" ]

EXPOSE 8000