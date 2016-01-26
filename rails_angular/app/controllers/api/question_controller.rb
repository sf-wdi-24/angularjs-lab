class Api::QuestionController < ApplicationController
	def index
		@questions = Todo.all.order("created_at DESC")
		render json: @questions
	end

	def create
		@question = Todo.new(question_params)
		if @question.save
			render json: @question
		else
			render json: { errors @question.errors.full_messages.join(", ") }, status: :unprocessable_entity
		end

	private
		def question_params
			params.require(:question).permit(:title, :description, :done)
		end
end



