class Api::AnswersController < ApplicationController
	def index
		@answers = Answer.all.order("created_at DESC")
    render json: @answers
	end

# 	def create
#     @answer = Answer.new(answer_params)
#     if @answer.save
#       render json: @answer
#     else
#       render json: { errors: @answer.errors.full_messages.join(", ") }, status: :unprocessable_entity
#     end
#   end

# private
#  def answer_params
#     params.require(:answer).permit(:reply, :question_id)
#   end 
end
