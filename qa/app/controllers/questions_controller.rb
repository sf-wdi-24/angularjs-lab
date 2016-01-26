class Api::QuestionsController < ApplicationController
  def index  	
    @questions = Question.all.order("created_at DESC")
    render json: @questions
  end

  def new
  	
  end

  def create
  	@question = Question.new(question_params)
    if @question.save
      render json: @question
    else
      render json: { errors: @question.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

  private
    def question_params
      params.require(:question).permit(:content);
    end
end
