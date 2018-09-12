module Admin::ApplicationHelper
  def link_to_if_exist(url, options = {})
    return url if url.nil?
    link_to url, url, target: "_blank", **options
  end

  def page_title(title = '')
    base_title = "DApp Admin"
    return base_title if title.blank?
    title
  end

  def handle_image_url(url, options = {})
    link_to url, target: "_blank" do
      image_tag url, **options
    end
  rescue
    url
  end
end
