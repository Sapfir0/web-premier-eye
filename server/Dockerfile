FROM python:3.6

ENV FLASK_APP app.py

COPY . .

RUN pip3 install -r requirements.txt

EXPOSE 5000
CMD ["flask", "run"]