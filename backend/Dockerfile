FROM php:8.2-cli

LABEL fly_launch_runtime="PHP Application"


RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql


# Set environment variables
ENV DB_HOST=ep-dry-wind-a289rbbe.eu-central-1.aws.neon.tech
ENV DB_USER=mohamed
ENV DB_NAME=record_company
ENV PASSWORD=aGumt74ohQcU


# Copy application files
COPY . /var/www/html
WORKDIR /var/www/html

EXPOSE 80

CMD ["php", "-S", "0.0.0.0:80", "-t", "/var/www/html"]