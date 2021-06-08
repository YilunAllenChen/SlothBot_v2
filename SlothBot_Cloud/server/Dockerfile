FROM ubuntu:focal 

RUN apt-get update
RUN apt-get install -y python3 python-dev python3-dev \
    build-essential python3-pip

COPY . /app

WORKDIR /app

RUN pip3 install --upgrade firebase-admin

RUN pip3 install -r requirements.txt




ENTRYPOINT [ "python3" ]

CMD [ "main.py" ]