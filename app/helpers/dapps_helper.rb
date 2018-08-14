module DappsHelper
  def tag_to_text(tag)
    case tag
    when "new_dapp"
      return "New Dapp"
    when "popular"
      return "Popular"
    else
      return tag.to_s
    end
  end
end
