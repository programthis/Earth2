class SessionsController < ApplicationController
  def create
  	user = User.find_by_email(params[:email])
  	if user && user.authenticate(params[:password])
  		session[:user_id] = user.id
  		redirect_to root_path
  	else
  		flash.now[:alert] = "Invalid email or password"
  		render :new
  	end
  end

  def new
  end

  def destroy
  	session.destroy
  	redirect_to root_path, notice: "Congrats, you've logged out!"
  end
end
