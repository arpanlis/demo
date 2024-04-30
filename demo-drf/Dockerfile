FROM python:3.10-slim

RUN pip install poetry

WORKDIR /app
COPY ./ .

RUN poetry config virtualenvs.create false
RUN poetry install

EXPOSE 8000

CMD ["python", "manage.py", "runserver" ,"0.0.0.0:8000"]
