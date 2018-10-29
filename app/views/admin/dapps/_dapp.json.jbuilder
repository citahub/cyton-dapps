json.extract! dapp, :id, :android_version, :desc, :developer, :end_at, :intro, :ios_version, :logo_url, :marketing_url, :name, :publish_at, :score, :start_at, :url_address, :created_at, :updated_at, :filter_ip
json.url admin_dapp_url(dapp, format: :json)
