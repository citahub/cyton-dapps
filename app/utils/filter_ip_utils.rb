# frozen_string_literal: true

class FilterIpUtils
  class << self
    # look up ip in geoip2
    def lookup(ip)
      dir = Rails.root.join("lib", "GeoLite2-Country.mmdb")
      db = MaxMindDB.new(dir)
      db.lookup(ip)
    end

    # check ip belongs to China mainland
    def china_mainland?(ip)
      ret = lookup(ip)
      ret.country.iso_code == "CN"
    end
  end
end
