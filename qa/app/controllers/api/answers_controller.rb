class Api::AnswersController < ApplicationController
  def create

  	question_id = params[:question_id]
  	question = Question.find(question_id)
  	@answer = question.answers.new(answer_params)

    if @answer.save
      render json: @answer
    else
      render json: { errors: @answer.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

  private
    def answer_params
      params.require(:answer).permit(:ans);
    end
end
