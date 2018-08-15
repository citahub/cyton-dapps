module DappsHelper
  def tag_to_text(tag)
    case tag
    when "new_dapp"
      "AppChain 应用"
    when "popular"
      "热门应用"
    else
      tag.to_s
    end
  end
end
