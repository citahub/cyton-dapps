FROM ruby:2.5.1

RUN apt-get update -qq && \
 curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
 curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
 echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
 apt-get update -qq && \
 apt-get install -y build-essential libpq-dev nodejs yarn git autoconf locales locales-all && \
 apt-get clean && \
 rm -rf /var/lib/apt/lists/*

RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV LC_ALL en_US.UTF-8

RUN echo 'gem: --no-document' >> /usr/local/etc/gemrc
RUN gem install bundler

ENV RAILS_ENV production

RUN mkdir /app
WORKDIR /app
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN bundle install --jobs 20 --retry 5 --without development test && yarn
COPY . /app

RUN bundle exec rake assets:precompile

EXPOSE 3000

CMD ["bundle", "exec", "puma", "-C", "config/puma.docker.rb"]
