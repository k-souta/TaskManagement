class CreatePosts < ActiveRecord::Migration[7.0]
      # postsテーブルの作成
      create_table :posts do |t|
        t.string :project_name
        t.string :sub_task_name_1
        t.string :sub_task_name_2
        t.string :sub_task_name_3
        t.string :sub_task_name_4
        t.string :sub_task_name_5
  
        t.text :task_detail_1
        t.text :task_detail_2
        t.text :task_detail_3
        t.text :task_detail_4
        t.text :task_detail_5
  
        t.integer :hours_1
        t.integer :hours_2
        t.integer :hours_3
        t.integer :hours_4
        t.integer :hours_5
  
        t.integer :minutes_1
        t.integer :minutes_2
        t.integer :minutes_3
        t.integer :minutes_4
        t.integer :minutes_5
  
        t.integer :seconds_1
        t.integer :seconds_2
        t.integer :seconds_3
        t.integer :seconds_4
        t.integer :seconds_5
  
        t.string :url_1
        t.string :url_2
        t.string :url_3
        t.string :url_4
        t.string :url_5
  
        t.timestamps
      end
    end  