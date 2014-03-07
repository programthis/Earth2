class TickersController < ApplicationController

	news_json = open(http://api.feedzilla.com/v1/categories/26/articles.json).read
	gon.news = JSON.parse(news_json)
end
