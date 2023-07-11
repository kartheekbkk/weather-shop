FROM cypress/included:12.17.0

COPY . /app

WORKDIR /app

RUN npm install

CMD ["cypress", "run"]