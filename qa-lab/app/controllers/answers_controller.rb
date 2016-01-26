class AnswersController < ApplicationController
	
	def index
		@answers = Question.find(params[:question_id]).answers.order("created_at DESC")
		render json: @answers
	end

	def create
		question = Question.find_by_id(params[:question_id])
		puts question
		@answer = question.answers.new(answer_params)
		if @answer.save
			render json: @answer
		else
			render json: { errors: @answer.errors.full_messages.join(", ") }, status: :unprocessable_entity
		end
	end

	def update
	end

	def destroy
	end

	private
		
		def answer_params
			params.require(:answer).permit(:question_id, :response)
		end

end
