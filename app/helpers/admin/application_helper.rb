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

  def handle_image_url(url)
    image_tag url, class: "img-pop image-sm", data: {container: "body", toggle: "popover", 'data-placement': 'right', content: "<img src='#{url}' style='width: 250px; height: 250px' />"}
  rescue
    url
  end

  def image_tag_if_exist(url, options = {})
    link_to url, target: "_blank" do
      image_tag url, **options
    end
  rescue
    url
  end

  def transfer_i18n(attr, locale)
    "#{attr}_#{locale.to_s.downcase.gsub(/-/, "_")}"
  end
end
