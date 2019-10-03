FROM python:3.6

ENV FLASK_APP app.py

COPY gentelella.py requirements.txt config.py .env ./
COPY application app
COPY migrations migrations

RUN pip3 install -r requirements.txt

EXPOSE 5000
CMD ["flask", "run"]