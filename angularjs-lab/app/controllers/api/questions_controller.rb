class Api::QuestionsController < ApplicationController

  def index
    @questions = Question.all.order("created_at DESC")
    render json: @questions
  end

  def create
    @question = Question.new(question_params)
    if @question.save
      render json: @question
    else
      render json: { errors: @question.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

  def show
    @question = Question.find(params[:id])
    render json: @question
  end

  def update
    @question = Question.find(params[:id])
    if @question.update_attributes(question_params)
      render json: @question
    else
      render json: { errors: @question.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

  def destroy
    @question = Question.find(params[:id])
    if @question.destroy
      render json: @question
    else
      render json: { errors: @question.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end

  end


  private
    def question_params
      params.require(:question).permit(:ask)
    end


end
