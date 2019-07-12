# Statusbar
#
# VERSION    1.0.0

FROM 172.16.10.100:5000/node10-1-express4-16:1.0
MAINTAINER ljinlong.li@fintecher.cn

ENV HTTP_PORT 3000

COPY ./dist /app/dist
WORKDIR /app

EXPOSE 3000

CMD ["npm", "start"]
