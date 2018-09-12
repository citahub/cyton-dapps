module Admin::ApplicationHelper
  def link_to_if_exist(url)
    return url if url.nil?
    link_to url, url, target: "_blank"
  end
end
