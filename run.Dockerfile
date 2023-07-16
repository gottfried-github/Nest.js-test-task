FROM node

ENV APP_DB_USER a
ENV APP_DB_PASS a
ENV APP_DB_NAME a
ENV NET_NAME a
ENV SESSION_SECRET a

CMD ["bash", "-c", "cd /app; npm run start:dev"]