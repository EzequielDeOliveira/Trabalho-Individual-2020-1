FROM ruby:2.5.7

RUN apt update -qq && apt install -y build-essential libpq-dev

WORKDIR /api

COPY Gemfile /api
COPY Gemfile.lock /api

RUN gem install bundler -v 2.0.1
RUN bundle install

COPY . .

RUN chmod +x entrypoint.sh
ENTRYPOINT [ "/api/entrypoint.sh" ]

