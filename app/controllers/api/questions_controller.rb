class Api::QuestionsController < ApplicationController
  def index
    @questions = Question.all
    render json: @questions
  end

  def create
    @question = Question.new(question_params)
    if @question.save
      render json: @question
    else
      render json: { errors: @question.errors.full_messages.join(", ") }, status: unprocessable_entity
    end
  end

  def show
  end

  def update
    Question.find_by_id(params[:id]).update_attributes(question_params)
  end

  def destroy
    Question.find_by_id(params[:id]).destroy
  end

  private
    def question_params
      params.require(:question).permit(:title, :body)
    end

end
