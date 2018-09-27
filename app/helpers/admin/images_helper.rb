module Admin::ImagesHelper
  def photo_path(image)
    rails_blob_path(image.photo)
  rescue
    ""
  end

  def photo_url(image)
    rails_blob_url(image.photo)
  rescue
    ""
  end

  def real_url(image)
    if (Rails.env.development? && ENV['QINIU_CLOUD'] == 'true') || Rails.env.production?
      cdn_url(image)
    else
      photo_url(image)
    end
  end

  private

  def cdn_url(image)
    protocol = ENV['QINIU_PROTOCOL']
    domain = ENV['QINIU_DOMAIN']
    key = image.photo&.key
    return "" if key.nil?
    "#{protocol}://#{domain}/#{key}"
  end
end
