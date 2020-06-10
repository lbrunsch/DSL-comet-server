FROM alpine:3.9

RUN apk add bash
RUN apk --no-cache add shadow
RUN useradd -u 999 -N mongodb
RUN cat /etc/group
RUN groupadd mongodb -f -g 998
RUN cat /etc/group
RUN mkdir /things
USER root
RUN usermod -aG mongodb root
RUN chown -R 999:999 /things

ENTRYPOINT [ "tail", "-f", "/dev/null" ]