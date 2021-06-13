 
require "test_helper"

class OptionTest < ActiveSupport::TestCase
  def setup
    @quiz = Quiz.new(title:'Quiz Title')
    @question = Question.new(question: 'This is a test question', correct_answer:'0', quiz: @quiz)

    Option.delete_all

    @option = Option.new(answer: 'This is a test option',correct_answer_id:'0' ,question: @question)
  end

  def test_option_should_be_invalid_without_answer
    @option.answer = ''
    assert @option.invalid?
  end
  
  def test_option_answer_should_not_exceed_maximum_length
    @option.answer = 'a' * 51
    assert @option.invalid?
  end

  def test_valid_option_should_be_saved
    assert_difference 'Option.count' do
      @option.save
    end
  end

  def test_option_should_not_be_valid_without_question
    @option.question = nil
    assert @option.invalid?
  end
end