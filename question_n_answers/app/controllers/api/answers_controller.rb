class Api::AnswersController < ApplicationController
  def create
    questionId = params[:id]
    question = Question.find(questionId)
    answer = question.answers.new(answer_params)
    if answer.save
      render json: answer
    else
      render json: { errors: answer.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

  def update
  end

  def destroy
  end

  private

    def answer_params
      params.require(:answer).permit(:question_id, :body)
    end

end
