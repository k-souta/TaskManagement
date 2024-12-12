class CustomPost
  attr_accessor :project_name, :sub_tasks

  def initialize(project_name, sub_tasks = [])
    @project_name = project_name
    @sub_tasks = sub_tasks
  end
end

class SubTask
  attr_accessor :name, :detail, :hours, :minutes, :seconds, :url

  def initialize(name:, detail:, hours:, minutes:, seconds:, url: nil)
    @name = name
    @detail = detail
    @hours = hours
    @minutes = minutes
    @seconds = seconds
    @url = url
  end
end
