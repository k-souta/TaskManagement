class Post < ApplicationRecord
  def sub_tasks
    (1..5).map do |i|
      {
        name: send("sub_task_name_#{i}"),
        detail: send("task_detail_#{i}"),
        hours: send("hours_#{i}"),
        minutes: send("minutes_#{i}"),
        seconds: send("seconds_#{i}"),
        url: send("url_#{i}")
      }.compact  # compactを追加して、nilのキーを除外
    end.reject { |sub_task| sub_task[:name].blank? }
  end
end
