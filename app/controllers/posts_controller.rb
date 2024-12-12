class PostsController < ApplicationController
before_action :authenticate_user!

  require 'ostruct'
  def index
    @posts = Post.all
  end


  def new
    @post = Post.new
  end


    def create
      @post = Post.new(post_params)
      if @post.save
        redirect_to posts_path, notice: "タスクが保存されました。"
      else
        render :new
      end
    end
    
  
    private
  
    def post_params
      params.require(:post).permit(
        :project_name,
        :sub_task_name_1, :sub_task_name_2, :sub_task_name_3, :sub_task_name_4, :sub_task_name_5,
        :task_detail_1, :task_detail_2, :task_detail_3, :task_detail_4, :task_detail_5,
        :hours_1, :hours_2, :hours_3, :hours_4, :hours_5,
        :minutes_1, :minutes_2, :minutes_3, :minutes_4, :minutes_5,
        :seconds_1, :seconds_2, :seconds_3, :seconds_4, :seconds_5,
        :url_1, :url_2, :url_3, :url_4, :url_5
      )
    end
    
  end
  