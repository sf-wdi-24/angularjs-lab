class Api::AnswersController < ApplicationController

  def index
    @answers = Question.find(params[:question_id]).answers
    render json: @answers
  end

  def create
    @answer = Answer.new(answer_params)
    if @answer.save
      render json: @answer
    else
      render json: { errors: @answer.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

  def update
    @answer = Answer.find(params[:id])
    if @answer.update_attributes(answer_params)
      render json: @answer
    else
      render json: { errors: @answer.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

  private
    def answer_params
      params.permit(:question_id, :answer)
    end
end
