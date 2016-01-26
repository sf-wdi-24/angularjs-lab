class Api::QuestionsController < ApplicationController
  # before_action :set_question, only: [:show, :update, :destroy]

  def index
    questions = Question.all
    render json: questions
  end

  def create
    question = Question.new(question_params)
    if question.save
      render json: question
    else
      render json: { errors: question.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

  def show
    questionId = params[:id]
    question = Question.find(questionId)
    render json: question
  end

  def update
    questionId = params[:id]
    question = Question.find(questionId)
    question.update_attributes(question_params)
    redirect_to question_path(question)
  end

  def destroy
    questionId = params[:id]
    question = Question.find(questionId)
    question.destroy
    redirect_to root_path
  end

  private

    def question_params
      params.require(:question).permit(:title, :body)
    end
end
