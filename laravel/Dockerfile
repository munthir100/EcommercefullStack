FROM php:8.2-apache

RUN a2enmod rewrite

WORKDIR /var/www/html

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri-e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri-e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

COPY composer.lock composer.json ./

RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    libexif-dev \
    default-mysql-server \
    && docker-php-ext-install pdo pdo_mysql exif bcmath

RUN useradd -ms /bin/bash laravel
USER laravel

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/home/laravel --filename=composer

RUN /home/laravel/composer install --no-plugins --no-scripts

COPY . .

USER root

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80

CMD ["apache2-foreground"]